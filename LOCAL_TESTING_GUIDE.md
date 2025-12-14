# 🧪 Lokales Testing Guide - KI.NETIC Dashboard

## Quick Start (für lokale Tests)

### Option 1: VS Code Live Server
```
1. Öffne Ordner in VS Code: c:\Projects\ki_beratung_schweiz-main
2. Installiere Extension: "Live Server" (Five Server)
3. Rechtsklick auf index.html → "Open with Live Server"
4. Browser öffnet http://localhost:5500/index.html
5. Teste Assessment-Flow und Redirect zu dashboard.html
```

### Option 2: Python SimpleHTTP
```powershell
# Windows PowerShell
cd c:\Projects\ki_beratung_schweiz-main
python -m http.server 8000

# Dann Browser: http://localhost:8000/index.html
```

### Option 3: Node.js http-server
```bash
npm install -g http-server
cd c:\Projects\ki_beratung_schweiz-main
http-server

# Dann Browser: http://127.0.0.1:8080
```

---

## 🔍 Test Scenarios

### Scenario 1: Vollständiger Assessment-Flow
**Ziel**: Assessment abschließen und zu Dashboard redirecten

1. **Öffne**: http://localhost:5500/index.html
2. **Klick**: "Unternehmen analysieren" Button → Modal öffnet
3. **Step 1**: Wähle Branche z.B. "📊 Buchhaltung" → Next
4. **Step 2**: Schiebe alle 4 Slider nach rechts (höhere Werte = mehr Potential) → Next
5. **Step 3**: Wähle 2-3 Pain Points z.B. "Doppeleingaben", "Fehleranfälligkeit" → Next
6. **Step 4**: Fülle ein: 
   - Name: "Max Müller"
   - E-Mail: "max@example.com"
   - Unternehmen: "Müller Treuhand"
   - → Submit
7. **Erwartung**: 
   - ✅ Score berechnet (z.B. 75/100)
   - ✅ Daten in Console → `sessionStorage.getItem('assessmentData')`
   - ✅ Redirect zu `dashboard.html`
   - ✅ Dashboard-Metriken laden mit Animationen

### Scenario 2: Scenario Sliders testen
**Ziel**: Live ROI-Neuberechnung funktioniert

1. **Im Dashboard**: Scrolle zu "🎚️ Szenarios individualisieren"
2. **Bot-Slider**: Ziehe von 60% → 90%
   - ✅ Label aktualisiert: "60%" → "90%"
   - ✅ Metric-Boxes blinken auf (pulse-Effekt)
   - ✅ "Einsparung/Jahr" erhöht sich (z.B. CHF 85K → CHF 128K)
   - ✅ ROI-Kurve redraws sich
3. **Tempo-Slider**: Ziehe von "Standard" → "Schnell"
   - ✅ Label wechselt
   - ✅ "Implementierung: CHF" erhöht sich (schneller = teurer)
   - ✅ ROI-Monate ändern sich
4. **Depth-Slider**: Ziehe von "Standard" → "Tiefintegration"
   - ✅ Label ändert
   - ✅ Alle Metriken erhöhen sich (tiefere Integration = größerer Impact)
5. **PDF-Button**: Klick "📊 Szenario-Vergleich als PDF"
   - ✅ TXT-Datei downloaden mit aktuellen Werten
6. **Reset**: Klick "↻ Zurücksetzen"
   - ✅ Alle Slider zurück zu Defaults (60%, Standard, Standard)
   - ✅ Metriken zurück zu Original-Assessment-Werten

### Scenario 3: Video-Integration
**Ziel**: Video-Player funktioniert

1. **Im Dashboard**: Scrolle zu "💡 Erklär-Video"
2. **Sichtbarkeit**: 
   - ✅ YouTube iFrame sichtbar, 16:9 Verhältnis
   - ✅ Thumbnail sichtbar
   - ✅ Play-Button zentriert
3. **Interaktion**:
   - ✅ Klick Play → Video startet
   - ✅ Controls sichtbar (play, pause, volume, fullscreen, timeline)
4. **Responsive**:
   - Minimiere Browser auf <768px Breite
   - ✅ Video bleibt 16:9, responsive skaliert

### Scenario 4: Progress Bar
**Ziel**: Progress Bar aktualisiert sich beim Scroll

1. **Im Dashboard**: Öffne DevTools (F12) → Inspect `<div class="progress-bar">`
2. **Scroll oben**: 
   - ✅ Progress-Bar: width ~5%
3. **Scroll Mitte**:
   - ✅ Progress-Bar: width ~50%
4. **Scroll unten**:
   - ✅ Progress-Bar: width ~95%
5. **Animation**:
   - ✅ Smooth transition (0.3s)
   - ✅ Gradient sichtbar (Lime → Cyan)

### Scenario 5: Booking Step Indicator
**Ziel**: Step-Dots aktualisieren sich bei User-Interaktion

1. **Page Load**:
   - ✅ Step 1: grün + aktiv (pulsierend)
   - ✅ Step 2 & 3: grau + inaktiv
2. **Scrolle zu Booking**:
   - ✅ Step 1 bleibt aktiv
3. **Klick auf Termin-Button (Calendly)**:
   - ✅ Step 2 wird aktiv
   - ✅ Step 1 wird "completed" (Lime-Farbe)
4. **Fülle Lead-Form aus** (Name + Email + Company):
   - ✅ Step 3 wird aktiv (pulsiert)
   - ✅ Step 2 wird "completed"
5. **Click Submit**:
   - ✅ Alert: "Termin gebucht! Bestätigung kommt per E-Mail."
   - ✅ Redirect zu index.html (oder Confirmation-Page)

### Scenario 6: Calendly Integration
**Ziel**: Calendly iFrame lädt mit Pre-filled Daten

1. **Im Dashboard**: Scrolle zu "🗓️ Termin buchen"
2. **Calendly iFrame**:
   - ✅ iFrame lädt (https://calendly.com/info-ki-netic/30min)
   - ✅ Calendly-UI sichtbar
   - ✅ Datum/Zeit-Selector funktioniert
3. **Pre-filled Data**:
   - ✅ Name aus Assessment: "Max Müller" (falls vorhanden)
   - ✅ E-Mail aus Assessment: "max@example.com" (falls vorhanden)
4. **Booking**:
   - Wähle Termin + Zeit in Calendly
   - ✅ Wird zu Calendly-Kalender hinzugefügt
   - ✅ iCal-Email wird verschickt

### Scenario 7: Alternative Lead-Form
**Ziel**: Formspree-Integration funktioniert (Fallback zu Calendly)

1. **Im Dashboard**: Scrolle zu Lead-Form (rechts neben Calendly)
2. **Ausfüllen**:
   - Name: "Sandra Schmidt"
   - E-Mail: "sandra@example.com"
   - Telefon: "+41 79 123 45 67"
   - Unternehmen: "Schmidt Immobilien"
3. **Submit**:
   - ✅ Button deaktiviert (loading state)
   - ✅ Network-Request zu Formspree (DevTools → Network-Tab)
   - ✅ Response Status 200 OK
   - ✅ Alert: "✓ Termin gebucht! Bestätigung kommt per E-Mail."
   - ✅ Redirect zu index.html

### Scenario 8: Mobile Responsiveness
**Ziel**: Dashboard responsive auf allen Screen-Sizes

1. **Desktop** (1400px+):
   - ✅ 2-Column Layout (Metrics, Charts)
   - ✅ 2-Column Booking (Calendly | Form)
   - ✅ Full-width Slider Section
2. **Tablet** (768-1399px):
   - ✅ 1-Column Layout für Metrics
   - ✅ 1-Column Booking (Calendly oben, Form unten)
   - ✅ Slider Grid angepasst
3. **Mobile** (<768px):
   - ✅ Single-Column für alles
   - ✅ Video responsive (16:9)
   - ✅ Buttons full-width
   - ✅ Font-Größen lesbar
   - ✅ Keine horizontale Scroll-Bar

---

## 🐛 Debugging & Console Logs

### Check sessionStorage Data
```javascript
// In DevTools Console (F12)
JSON.parse(sessionStorage.getItem('assessmentData'))

// Output sollte sein:
{
  "score": 75,
  "level": "Hohes Potenzial",
  "color": "#00FF88",
  "savings": 85000,
  "roiMonths": 8,
  "implCost": 50000,
  "weeklyHours": 18,
  "co2Saved": 12500,
  "branche": "buchhaltung",
  "branchLabel": "📊 Buchhaltung",
  ...
}
```

### Monitor Slider Events
```javascript
// In DevTools Console
document.getElementById('bot-slider').addEventListener('input', (e) => {
  console.log('Bot slider changed:', e.target.value);
});
```

### Check Formspree Integration
```javascript
// In DevTools → Network Tab
// Beim Form-Submit solltest du sehen:
// POST https://formspree.io/f/xanyzvrl
// Status: 200 OK
// Response: {"ok": true}
```

### Progress Bar Testing
```javascript
// In DevTools Console
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  console.log('Scroll %:', pct.toFixed(1));
});
```

---

## 🚨 Häufige Probleme & Lösungen

### Problem: Redirect zu dashboard.html funktioniert nicht
**Lösung**:
1. Überprüfe, dass `dashboard.html` im gleichen Ordner wie `index.html` ist
2. Check browser console (F12) auf Fehler
3. Verifiziere: `sessionStorage.setItem()` Zeile ist in `index.html` vorhanden

### Problem: Dashboard zeigt "Berechnung lädt..." und keine Daten
**Lösung**:
1. Komme von `index.html` und schließe Assessment ab (nicht direkt zum Dashboard gehen)
2. Öffne DevTools → Application Tab → Session Storage
3. Verifiziere `assessmentData` ist dort gespeichert
4. Reload dashboard.html

### Problem: Calendly iFrame lädt nicht
**Lösung**:
1. Ändere URL zu gültiger Calendly-URL (aktuell: `info-ki-netic`)
2. Überprüfe: Domain-Whitelist in Calendly Settings (allow all origins)
3. Test alternative: Custom Lead-Form sollte funktionieren

### Problem: Sliders updaten Metriken nicht
**Lösung**:
1. Überprüfe in Console: `updateScenarios()` wird aufgerufen
2. Verifiziere: `oninput="updateScenarios()"` ist im HTML
3. Check: Metric-Elements existieren (z.B. `id="metric-savings"`)

### Problem: Formspree-Form sendet nicht
**Lösung**:
1. Überprüfe Form-ID: `f/xanyzvrl` (muss gültig sein)
2. Teste mit echte E-Mail-Adresse (nicht @example.com)
3. Check Formspree Dashboard: https://formspree.io/
4. Akzeptiere Initial-Confirmation-Email von Formspree

### Problem: Video zeigt Placeholder statt Inhalt
**Lösung**:
1. Ändere Video-ID in `<iframe src="https://www.youtube-nocookie.com/embed/YOUR_ID_HERE">`
2. Finde deine Video-ID: youtu.be/{VIDEO_ID} oder youtube.com/?v={VIDEO_ID}
3. Test mit bekanntem Video zum Verifizieren

---

## 📊 Performance Monitoring

### Chrome DevTools Audit
```
1. F12 → Lighthouse Tab
2. Click "Generate report"
3. Ziele:
   ✅ Performance: >90
   ✅ Accessibility: >90
   ✅ Best Practices: >90
   ✅ SEO: >90
```

### Network Tab
```
Expected Files:
- index.html (65 KB)
- dashboard.html (45 KB)
- style.css (shared, inline)
- script.js (shared, inline)
- Google Fonts (cached)

Total Load Time: <2 seconds
```

---

## ✅ Pre-Launch Checklist

- [ ] Assessment Flow (index.html) funktioniert
- [ ] Dashboard lädt Daten aus sessionStorage
- [ ] Alle 6 Metrics anzeigen sich
- [ ] Scenario Sliders updaten Live
- [ ] Charts rendern korrekt (ROI + Breakdown)
- [ ] Video-Embed sichtbar
- [ ] Progress Bar scrolls
- [ ] Booking Step-Indicator funktioniert
- [ ] Calendly iFrame lädt
- [ ] Lead-Form submittet zu Formspree
- [ ] Mobile responsive (<768px)
- [ ] Alle Links funktionieren (email, print, PDF)
- [ ] Keine Console Errors
- [ ] Google Analytics integriert (optional)
- [ ] Trust-Badges sichtbar
- [ ] Testimonials zeigen sich
- [ ] Timeline-Roadmap animiert

---

**Pro Tip**: Nutze `Ctrl+Shift+K` in Chrome für schnelle Console-Access!
