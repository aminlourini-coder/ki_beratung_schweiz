# KI Schweiz AG - Website Dokumentation

**Stand:** 12. Dezember 2025  
**Status:** ✅ Produktionsbereit

---

## 📋 Inhaltsverzeichnis

1. [Installation & Setup](#installation--setup)
2. [Deployment](#deployment)
3. [Performance](#performance)
4. [Sicherheit](#sicherheit)
5. [Wartung](#wartung)
6. [Kontakt](#kontakt)

---

## Installation & Setup

### Anforderungen
- Node.js 14+ (optional, für Build-Tools)
- Git
- PHP 7.4+ (wenn gehostet auf Linux/Unix Server)
- Apache mit mod_rewrite (wenn gehostet auf Apache)

### Lokales Setup

```bash
# Repository klonen
git clone https://github.com/aminlourini-coder/ki_beratung_schweiz.git
cd ki-schweiz-ag

# Dateirechte prüfen
chmod 644 .htaccess
chmod 755 .

# Lokal testen mit Python HTTP Server
python -m http.server 8000
# Öffne http://localhost:8000
```

---

## Deployment

### Anforderungen vor Deploy
- [ ] Google Analytics ID ersetzen (in allen HTML-Dateien `G-XXXXXXXXXX` → echte ID)
- [ ] Telefonnummer verifizieren (+41 31 333 00 01)
- [ ] Email testen (info@ki-schweiz.ch)
- [ ] Alle Links prüfen
- [ ] Performance Test durchführen

### Deployment zu Hosting-Provider

#### Option 1: FTP Upload (empfohlen für einfaches Hosting)

```bash
# 1. Installiere FTP Client (z.B. FileZilla)
# 2. Stelle Verbindung her mit Hosting-Credentials
# 3. Lade alle Dateien ausser .git/ hoch:
#    - index.html
#    - pages/
#    - css/
#    - js/
#    - sitemap.xml
#    - robots.txt
#    - .htaccess
```

#### Option 2: Git Deploy (empfohlen für GitHub Pages / Hosting mit Git-Support)

```bash
# SSH Key zu Server hinzufügen
ssh-keygen -t ed25519 -f ~/.ssh/id_hosting

# SSH Public Key zu Hosting konfigurieren
cat ~/.ssh/id_hosting.pub

# Git Remote hinzufügen
git remote add production git@hosting.provider.ch:ki-schweiz.git

# Deploy mit Git Push
git push production main
```

#### Option 3: GitHub Pages Deploy (kostenlos, öffentlich)

```bash
# Nur wenn die Repo öffentlich ist
# GitHub Actions / Settings → Pages → Deploy from main branch
```

### Post-Deployment Checklist

```bash
# 1. Website aufrufen und Visual prüfen
https://ki-schweiz.ch

# 2. Google Search Console prüfen
# Settings → Add Property → domain
# Upload sitemap.xml
# Check robots.txt

# 3. SSL/HTTPS testen
# Alle Links müssen HTTPS sein
# Mixed Content Warning prüfen

# 4. Performance prüfen
# Google PageSpeed Insights
# Lighthouse Report
```

---

## Performance

### Caching aktivieren

Die `.htaccess` Datei konfiguriert automatisch:
- ✓ Gzip Compression für HTML/CSS/JS
- ✓ Browser Caching (1 Tag für HTML, 1 Monat für CSS/JS)
- ✓ ETag Handling

### Performance Optimierungen durchgeführt

- ✅ CSS inline auf kritischen Seiten
- ✅ JavaScript minified (assessment.js, script.js)
- ✅ Google Fonts werden gecacht
- ✅ Canvas-Animation optimiert für Mobile

### Weitere Optimierungen (optional)

```bash
# CSS Minification
npm install -g cssnano
cssnano css/style.css -o css/style.min.css

# JavaScript Minification
npm install -g terser
terser js/script.js -o js/script.min.js
terser js/assessment.js -o js/assessment.min.js

# Dann in HTML ersetzen:
# <link rel="stylesheet" href="css/style.min.css" />
# <script src="js/script.min.js"></script>
```

### Speed Metrics Ziele

| Metrik | Target | Aktuell |
|--------|--------|---------|
| Lighthouse Score | >80 | Zu messen |
| Largest Contentful Paint | <2.5s | Zu messen |
| Cumulative Layout Shift | <0.1 | Zu messen |
| First Input Delay | <100ms | Zu messen |

---

## Sicherheit

### Implementierte Sicherheitsmassnahmen

✅ **HTTPS Only**
- Alle Requests werden zu HTTPS weitergeleitet
- HSTS Header gesetzt

✅ **Headers**
- X-Frame-Options: SAMEORIGIN (Clickjacking Schutz)
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

✅ **Bot/Crawler Protection**
- Robots.txt mit Allow/Disallow Rules
- Bad Bots blockiert (AhrefsBot, SemrushBot)
- Google & Bing erlaubt

✅ **Sensitive Files Protected**
- .git/ Zugriff blockiert
- .env Zugriff blockiert
- .htaccess Zugriff blockiert

✅ **Form Security**
- Formspree CSRF Token automatisch
- Email Validation
- Input Sanitization

### Security Checklist

- [ ] SSL/TLS Zertifikat aktiv (auto-renewal enabled)
- [ ] WAF (Web Application Firewall) aktiviert
- [ ] DDoS Protection aktiv
- [ ] Backup-System konfiguriert
- [ ] Monitoring Setup (Uptime, Errors)

---

## Wartung

### Tägliche Aufgaben
- [ ] Check Kontakt-Formulare (Emails ankommen)
- [ ] Newsletter-Anmeldungen prüfen
- [ ] Error Logs prüfen

### Wöchentliche Aufgaben
- [ ] Google Analytics Metriken überprüfen
- [ ] Traffic & Conversion Trends checken
- [ ] Performance Metrics prüfen

### Monatliche Aufgaben
- [ ] Link Checker durchführen
- [ ] Typos & Content Review
- [ ] Security Updates
- [ ] Backup verifikation
- [ ] Lighthouse Report generieren

### Vierteljährlich
- [ ] SEO Audit
- [ ] Competitor Analysis
- [ ] Content Gap Analysis
- [ ] User Journey Optimization

### Jährlich
- [ ] Komplette Website Redesign Review
- [ ] Analytics Deep Dive
- [ ] A/B Testing Ergebnisse Review
- [ ] Budget & Roadmap Planning

---

## Dateistruktur

```
ki-schweiz-ag/
├── index.html                 # Homepage
├── .htaccess                  # Apache Configuration
├── robots.txt                 # SEO Robots Directive
├── sitemap.xml               # XML Sitemap
├── optimize_html.py          # Python Optimization Script
├── css/
│   └── style.css             # Hauptstylesheet
├── js/
│   ├── script.js             # Main JavaScript
│   ├── assessment.js         # Assessment Modal Logic
│   └── form-validation.js    # Form Validation
├── pages/
│   ├── blog.html
│   ├── branchen.html
│   ├── dienstleistungen.html
│   ├── kontakt.html
│   ├── projekte.html
│   ├── ueber-uns.html
│   ├── impressum.html
│   ├── datenschutz.html
│   ├── agb.html
│   ├── blog/                 # Blog Artikel
│   │   ├── idp-101.html
│   │   ├── datenschutz-ki.html
│   │   ├── roi-berechnung.html
│   │   ├── chatbot-guide.html
│   │   ├── trend-report-2025.html
│   │   └── quick-wins.html
│   └── branchen/             # Branchenlösungen
│       ├── buchhaltung.html
│       ├── immobilien.html
│       ├── handwerk.html
│       ├── versicherung.html
│       ├── finanzen.html
│       ├── industrie.html
│       ├── handel.html
│       ├── gesundheit.html
│       └── energie.html
├── WEBSITE_AUDIT_REPORT.md
└── OPTIMIZATION_CHECKLIST.md
```

---

## Wichtige URLs

- **Homepage:** https://ki-schweiz.ch/
- **Blog:** https://ki-schweiz.ch/pages/blog.html
- **Kontakt:** https://ki-schweiz.ch/pages/kontakt.html
- **Sitemap:** https://ki-schweiz.ch/sitemap.xml
- **Robots.txt:** https://ki-schweiz.ch/robots.txt

---

## Google Analytics Setup

### Setup durchführen:

1. Gehe zu https://analytics.google.com
2. Erstelle neue Property für "ki-schweiz.ch"
3. Kopiere die Measurement ID (Format: G-XXXXXXXXXX)
4. Ersetze `G-XXXXXXXXXX` in allen HTML-Dateien

### Events zum Tracken:

```javascript
// CTA Button Click
gtag('event', 'button_click', {
  'button_name': 'cta_primary',
  'page_title': document.title
});

// Assessment Start
gtag('event', 'assessment_start', {
  'engagement_time_msec': 100
});

// Form Submission
gtag('event', 'form_submit', {
  'form_name': 'contact_form'
});
```

---

## Troubleshooting

### Problema: Assessment Modal funktioniert nicht
```javascript
// Debug: Prüfe ob Modal Element existiert
console.log(document.getElementById('assessment-modal'));
// Lösung: Stelle sicher form-validation.js geladen ist
```

### Problema: Telefonnummer wird nicht angezeigt
```html
<!-- Suche nach: -->
<a href="tel:+41313300001">+41 31 333 00 01</a>
<!-- Sollte sichtbar sein auf /pages/kontakt.html -->
```

### Problema: Google Analytics funktioniert nicht
```javascript
// Debug in Browser Console:
console.log(window.dataLayer);
// Sollte zeigen dass gtag geladen ist
// Prüfe ob G-XXXXXXXXXX noch Placeholder ist!
```

---

## Kontakt & Support

**Email:** info@ki-schweiz.ch  
**Telefon:** +41 31 333 00 01  
**Adresse:** Bahnhofstrasse 1, 8001 Zürich  
**GitHub:** https://github.com/aminlourini-coder/ki_beratung_schweiz

---

## Changelog

### v1.0.0 (12. Dezember 2025)
- ✅ Website Launch
- ✅ 25 HTML-Seiten
- ✅ Blog mit 6 Artikel
- ✅ 9 Branchenlösungen
- ✅ Assessment Modal
- ✅ Responsive Design
- ✅ SEO optimiert
- ✅ Analytics integriert

---

**Zuletzt aktualisiert:** 12. Dezember 2025
