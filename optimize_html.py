#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Skript zur automatischen Optimierung aller HTML-Dateien
- Fügt Google Analytics hinzu
- Fügt Open Graph Meta-Tags hinzu
- Fügt Twitter Card Tags hinzu
- Aktualisiert Telefonnummern
"""

import os
import re
from pathlib import Path

# Konfiguration
GA_ID = "G-XXXXXXXXXX"  # Ersetzen mit echter Google Analytics ID
PHONE_NUMBER = "+41313300001"
PHONE_DISPLAY = "+41 31 333 00 01"
EMAIL = "info@ki-schweiz.ch"

# Basispfad
BASE_PATH = Path(__file__).parent

def get_page_info(file_path):
    """Extrahiere Title und Description aus HTML-Datei"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    title_match = re.search(r'<title>([^<]+)</title>', content)
    desc_match = re.search(r'<meta name="description" content="([^"]+)"', content)
    
    title = title_match.group(1) if title_match else "KI Schweiz AG"
    description = desc_match.group(1) if desc_match else ""
    
    return title, description

def get_og_url(file_path):
    """Konvertiere Dateipfad zu URL"""
    rel_path = str(file_path.relative_to(BASE_PATH)).replace('\\', '/')
    if rel_path == "index.html":
        return "https://ki-schweiz.ch/"
    return f"https://ki-schweiz.ch/{rel_path}"

def create_ga_script():
    """Erstelle Google Analytics Script"""
    return f'''  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', '{GA_ID}');
  </script>'''

def create_og_tags(title, description, url):
    """Erstelle Open Graph Meta-Tags"""
    return f'''  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{url}" />
  <meta property="og:site_name" content="KI Schweiz AG" />'''

def create_twitter_tags(title, description):
    """Erstelle Twitter Card Tags"""
    return f'''  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />'''

def update_html_file(file_path):
    """Update eine einzelne HTML-Datei"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip wenn bereits GA Script vorhanden
    if 'G-XXXXXXXXXX' in content or 'gtag' in content:
        return False
    
    # Ersetze alte Telefonnummern
    content = content.replace('tel:+41XXXXXXXX', f'tel:{PHONE_NUMBER}')
    content = content.replace('+41 XX XXX XX XX', PHONE_DISPLAY)
    
    # Extrahiere Seiten-Info
    title, description = get_page_info(file_path)
    url = get_og_url(file_path)
    
    # Kurze Description falls leer
    if not description:
        description = "KI-Lösungen für Schweizer KMUs"
    
    # Erstelle Tags
    og_tags = create_og_tags(title, description, url)
    twitter_tags = create_twitter_tags(title, description)
    ga_script = create_ga_script()
    
    # Finde </head> und füge Tags vor </head> ein
    if '</head>' in content:
        # Entferne alte OG/Twitter Tags falls vorhanden
        content = re.sub(r'\n  <meta property="og:.*?\n', '\n', content)
        content = re.sub(r'\n  <meta name="twitter:.*?\n', '\n', content)
        
        # Füge neue Tags vor </head> ein
        new_head = f'''  {og_tags}
  {twitter_tags}
  {ga_script}
</head>'''
        content = content.replace('</head>', new_head)
    
    # Schreibe zurück
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    """Hauptfunktion"""
    html_files = list(BASE_PATH.glob('**/*.html'))
    updated_count = 0
    
    print(f"Gefundene HTML-Dateien: {len(html_files)}")
    print("=" * 60)
    
    for file_path in sorted(html_files):
        rel_path = file_path.relative_to(BASE_PATH)
        try:
            if update_html_file(file_path):
                print(f"✓ Aktualisiert: {rel_path}")
                updated_count += 1
            else:
                print(f"- Übersprungen: {rel_path} (GA bereits vorhanden)")
        except Exception as e:
            print(f"✗ Fehler in {rel_path}: {e}")
    
    print("=" * 60)
    print(f"Aktualisierte Dateien: {updated_count}/{len(html_files)}")
    print("\n⚠️  WICHTIG: Ersetze 'G-XXXXXXXXXX' mit echter Google Analytics ID!")

if __name__ == '__main__':
    main()
