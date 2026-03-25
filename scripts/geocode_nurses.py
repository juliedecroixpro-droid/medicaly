#!/usr/bin/env python3
"""Batch geocode nurses using api-adresse.data.gouv.fr (BAN)
Writes results progressively to avoid data loss on interruption."""

import json
import csv
import io
import requests
import time
import sys
import os

DATA_DIR = "/Users/mdi/projets/medicaly/data"
INPUT_FILE = f"{DATA_DIR}/idel_france_clean.json"
OUTPUT_FILE = f"{DATA_DIR}/idel_france_geocoded.json"
CACHE_FILE = f"{DATA_DIR}/geocode_cache.json"


def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE) as f:
                return json.load(f)
        except:
            pass
    return {}


def save_cache(cache):
    with open(CACHE_FILE, 'w') as f:
        json.dump(cache, f)


def batch_geocode(addresses, cache, batch_size=1000):
    # Filter out already cached
    to_do = [a for a in addresses if a['rpps'] not in cache]
    print(f"Already cached: {len(cache)}, remaining: {len(to_do)}", file=sys.stderr)
    
    for i in range(0, len(to_do), batch_size):
        batch = to_do[i:i+batch_size]
        
        csv_buf = io.StringIO()
        writer = csv.writer(csv_buf)
        writer.writerow(['id', 'adresse', 'postcode'])
        for item in batch:
            addr = item['address'].split(',')[0].strip() if ',' in item['address'] else item['address']
            writer.writerow([item['rpps'], addr, item['postal_code']])
        
        csv_data = csv_buf.getvalue()
        
        for attempt in range(3):
            try:
                resp = requests.post(
                    'https://api-adresse.data.gouv.fr/search/csv/',
                    files={'data': ('addresses.csv', csv_data, 'text/csv')},
                    data={'columns': ['adresse'], 'postcode': 'postcode'},
                    timeout=120,
                )
                
                if resp.status_code == 200:
                    reader = csv.DictReader(io.StringIO(resp.text))
                    for row in reader:
                        rpps = row.get('id', '')
                        lat = row.get('latitude', '')
                        lon = row.get('longitude', '')
                        score = row.get('result_score', '')
                        if lat and lon and rpps:
                            cache[rpps] = {
                                'lat': float(lat),
                                'lon': float(lon),
                                'score': float(score) if score else 0,
                            }
                    break
                else:
                    print(f"  HTTP {resp.status_code}, retry {attempt+1}", file=sys.stderr)
                    time.sleep(2)
            except Exception as e:
                print(f"  Error: {e}, retry {attempt+1}", file=sys.stderr)
                time.sleep(3)
        
        done = min(i + batch_size, len(to_do))
        print(f"  [{done + len(addresses) - len(to_do)}/{len(addresses)}] {len(cache)} geocoded", file=sys.stderr)
        
        # Save cache every 5 batches
        if (i // batch_size) % 5 == 4:
            save_cache(cache)
            print("  (cache saved)", file=sys.stderr)
        
        if i + batch_size < len(to_do):
            time.sleep(0.3)
    
    save_cache(cache)
    return cache


def main():
    print("Loading nurses...", file=sys.stderr)
    with open(INPUT_FILE) as f:
        nurses = json.load(f)
    
    cache = load_cache()
    print(f"Total: {len(nurses)}, cached: {len(cache)}", file=sys.stderr)
    
    to_geocode = [
        {'rpps': n['rpps'], 'address': n['address'], 'postal_code': n['postal_code']}
        for n in nurses if n.get('address')
    ]
    
    coords = batch_geocode(to_geocode, cache)
    
    geocoded = []
    with_coords = 0
    for n in nurses:
        nurse = dict(n)
        if n['rpps'] in coords:
            c = coords[n['rpps']]
            nurse['lat'] = c['lat']
            nurse['lon'] = c['lon']
            nurse['geo_score'] = c['score']
            with_coords += 1
        geocoded.append(nurse)
    
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(geocoded, f, ensure_ascii=False)
    
    print(f"Done! {with_coords}/{len(nurses)} geocoded ({with_coords/len(nurses)*100:.1f}%)", file=sys.stderr)


if __name__ == '__main__':
    main()
