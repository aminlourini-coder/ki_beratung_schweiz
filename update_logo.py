#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import glob

# Update all remaining HTML files with new logo
old_logo = '<a href="../../index.html" class="logo">KI Schweiz AG</a>'
new_logo = '<a href="../../index.html" class="logo">KI<span class="logo-dot">.</span>NETIC</a>'

blog_files = glob.glob(r'c:\Users\Amin\Desktop\ki-schweiz-ag\pages\blog\*.html')
branchen_files = glob.glob(r'c:\Users\Amin\Desktop\ki-schweiz-ag\pages\branchen\*.html')

all_files = blog_files + branchen_files
count = 0

for filepath in all_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_logo in content:
        content = content.replace(old_logo, new_logo)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"✅ Updated: {filepath.split(chr(92))[-1]}")

print(f"\n✓ Total: {count} files updated")
