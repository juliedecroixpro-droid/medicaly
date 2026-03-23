#!/usr/bin/env python3
"""Enrich IDEL data: department from postal code, phone cleanup, stats."""

import json
import os
import re

INPUT = os.path.join(os.path.dirname(__file__), '..', 'data', 'idel_france.json')
OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'data', 'idel_france_clean.json')

DEPT_NAMES = {
    "01": "Ain", "02": "Aisne", "03": "Allier", "04": "Alpes-de-Haute-Provence",
    "05": "Hautes-Alpes", "06": "Alpes-Maritimes", "07": "Ardèche", "08": "Ardennes",
    "09": "Ariège", "10": "Aube", "11": "Aude", "12": "Aveyron",
    "13": "Bouches-du-Rhône", "14": "Calvados", "15": "Cantal", "16": "Charente",
    "17": "Charente-Maritime", "18": "Cher", "19": "Corrèze", "2A": "Corse-du-Sud",
    "2B": "Haute-Corse", "21": "Côte-d'Or", "22": "Côtes-d'Armor", "23": "Creuse",
    "24": "Dordogne", "25": "Doubs", "26": "Drôme", "27": "Eure",
    "28": "Eure-et-Loir", "29": "Finistère", "30": "Gard", "31": "Haute-Garonne",
    "32": "Gers", "33": "Gironde", "34": "Hérault", "35": "Ille-et-Vilaine",
    "36": "Indre", "37": "Indre-et-Loire", "38": "Isère", "39": "Jura",
    "40": "Landes", "41": "Loir-et-Cher", "42": "Loire", "43": "Haute-Loire",
    "44": "Loire-Atlantique", "45": "Loiret", "46": "Lot", "47": "Lot-et-Garonne",
    "48": "Lozère", "49": "Maine-et-Loire", "50": "Manche", "51": "Marne",
    "52": "Haute-Marne", "53": "Mayenne", "54": "Meurthe-et-Moselle", "55": "Meuse",
    "56": "Morbihan", "57": "Moselle", "58": "Nièvre", "59": "Nord",
    "60": "Oise", "61": "Orne", "62": "Pas-de-Calais", "63": "Puy-de-Dôme",
    "64": "Pyrénées-Atlantiques", "65": "Hautes-Pyrénées", "66": "Pyrénées-Orientales",
    "67": "Bas-Rhin", "68": "Haut-Rhin", "69": "Rhône", "70": "Haute-Saône",
    "71": "Saône-et-Loire", "72": "Sarthe", "73": "Savoie", "74": "Haute-Savoie",
    "75": "Paris", "76": "Seine-Maritime", "77": "Seine-et-Marne", "78": "Yvelines",
    "79": "Deux-Sèvres", "80": "Somme", "81": "Tarn", "82": "Tarn-et-Garonne",
    "83": "Var", "84": "Vaucluse", "85": "Vendée", "86": "Vienne",
    "87": "Haute-Vienne", "88": "Vosges", "89": "Yonne", "90": "Territoire de Belfort",
    "91": "Essonne", "92": "Hauts-de-Seine", "93": "Seine-Saint-Denis",
    "94": "Val-de-Marne", "95": "Val-d'Oise",
    "971": "Guadeloupe", "972": "Martinique", "973": "Guyane",
    "974": "La Réunion", "976": "Mayotte",
}


def postal_to_dept(postal_code):
    """Extract department code from postal code."""
    if not postal_code or len(postal_code) < 2:
        return "", ""
    
    # DOM-TOM: 3 digit department
    if postal_code.startswith(('971', '972', '973', '974', '976')):
        dept = postal_code[:3]
        return dept, DEPT_NAMES.get(dept, "")
    
    # Corse
    if postal_code.startswith('200') or postal_code.startswith('201'):
        return "2A", DEPT_NAMES["2A"]
    if postal_code.startswith('202') or postal_code.startswith('206'):
        return "2B", DEPT_NAMES["2B"]
    
    # Standard: first 2 digits
    dept = postal_code[:2]
    return dept, DEPT_NAMES.get(dept, "")


def clean_phone(phone):
    """Clean phone number to French format."""
    if not phone:
        return ""
    
    # Remove spaces, dots, dashes
    phone = re.sub(r'[\s.\-/]', '', phone)
    
    # Convert 0033 prefix to 0
    if phone.startswith('0033'):
        phone = '0' + phone[4:]
    elif phone.startswith('+33'):
        phone = '0' + phone[3:]
    
    # Validate French number (10 digits starting with 0)
    if re.match(r'^0[1-9]\d{8}$', phone):
        # Format nicely
        return f"{phone[:2]} {phone[2:4]} {phone[4:6]} {phone[6:8]} {phone[8:10]}"
    
    return phone if len(phone) >= 10 else ""


def main():
    print("Loading IDEL data...")
    with open(INPUT, 'r', encoding='utf-8') as f:
        nurses = json.load(f)
    
    print(f"Loaded {len(nurses)} IDEL")
    
    # Enrich
    for n in nurses:
        # Department from postal code
        if not n['department'] and n['postal_code']:
            n['department'], n['department_name'] = postal_to_dept(n['postal_code'])
        
        # Clean phones
        n['phone'] = clean_phone(n['phone'])
        n['phone2'] = clean_phone(n['phone2'])
        
        # Clean address (remove leading/trailing spaces)
        n['address'] = n['address'].strip()
        if n['address'] == ',':
            n['address'] = ''
    
    # Remove IDEL without ANY useful data (no address, no phone)
    complete = [n for n in nurses if n['postal_code'] or n['phone'] or n['phone2']]
    incomplete = len(nurses) - len(complete)
    
    # Sort by department, city, name
    complete.sort(key=lambda n: (n['department'], n['city'], n['last_name']))
    
    # Stats
    from collections import defaultdict
    dept_count = defaultdict(int)
    for n in complete:
        dept_count[n['department']] += 1
    
    top_depts = sorted(dept_count.items(), key=lambda x: -x[1])[:20]
    
    with_phone = sum(1 for n in complete if n['phone'] or n['phone2'])
    with_addr = sum(1 for n in complete if n['address'] and n['address'] != f", {n['postal_code']} {n['city']}")
    
    print(f"\n{'='*50}")
    print(f"BASE IDEL NETTOYÉE")
    print(f"{'='*50}")
    print(f"Total IDEL exploitables: {len(complete):,}")
    print(f"Retirés (aucune donnée):  {incomplete:,}")
    print(f"Avec téléphone:           {with_phone:,} ({100*with_phone/len(complete):.1f}%)")
    print(f"Avec adresse complète:    {with_addr:,} ({100*with_addr/len(complete):.1f}%)")
    print(f"\nTop 20 départements:")
    for dept, count in top_depts:
        name = DEPT_NAMES.get(dept, '?')
        print(f"  {dept:3s} {name:30s}: {count:>6,} IDEL")
    
    # Write output
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(complete, f, ensure_ascii=False, indent=None)
    
    file_size = os.path.getsize(OUTPUT) / (1024 * 1024)
    print(f"\nWritten {OUTPUT} ({file_size:.1f} MB, {len(complete):,} IDEL)")
    
    # Sample with data
    sample = [n for n in complete if n['phone'] and n['address']][:10]
    sample_file = OUTPUT.replace('.json', '_sample.json')
    with open(sample_file, 'w', encoding='utf-8') as f:
        json.dump(sample, f, ensure_ascii=False, indent=2)
    print(f"Sample: {sample_file}")


if __name__ == '__main__':
    main()
