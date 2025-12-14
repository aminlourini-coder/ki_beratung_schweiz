#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix block character mojibake in index.html
"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific broken line
old_line = '> Pipeline: [â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–'â–'] 84%'
new_line = '> Pipeline: [████████░░] 84%'

content = content.replace(old_line, new_line)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Fixed block characters in index.html")
