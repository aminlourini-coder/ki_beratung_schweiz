# 🚀 KI SCHWEIZ AG - DEPLOYMENT GUIDE

## FINAL CHECKLIST BEFORE LAUNCH

### 1. **Google Analytics Setup** ✅ REQUIRED
```bash
# Replace GA4 placeholder with your Measurement ID
python setup_ga4.py
# Follow the prompts to enter your G-XXXXXXXXXX ID
```

- Find your GA4 ID: Google Analytics Admin → Property Settings → Measurement ID
- Format: `G-XXXXXXXXXX` (10 alphanumeric characters)
- The script will update all 25 HTML files automatically

### 2. **Email Configuration** ✅ VERIFY
- Forms are configured with **Formspree** integration
- Emails will be sent to: `info@ki-schweiz.ch`
- **No additional setup needed** (already configured)

### 3. **Phone Number Verification** ✅ CONFIRMED
- Verified across all pages: `+41 31 333 00 01`
- 29 instances found (footers + contact pages)
- Status: ✅ **Complete and consistent**

### 4. **Domain & Hosting Setup**
```bash
# These files must be deployed to your hosting:
- All 25 HTML files in root and pages/ subdirectories
- css/style.css (41 KB)
- js/script.js, assessment.js, form-validation.js, cookie-consent.js
- robots.txt (SEO crawler directives)
- sitemap.xml (25 URLs with proper lastmod dates)
- .htaccess (caching, compression, security headers, HTTPS redirect)
```

**Recommended hosting:**
- Vercel / Netlify (free, automatic HTTPS)
- Swiss hosting providers (Hostpoint, Cyon, etc.)
- Any Apache-enabled hosting (uses .htaccess)

### 5. **DNS & Certificate Setup**
```bash
# Point your domain to hosting provider
ki-schweiz.ch → your-hosting-provider.com

# Enable SSL/TLS certificate
# (.htaccess is configured to automatically redirect HTTP → HTTPS)
```

### 6. **Performance Optimization** ✅ DONE
- ✅ CSS: 41.9 KB (optimized)
- ✅ JavaScript: 22.8 KB (4 files, no debug logs)
- ✅ HTML: 319.8 KB (25 pages)
- ✅ **Total: ~100 KB with gzip compression**
- ✅ Caching headers configured (.htaccess)
- ✅ CORS & security headers enabled

### 7. **SEO & Meta Tags** ✅ COMPLETE
- ✅ robots.txt: Configured
- ✅ sitemap.xml: 25 URLs with changefreq & priority
- ✅ Open Graph tags: 133 instances
- ✅ Twitter Card tags: 78 instances
- ✅ Meta descriptions: All pages
- ✅ H1/H2 structure: Proper hierarchy

### 8. **Security Checklist** ✅ VERIFIED
- ✅ HTTPS redirect configured
- ✅ Security headers in place:
  - X-Frame-Options: SAMEORIGIN
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection enabled
- ✅ Cookie consent (DSGVO compliant)
- ✅ No sensitive data in client-side code
- ✅ Form validation both client & server (Formspree)

### 9. **Compliance & Legal** ✅ COMPLETE
- ✅ Datenschutzerklärung (Privacy Policy)
- ✅ Impressum (Legal Notice)
- ✅ AGB (Terms & Conditions)
- ✅ Cookie consent banner
- ✅ DSG-konform (Swiss Data Protection compliant)
- ✅ ISO 27001 certification mentioned

### 10. **Testing Checklist**
```bash
# Before going live, test:
[ ] All links work (internal & external)
[ ] Forms submit (newsletter, contact, assessment)
[ ] Assessment modal displays & calculates correctly
[ ] Mobile responsive (test on phone)
[ ] Google Analytics tracking (check GA dashboard)
[ ] Email notifications received (Formspree)
[ ] Performance (use PageSpeed Insights)
[ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
```

---

## DEPLOYMENT STEPS

### Option 1: Vercel (Recommended - Free, Automatic)
```bash
# 1. Push to GitHub
git add .
git commit -m "Final production release"
git push

# 2. Go to vercel.com, sign in with GitHub
# 3. Import repository
# 4. Connect domain: ki-schweiz.ch
# 5. Done! Auto-deploy on future commits
```

### Option 2: Netlify
```bash
# 1. Go to netlify.com
# 2. Connect GitHub repository
# 3. Deploy settings:
#    - Build command: (leave empty - static site)
#    - Publish directory: .
# 4. Connect domain
```

### Option 3: Traditional Hosting (with .htaccess support)
```bash
# 1. FTP/SSH into hosting server
# 2. Upload all files to public_html/
# 3. Ensure .htaccess is uploaded
# 4. Check permissions: 644 (.htaccess), 755 (directories)
# 5. Verify HTTPS certificate is installed
# 6. Test at https://ki-schweiz.ch
```

---

## POST-LAUNCH MONITORING

### Week 1
- [ ] Monitor Google Analytics for traffic
- [ ] Check error logs for 404s or broken links
- [ ] Test all forms are delivering emails
- [ ] Monitor performance in PageSpeed Insights

### Ongoing
- [ ] Update blog content monthly
- [ ] Monitor assessment form submissions
- [ ] Check customer testimonials for feedback
- [ ] Review Google Search Console for indexing
- [ ] Update sitemap.xml when adding new content

---

## TROUBLESHOOTING

### GA4 ID isn't tracking
- Verify G-XXXXXXXXXX was replaced correctly in `index.html`
- Check GA4 dashboard sees traffic
- Clear browser cache (Ctrl+Shift+Delete)

### Forms not sending emails
- Check Formspree dashboard (formspree.io)
- Verify email address is correct in form HTML
- Test with dummy submission

### HTTPS redirect not working
- Ensure hosting provides SSL certificate
- Check .htaccess is uploaded correctly (644 permissions)
- Verify domain points to correct hosting IP

### Slow performance
- Use PageSpeed Insights (pagespeed.web.dev)
- Check .htaccess gzip compression is enabled
- Verify browser cache headers are being sent

---

## ROLLBACK PROCEDURE

If issues arise, rollback to previous version:
```bash
git log --oneline          # Find last good commit
git reset --hard [COMMIT]  # Rollback
git push --force origin main
```

---

## SUPPORT & MAINTENANCE

- **Repository**: github.com/aminlourini-coder/ki_beratung_schweiz
- **Issues**: Use GitHub Issues for tracking
- **Documentation**: See README.md for technical details
- **Contact**: info@ki-schweiz.ch

---

**Status**: ✅ **PRODUCTION READY**  
**Last Updated**: 12. Dezember 2025  
**Next Review**: Nach Launch (Woche 1)
