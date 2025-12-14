# 🎨 Customization Guide - KI.NETIC Dashboard

## Easy Customizations (No coding required)

### 1. Change Calendly URL
**File**: `dashboard.html`  
**Line**: Search for `https://calendly.com/info-ki-netic/30min`

```html
<!-- BEFORE -->
<iframe src="https://calendly.com/info-ki-netic/30min"></iframe>

<!-- AFTER - Replace with your Calendly URL -->
<iframe src="https://calendly.com/YOUR_USERNAME/30min"></iframe>
```

**How to find your Calendly URL**:
1. Login to Calendly.com
2. Go to Settings → Sharing
3. Copy your scheduling link
4. Extract the part after `calendly.com/`

---

### 2. Change YouTube Video
**File**: `dashboard.html`  
**Line**: Search for `dQw4w9WgXcQ` (Rick Roll placeholder)

```html
<!-- BEFORE -->
<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"></iframe>

<!-- AFTER -->
<iframe src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID"></iframe>
```

**How to find your Video ID**:
1. Go to youtube.com and find your video
2. Copy URL: `https://youtu.be/{VIDEO_ID}`
3. Or: `youtube.com?v={VIDEO_ID}`
4. The ID is 11 characters

**Example**: 
- URL: `https://youtu.be/9bZkp7q19f0`
- Video ID: `9bZkp7q19f0`

---

### 3. Change Email Address
**File**: Both `index.html` and `dashboard.html`

```html
<!-- Search for -->
info@ki-netic.ch

<!-- Replace with -->
your-email@yourdomain.com
```

**Places to update**:
- Footer contact links (2 places)
- Header mailto links (optional)
- Contact form emails

---

### 4. Change Company Name
**File**: Both `index.html` and `dashboard.html`

```html
<!-- Search for all instances -->
KI.NETIC
KI-NETIC
ki-netic.ch

<!-- Replace with your company name -->
YOUR_COMPANY
your-company.ch
```

---

### 5. Change Company Logo
**File**: Both files - search for `logo`

```html
<!-- Option A: Replace with text -->
<a href="index.html" class="logo">YOUR<span class="logo-dot">.</span>COMPANY</a>

<!-- Option B: Use image -->
<a href="index.html" class="logo">
  <img src="path/to/your-logo.png" alt="Company Logo" height="40">
</a>
```

---

### 6. Change Testimonials
**File**: `dashboard.html`  
**Line**: Search for `"💬 Was unsere Kunden sagen"`

```html
<!-- BEFORE -->
<p>"15 Stunden pro Woche gespart nach 2 Wochen."</p>
<div style="font-weight:800;">Marco Käppeli</div>
<div style="color:#00FFFF; font-size:0.9rem;">CEO, Käppeli Treuhand AG</div>

<!-- AFTER -->
<p>"Your customer quote here"</p>
<div style="font-weight:800;">John Doe</div>
<div style="color:#00FFFF; font-size:0.9rem;">Title, Company Name</div>
```

---

### 7. Change Trust Metrics
**File**: `dashboard.html`  
**Line**: Search for `"120+"` (trust section)

```html
<!-- BEFORE -->
<div style="font-size:2.5rem; font-weight:900; color:#00FF88;">120+</div>
<div style="color:#B0B0B0; font-weight:600;">Schweizer KMU beraten</div>

<!-- AFTER -->
<div style="font-size:2.5rem; font-weight:900; color:#00FF88;">YOUR_NUMBER</div>
<div style="color:#B0B0B0; font-weight:600;">Your description</div>
```

---

### 8. Change Colors (Branding)
**File**: Both files - CSS section at top

```css
/* Primary Colors */
:root {
  --color-cyan: #00FFFF;    /* Currently: Neon Cyan */
  --color-lime: #00FF88;    /* Currently: Lime Green */
  --color-dark: #0a0a0f;    /* Currently: Dark Background */
}

/* To change globally, search-replace: */
#00FFFF → #YOUR_PRIMARY_COLOR
#00FF88 → #YOUR_SECONDARY_COLOR
#0a0a0f → #YOUR_DARK_COLOR
```

**Popular Color Combinations**:
- Blue + Light Blue: `#2563EB` + `#60A5FA`
- Purple + Pink: `#A855F7` + `#EC4899`
- Green + Teal: `#10B981` + `#14B8A6`

---

### 9. Change Formspree Form ID
**File**: `dashboard.html`  
**Line**: Search for `f/xanyzvrl`

```javascript
/* BEFORE */
fetch('https://formspree.io/f/xanyzvrl', {

/* AFTER - Your Formspree ID */
fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

**How to get Formspree ID**:
1. Go to formspree.io
2. Create new form
3. Get form endpoint: `/f/xyz123abc`
4. Use `xyz123abc` as YOUR_FORM_ID

---

### 10. Change Slider Defaults
**File**: `dashboard.html`  
**Search for**: `<input type="range"`

```html
<!-- Bot Slider -->
<input type="range" id="bot-slider" min="40" max="95" value="60">
                                               ↑
                                        Change this (default)

<!-- Tempo Slider -->
<input type="range" id="tempo-slider" min="1" max="3" value="2">
                                                        ↑
                                    1=Schnell, 2=Standard, 3=Phased

<!-- Depth Slider -->
<input type="range" id="depth-slider" min="1" max="3" value="2">
                                                        ↑
                                    1=Oberflächlich, 2=Standard, 3=Tiefintegration
```

---

## Moderate Customizations (Basic coding)

### 11. Change Industry Data
**File**: `index.html`  
**Line**: Search for `const industryData`

```javascript
industryData: {
  buchhaltung: {
    label: "📊 Buchhaltung",
    hourlyRate: 120,        // Change hourly rate
    implCost: 50000,        // Change implementation cost
    painPoints: {
      'Doppeleingaben': {
        weight: 1.2,        // Importance multiplier
        hoursPerWeek: 8,    // Hours spent on this
        impact: 'Critical'  // Visual impact
      },
      // ... more pain points
    },
    solutions: {
      'Doppeleingaben': [
        {
          name: 'RPA für Buchungsprozesse',
          impact: 'Eliminiert Fehler zu 99%',
          effort: '2-3 Wochen',
          cost: 25000
        },
        // ... more solutions
      ]
    }
  }
}
```

**To add new industry**:
```javascript
industryData: {
  // ... existing industries
  
  neue_branche: {
    label: "📌 Neue Branche",
    hourlyRate: 100,
    implCost: 40000,
    painPoints: {
      'Pain Point 1': { weight: 1.0, hoursPerWeek: 5, impact: 'High' },
      'Pain Point 2': { weight: 0.8, hoursPerWeek: 3, impact: 'Medium' }
    },
    solutions: {
      'Pain Point 1': [
        { name: 'Solution 1', impact: 'Beschreibung', effort: 'Dauer', cost: 10000 }
      ]
    }
  }
}
```

---

### 12. Change SVG Chart Colors
**File**: `dashboard.html`  
**Function**: `renderCharts()`

```javascript
function renderCharts(savings, pains) {
  // ROI Chart Gradient
  <linearGradient id="roiGrad">
    <stop offset="0%" style="stop-color:#00FF88" />    <!-- Change this -->
    <stop offset="100%" style="stop-color:#00FFFF" />  <!-- Change this -->
  </linearGradient>
  
  // Breakdown Pie Colors
  const breakdown = [
    { label: 'Backoffice', value: 45, color: '#00FFFF' },   <!-- Change -->
    { label: 'Vertrieb', value: 30, color: '#00FF88' },     <!-- Change -->
    { label: 'Service', value: 25, color: '#FF88FF' }       <!-- Change -->
  ];
}
```

---

### 13. Change Animation Speeds
**File**: Both files - CSS animations

```css
/* Slower animations */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Change duration */
.metric-box:nth-child(1) { animation: slideUp 1.2s ease-out; } /* was 0.6s */
.metric-box:nth-child(2) { animation: slideUp 1.4s ease-out; } /* was 0.7s */
```

---

### 14. Change Responsive Breakpoint
**File**: Both files

```css
/* Current: 768px */
@media (max-width: 768px) {
  .dashboard-grid { grid-template-columns: 1fr; }
  .booking-grid { grid-template-columns: 1fr; }
}

/* Change to 1024px for larger mobile breakpoint */
@media (max-width: 1024px) {
  .dashboard-grid { grid-template-columns: 1fr 1fr; }
}
```

---

### 15. Change Scenario Slider Labels
**File**: `dashboard.html`  
**Search for**: `"Szenarios individualisieren"`

```javascript
// Change slider labels
document.getElementById('tempo-val').textContent = ['Schnell (2W)', 'Standard (6W)', 'Phased (12W)'][tempo - 1];

// Change to:
document.getElementById('tempo-val').textContent = ['Express', 'Normal', 'Extended'][tempo - 1];
```

---

## Advanced Customizations (JavaScript)

### 16. Add Custom ROI Calculation Formula
**File**: `dashboard.html`  
**Function**: `updateScenarios()`

```javascript
function updateScenarios() {
  // Current formula
  const newSavings = Math.round(assessmentData.savings * botFactor * depthFactor);
  
  // Custom formula example
  const newSavings = Math.round(
    assessmentData.savings * botFactor * depthFactor * tempoFactor * 1.15 // +15% bonus
  );
}
```

---

### 17. Add Custom Metric Calculation
**File**: `dashboard.html`  
**Function**: `calculateScore()`

```javascript
// Add new metric calculation
const customMetric = pains.length * 15 + weeklyHours * 2.5;
document.getElementById('metric-custom').textContent = customMetric.toFixed(0);
```

---

### 18. Add Google Analytics
**File**: Both files - add to `<head>`

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your Google Analytics ID.

---

### 19. Add Hotjar Heatmaps
**File**: Both files - add to bottom of `<body>`

```html
<script>
(function(h,o,t,j,a,r){
h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
h._hjSettings={hjid:123456,hjsv:6};
a=o.getElementsByTagName('head')[0];
r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

Replace `123456` with your Hotjar ID.

---

### 20. Add Session Recording (Clarity)
**File**: Both files - add to `<head>`

```html
<script>
(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```

Replace `YOUR_PROJECT_ID` with your Clarity project ID.

---

## File Location Reference

```
c:\Projects\ki_beratung_schweiz-main\
├── index.html (Assessment form)
├── dashboard.html (Results + Booking)
├── css/
│   └── style.css (shared styles)
└── js/
    └── script.js (shared scripts)
```

---

## Testing After Customizations

```bash
# 1. Clear cache
Ctrl+Shift+Delete (open Clear Browsing Data)
Select "All time" and "Cookies and cached images"

# 2. Test locally
Start Live Server or Python HTTP server

# 3. Check console
F12 → Console tab
Should show: No errors, no warnings

# 4. Test all features
- Assessment flow
- Dashboard loading
- Slider updates
- Form submission
- Calendly booking
- Video playback

# 5. Deploy to GitHub Pages
git add .
git commit -m "Customizations"
git push origin main
```

---

## Quick Reference: Search-Replace Patterns

Use VS Code Find & Replace (Ctrl+H) for bulk changes:

| Find | Replace | Purpose |
|------|---------|---------|
| `info@ki-netic.ch` | `your@email.com` | Change email |
| `KI.NETIC` | `YOUR_COMPANY` | Change company name |
| `#00FFFF` | `#YOUR_COLOR` | Change primary color |
| `info-ki-netic` | `your-calendly-id` | Change Calendly |
| `dQw4w9WgXcQ` | `YOUR_VIDEO_ID` | Change video |

---

## Support & Resources

- **Calendly Docs**: https://help.calendly.com/
- **YouTube Embed Docs**: https://www.youtube.com/embed_code
- **Formspree Docs**: https://formspree.io/
- **CSS Reference**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript Reference**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**Last Updated**: January 2025  
**Customization Difficulty**: Easy to Moderate  
**Estimated Time**: 15-60 minutes depending on scope
