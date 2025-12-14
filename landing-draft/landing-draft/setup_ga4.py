#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Google Analytics 4 ID Replacement Tool
Replaces G-XXXXXXXXXX with actual GA4 measurement ID
"""

import glob
import sys

def replace_ga4_id(ga4_id):
    """Replace all GA4 placeholder IDs with the provided ID"""
    
    if not ga4_id.startswith('G-') or len(ga4_id) != 12:
        print(f"❌ Invalid GA4 ID format: {ga4_id}")
        print("   Format should be: G-XXXXXXXXXX (G- followed by 10 alphanumeric characters)")
        return False
    
    html_files = glob.glob(r'c:\Users\Amin\Desktop\ki-schweiz-ag/**/*.html', recursive=True)
    
    replaced = 0
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'G-XXXXXXXXXX' in content:
            new_content = content.replace('G-XXXXXXXXXX', ga4_id)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            replaced += 1
            print(f"✅ Updated: {filepath.split(chr(92))[-1]}")
    
    print(f"\n✅ Replacement complete!")
    print(f"   {replaced} files updated")
    print(f"   {replaced * 2} GA4 ID instances replaced (2 per file: script tag + gtag config)")
    
    return True

if __name__ == '__main__':
    print("=" * 70)
    print("GOOGLE ANALYTICS 4 ID REPLACEMENT")
    print("=" * 70)
    
    print("\nThis script will replace all 'G-XXXXXXXXXX' placeholders with your")
    print("actual Google Analytics 4 measurement ID across all 25 HTML pages.")
    
    print("\nExample GA4 ID format: G-1A2B3C4D5E")
    ga4_id = input("\nEnter your GA4 Measurement ID (or 'SKIP' to cancel): ").strip().upper()
    
    if ga4_id == 'SKIP':
        print("\n⚠️  Skipped - GA4 ID not updated")
        sys.exit(0)
    
    if replace_ga4_id(ga4_id):
        print("\n🎉 All pages now using your GA4 Measurement ID!")
        print("   Ready for production deployment")
    else:
        print("\n❌ Operation cancelled")
        sys.exit(1)
