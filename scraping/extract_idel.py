#!/usr/bin/env python3
"""Extract IDEL (Infirmiers Libéraux) from RPPS data and output clean JSON."""

import csv
import json
import sys
import os
from collections import defaultdict

INPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'ps-libreacces-personne-activite.txt')
SAVOIR_FAIRE_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'ps-libreacces-savoirfaire.txt')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'idel_france.json')

def parse_rpps():
    """Parse main RPPS file and extract IDEL libéraux."""
    nurses = {}
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='|')
        header = next(reader)
        
        # Print header for reference
        print("Columns found:")
        for i, h in enumerate(header):
            print(f"  [{i}] {h}")
        print()
        
        # Key column indices
        COL_ID_PP = 1          # Identifiant PP
        COL_ID_NAT = 2         # Identification nationale PP
        COL_CIVILITE = 5       # Civilité (M/MME)
        COL_CIVILITE_LIB = 6   # Libellé civilité
        COL_NOM = 7            # Nom d'exercice
        COL_PRENOM = 8         # Prénom d'exercice
        COL_CODE_PROF = 9      # Code profession (60 = Infirmier)
        COL_LIB_PROF = 10      # Libellé profession
        COL_CODE_MODE = 17     # Code mode exercice (L = Libéral)
        COL_LIB_MODE = 18      # Libellé mode exercice
        COL_SIRET = 19         # SIRET
        COL_RAISON_SOCIALE = 24 # Raison sociale
        COL_NUM_VOIE = 28      # Numéro voie
        COL_TYPE_VOIE = 31     # Type voie
        COL_LIB_VOIE = 32      # Libellé voie
        COL_CODE_POSTAL = 35   # Code postal
        COL_CODE_COMMUNE = 36  # Code commune
        COL_LIB_COMMUNE = 37   # Libellé commune
        COL_TELEPHONE = 40     # Téléphone
        COL_TELEPHONE2 = 41    # Téléphone 2
        COL_EMAIL = 43         # Email
        COL_CODE_DEPT = 44     # Code département
        COL_LIB_DEPT = 45      # Libellé département
        
        count = 0
        skipped = 0
        
        for row in reader:
            if len(row) < 46:
                skipped += 1
                continue
            
            # Filter: Infirmier (60) + Libéral (L)
            code_prof = row[COL_CODE_PROF].strip()
            code_mode = row[COL_CODE_MODE].strip()
            
            if code_prof != '60' or code_mode != 'L':
                continue
            
            rpps = row[COL_ID_NAT].strip()
            
            # Build address
            num_voie = row[COL_NUM_VOIE].strip()
            type_voie = row[COL_TYPE_VOIE].strip() if len(row) > COL_TYPE_VOIE else ''
            lib_voie = row[COL_LIB_VOIE].strip() if len(row) > COL_LIB_VOIE else ''
            code_postal = row[COL_CODE_POSTAL].strip()
            commune = row[COL_LIB_COMMUNE].strip()
            
            address_parts = [p for p in [num_voie, type_voie, lib_voie] if p]
            address = ' '.join(address_parts)
            full_address = f"{address}, {code_postal} {commune}" if address else f"{code_postal} {commune}"
            
            phone = row[COL_TELEPHONE].strip() if len(row) > COL_TELEPHONE else ''
            phone2 = row[COL_TELEPHONE2].strip() if len(row) > COL_TELEPHONE2 else ''
            email = row[COL_EMAIL].strip() if len(row) > COL_EMAIL else ''
            
            # Use RPPS as unique key (nurse may have multiple lines for multiple structures)
            if rpps not in nurses:
                nurses[rpps] = {
                    'rpps': rpps,
                    'id_pp': row[COL_ID_PP].strip(),
                    'gender': 'F' if 'MME' in row[COL_CIVILITE].strip().upper() or 'Madame' in row[COL_CIVILITE_LIB] else 'M',
                    'last_name': row[COL_NOM].strip().title(),
                    'first_name': row[COL_PRENOM].strip().title(),
                    'address': full_address,
                    'postal_code': code_postal,
                    'city': commune.title(),
                    'department': row[COL_CODE_DEPT].strip() if len(row) > COL_CODE_DEPT else '',
                    'department_name': row[COL_LIB_DEPT].strip() if len(row) > COL_LIB_DEPT else '',
                    'phone': phone,
                    'phone2': phone2,
                    'email': email,
                    'cabinet': row[COL_RAISON_SOCIALE].strip() if len(row) > COL_RAISON_SOCIALE else '',
                    'siret': row[COL_SIRET].strip() if len(row) > COL_SIRET else '',
                    'specialties': [],
                }
                count += 1
            
            if count % 10000 == 0 and count > 0:
                print(f"  Processed {count} IDEL...", file=sys.stderr)
    
    print(f"\nExtracted {count} unique IDEL libéraux (skipped {skipped} malformed rows)")
    return nurses


def parse_savoir_faire(nurses):
    """Enrich nurses with specialties from savoir-faire file."""
    enriched = 0
    
    if not os.path.exists(SAVOIR_FAIRE_FILE):
        print("Savoir-faire file not found, skipping enrichment")
        return
    
    with open(SAVOIR_FAIRE_FILE, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='|')
        header = next(reader)
        
        # Find relevant columns
        print("Savoir-faire columns:")
        for i, h in enumerate(header):
            print(f"  [{i}] {h}")
        print()
        
        for row in reader:
            if len(row) < 5:
                continue
            rpps = row[2].strip() if len(row) > 2 else ''  # Identification nationale
            savoir_faire = row[6].strip() if len(row) > 6 else ''  # Libellé savoir-faire
            
            if rpps in nurses and savoir_faire:
                if savoir_faire not in nurses[rpps]['specialties']:
                    nurses[rpps]['specialties'].append(savoir_faire)
                    enriched += 1
    
    print(f"Enriched {enriched} specialties across nurses")


def stats(nurses):
    """Print stats about the extracted data."""
    total = len(nurses)
    with_phone = sum(1 for n in nurses.values() if n['phone'])
    with_email = sum(1 for n in nurses.values() if n['email'])
    with_address = sum(1 for n in nurses.values() if n['postal_code'])
    
    # Department distribution
    dept_count = defaultdict(int)
    for n in nurses.values():
        dept_count[n['department']] += 1
    
    top_depts = sorted(dept_count.items(), key=lambda x: -x[1])[:15]
    
    # Gender
    female = sum(1 for n in nurses.values() if n['gender'] == 'F')
    
    print(f"\n{'='*50}")
    print(f"STATISTIQUES BASE IDEL")
    print(f"{'='*50}")
    print(f"Total IDEL libéraux: {total:,}")
    print(f"Avec téléphone:      {with_phone:,} ({100*with_phone/total:.1f}%)")
    print(f"Avec email:          {with_email:,} ({100*with_email/total:.1f}%)")
    print(f"Avec adresse:        {with_address:,} ({100*with_address/total:.1f}%)")
    print(f"Femmes:              {female:,} ({100*female/total:.1f}%)")
    print(f"Hommes:              {total-female:,} ({100*(total-female)/total:.1f}%)")
    print(f"\nTop 15 départements:")
    for dept, count in top_depts:
        print(f"  {dept:5s}: {count:,} IDEL")


def main():
    print("=" * 50)
    print("EXTRACTION IDEL FRANCE - RPPS data.gouv.fr")
    print("=" * 50)
    
    print("\n[1/3] Parsing RPPS main file...")
    nurses = parse_rpps()
    
    print("\n[2/3] Enriching with savoir-faire...")
    parse_savoir_faire(nurses)
    
    print("\n[3/3] Writing output...")
    nurse_list = sorted(nurses.values(), key=lambda n: (n['department'], n['city'], n['last_name']))
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(nurse_list, f, ensure_ascii=False, indent=None)
    
    file_size = os.path.getsize(OUTPUT_FILE) / (1024 * 1024)
    print(f"Written {OUTPUT_FILE} ({file_size:.1f} MB)")
    
    stats(nurses)
    
    # Also write a sample
    sample_file = OUTPUT_FILE.replace('.json', '_sample.json')
    with open(sample_file, 'w', encoding='utf-8') as f:
        json.dump(nurse_list[:10], f, ensure_ascii=False, indent=2)
    print(f"\nSample written to {sample_file}")


if __name__ == '__main__':
    main()
