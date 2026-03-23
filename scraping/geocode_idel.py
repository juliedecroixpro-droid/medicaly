#!/usr/bin/env python3
"""Geocode IDEL addresses using api-adresse.data.gouv.fr (free, no key)."""

import json
import os
import time
import httpx
import asyncio
from urllib.parse import quote

INPUT = os.path.join(os.path.dirname(__file__), '..', 'data', 'idel_france_clean.json')
OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'data', 'idel_france_geocoded.json')

API_URL = "https://api-adresse.data.gouv.fr/search/"
BATCH_URL = "https://api-adresse.data.gouv.fr/search/csv/"

# Use batch CSV API for speed (up to 50 req/sec)


async def geocode_batch_csv(nurses):
    """Use the CSV batch endpoint for mass geocoding."""
    import csv
    import io
    
    # Prepare CSV
    csv_input = os.path.join(os.path.dirname(__file__), '..', 'data', 'geocode_input.csv')
    csv_output = os.path.join(os.path.dirname(__file__), '..', 'data', 'geocode_output.csv')
    
    # Write input CSV
    print("Preparing CSV for batch geocoding...")
    with open(csv_input, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['id', 'adresse', 'postcode', 'city'])
        for i, n in enumerate(nurses):
            if n['address'] and n['postal_code']:
                writer.writerow([i, n['address'], n['postal_code'], n['city']])
    
    to_geocode = sum(1 for n in nurses if n['address'] and n['postal_code'])
    print(f"Addresses to geocode: {to_geocode:,}")
    
    # Split into chunks of 10,000 (API limit)
    CHUNK_SIZE = 10000
    results = {}
    
    with open(csv_input, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)
        all_rows = list(reader)
    
    total_chunks = (len(all_rows) + CHUNK_SIZE - 1) // CHUNK_SIZE
    print(f"Processing {total_chunks} chunks of {CHUNK_SIZE}...")
    
    async with httpx.AsyncClient(timeout=120.0) as client:
        for chunk_idx in range(total_chunks):
            start = chunk_idx * CHUNK_SIZE
            end = min(start + CHUNK_SIZE, len(all_rows))
            chunk = all_rows[start:end]
            
            # Build CSV for this chunk
            buf = io.StringIO()
            writer = csv.writer(buf)
            writer.writerow(['id', 'adresse', 'postcode', 'city'])
            for row in chunk:
                writer.writerow(row)
            csv_data = buf.getvalue().encode('utf-8')
            
            # Send to API
            try:
                response = await client.post(
                    BATCH_URL,
                    files={'data': ('addresses.csv', csv_data, 'text/csv')},
                    data={'columns': 'adresse', 'postcode': 'postcode', 'citycode': 'city'},
                )
                
                if response.status_code == 200:
                    # Parse response CSV
                    resp_reader = csv.DictReader(io.StringIO(response.text))
                    for row in resp_reader:
                        idx = int(row['id'])
                        lat = row.get('latitude', '')
                        lng = row.get('longitude', '')
                        score = row.get('result_score', '0')
                        
                        if lat and lng and float(score) > 0.3:
                            results[idx] = {
                                'lat': float(lat),
                                'lng': float(lng),
                                'score': float(score),
                            }
                    
                    geocoded_in_chunk = sum(1 for r in chunk if int(r[0]) in results)
                    print(f"  Chunk {chunk_idx+1}/{total_chunks}: {geocoded_in_chunk}/{len(chunk)} geocoded")
                else:
                    print(f"  Chunk {chunk_idx+1} FAILED: HTTP {response.status_code}")
                    
            except Exception as e:
                print(f"  Chunk {chunk_idx+1} ERROR: {e}")
            
            # Small delay between chunks
            if chunk_idx < total_chunks - 1:
                await asyncio.sleep(1)
    
    # Apply results to nurses
    geocoded_count = 0
    for idx, geo in results.items():
        nurses[idx]['lat'] = geo['lat']
        nurses[idx]['lng'] = geo['lng']
        nurses[idx]['geo_score'] = geo['score']
        geocoded_count += 1
    
    # Set None for non-geocoded
    for n in nurses:
        if 'lat' not in n:
            n['lat'] = None
            n['lng'] = None
            n['geo_score'] = None
    
    print(f"\nGeocoded: {geocoded_count:,} / {len(nurses):,} ({100*geocoded_count/len(nurses):.1f}%)")
    return nurses


async def main():
    print("=" * 50)
    print("GÉOCODAGE IDEL FRANCE")
    print("=" * 50)
    
    print("\nLoading IDEL data...")
    with open(INPUT, 'r', encoding='utf-8') as f:
        nurses = json.load(f)
    print(f"Loaded {len(nurses):,} IDEL")
    
    nurses = await geocode_batch_csv(nurses)
    
    # Write output
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(nurses, f, ensure_ascii=False, indent=None)
    
    file_size = os.path.getsize(OUTPUT) / (1024 * 1024)
    print(f"\nWritten {OUTPUT} ({file_size:.1f} MB)")
    
    # Quick sample
    sample = [n for n in nurses if n.get('lat')][:5]
    for n in sample:
        print(f"  {n['first_name']} {n['last_name']} - {n['city']} → ({n['lat']}, {n['lng']})")


if __name__ == '__main__':
    asyncio.run(main())
