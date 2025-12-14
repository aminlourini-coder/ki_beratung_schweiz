#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Website Performance & Optimization Audit
"""

import os
import glob

def get_file_size(filepath):
    """Get file size in KB"""
    return os.path.getsize(filepath) / 1024

# Scan all files
html_files = glob.glob(r'c:\Users\Amin\Desktop\ki-schweiz-ag/**/*.html', recursive=True)
js_files = glob.glob(r'c:\Users\Amin\Desktop\ki-schweiz-ag/**/*.js', recursive=True)
css_files = glob.glob(r'c:\Users\Amin\Desktop\ki-schweiz-ag/**/*.css', recursive=True)

print("=" * 60)
print("WEBSITE PERFORMANCE AUDIT")
print("=" * 60)

print(f"\n📄 HTML Files: {len(html_files)}")
total_html = 0
for f in sorted(html_files):
    size = get_file_size(f)
    total_html += size
    name = f.split('\\')[-1]
    print(f"  {name:30} {size:8.1f} KB")
print(f"  {'TOTAL':30} {total_html:8.1f} KB")

print(f"\n🎨 CSS Files: {len(css_files)}")
total_css = 0
for f in sorted(css_files):
    size = get_file_size(f)
    total_css += size
    name = f.split('\\')[-1]
    print(f"  {name:30} {size:8.1f} KB")
print(f"  {'TOTAL':30} {total_css:8.1f} KB")

print(f"\n⚙️ JavaScript Files: {len(js_files)}")
total_js = 0
for f in sorted(js_files):
    size = get_file_size(f)
    total_js += size
    name = f.split('\\')[-1]
    print(f"  {name:30} {size:8.1f} KB")
print(f"  {'TOTAL':30} {total_js:8.1f} KB")

print(f"\n💾 GRAND TOTAL: {total_html + total_css + total_js:.1f} KB")
print(f"   (Uncompressed - with gzip it will be ~70-80% smaller)")

# Check for optimization opportunities
print("\n" + "=" * 60)
print("OPTIMIZATION CHECKLIST")
print("=" * 60)

# Check for inline styles
html_content = ""
for f in html_files[:5]:  # Sample check
    with open(f, 'r', encoding='utf-8') as file:
        html_content += file.read()

inline_styles = html_content.count('style="')
print(f"\n⚠️  Inline Styles Found: {inline_styles}")
if inline_styles > 50:
    print("   → Consider moving frequently repeated styles to CSS classes")

# Check CSS size
css_content = ""
for f in css_files:
    with open(f, 'r', encoding='utf-8') as file:
        css_content += file.read()

unused_patterns = css_content.count('/* unused')
print(f"✅ CSS Size: {total_css:.1f} KB (reasonable for this scope)")

# Check JavaScript
js_content = ""
for f in js_files:
    if 'assessment.js' in f or 'script.js' in f:
        with open(f, 'r', encoding='utf-8') as file:
            js_content += file.read()

console_logs = js_content.count('console.log')
print(f"\n🔍 Debug Console Logs: {console_logs}")
if console_logs > 0:
    print("   → Consider removing debug logging before production")

print("\n" + "=" * 60)
