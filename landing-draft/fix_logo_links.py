#!/usr/bin/env python3
"""Fix logo links on all pages"""

import glob

files = glob.glob('pages/**/*.html', recursive=True)

for file in files:
    if 'dienstleistungen.html' in file:
        continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<div class="logo">KI Schweiz AG</div>' in content:
        depth = file.count('/')
        href = '../index.html' if depth == 1 else '../../index.html'
        
        new_content = content.replace(
            '<div class="logo">KI Schweiz AG</div>',
            f'<a href="{href}" class="logo">KI Schweiz AG</a>'
        )
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'✓ {file}')

print("✅ All logos fixed!")
