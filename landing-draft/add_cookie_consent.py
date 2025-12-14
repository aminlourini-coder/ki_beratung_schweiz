#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Skript zum Hinzufügen von Cookie-Consent zu allen HTML-Dateien
"""

import os
import re
from pathlib import Path

BASE_PATH = Path(__file__).parent

def add_cookie_consent_to_page(file_path):
    """Füge Cookie-Consent Script zu einer HTML-Datei hinzu"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip wenn bereits vorhanden
    if 'cookie-consent' in content:
        return False
    
    # Suche nach </body>
    if '</body>' in content:
        # Füge Cookie-Consent vor </body> ein
        new_body = '''  <script src="../js/cookie-consent.js"></script>
</body>'''
        
        # Aber: relativ Pfade anpassen basiert auf Dateiort
        if str(file_path).endswith('index.html'):
            new_body = '''  <script src="js/cookie-consent.js"></script>
</body>'''
        
        content = content.replace('</body>', new_body)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    
    return False

def main():
    html_files = list(BASE_PATH.glob('**/*.html'))
    updated = 0
    skipped = 0
    
    print(f"Gefundene HTML-Dateien: {len(html_files)}")
    print("=" * 60)
    
    for file_path in sorted(html_files):
        rel_path = file_path.relative_to(BASE_PATH)
        try:
            if add_cookie_consent_to_page(file_path):
                print(f"✓ Cookie-Consent hinzugefügt: {rel_path}")
                updated += 1
            else:
                print(f"- Übersprungen: {rel_path}")
                skipped += 1
        except Exception as e:
            print(f"✗ Fehler in {rel_path}: {e}")
    
    print("=" * 60)
    print(f"Aktualisiert: {updated}")
    print(f"Übersprungen: {skipped}")

if __name__ == '__main__':
    main()
