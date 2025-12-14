# ⚡ Quick Start Guide - KI.NETIC

**Time to Launch**: 15 minutes  
**Difficulty**: Beginner-friendly  
**No coding required** ✅

---

## Step 1: Prepare (2 minutes)

### Get your essentials ready:
- [ ] Calendly username (calendly.com/your-username)
- [ ] Your email address (for contact form)
- [ ] Formspree account (create free at formspree.io)
- [ ] YouTube video ID (if you have a video)

**Don't have these?**
- 🔗 Calendly: Sign up free at [calendly.com](https://calendly.com)
- 📧 Formspree: Sign up free at [formspree.io](https://formspree.io)
- 🎬 Video: Use placeholder (can update later)

---

## Step 2: Get the Code (3 minutes)

### Option A: Clone from GitHub
```bash
git clone https://github.com/YOUR_USERNAME/ki-beratung-landingpage.git
cd ki-beratung-landingpage
```

### Option B: Download ZIP
1. Visit GitHub repo
2. Click "Code" → "Download ZIP"
3. Extract to folder

---

## Step 3: Make Essential Changes (7 minutes)

### 3.1 Update Calendly URL
**File**: `dashboard.html`

Find this line:
```html
<iframe src="https://calendly.com/info-ki-netic/30min"></iframe>
```

Replace `info-ki-netic` with YOUR Calendly username:
```html
<iframe src="https://calendly.com/YOUR_USERNAME/30min"></iframe>
```

**How to find your Calendly username**:
1. Log in to [calendly.com](https://calendly.com)
2. Go to Settings → Sharing
3. Your sharing link: `calendly.com/YOUR_USERNAME`

### 3.2 Update Email
**Files**: `index.html` AND `dashboard.html`

Find: `info@ki-netic.ch`  
Replace with: `your-email@yourdomain.com`

**Search tips** (Ctrl+H):
- In VS Code: Ctrl+H opens Find & Replace
- Click "Replace All" for both files

### 3.3 Update Formspree ID
**File**: `dashboard.html`

Find: `f/xanyzvrl`  
Replace with: YOUR Formspree form ID

**How to get Formspree ID**:
1. Go to [formspree.io](https://formspree.io)
2. Click "New Form"
3. Select "Collect emails"
4. You'll get: `/f/YOUR_ID_HERE`
5. Copy the ID part

### 3.4 Update Company Name (Optional)
**Files**: Both files

Find: `KI.NETIC`  
Replace with: `YOUR_COMPANY`

---

## Step 4: Test Locally (2 minutes)

### Using VS Code (Easiest)

1. **Open folder** in VS Code
2. **Install extension**: Search for "Five Server"
3. **Right-click** on `index.html`
4. **Select** "Open with Live Server"
5. **Browser opens** automatically

### Alternative: Python
```bash
cd path/to/project
python -m http.server 8000
# Then visit http://localhost:8000
```

### Test the Flow
1. ✅ Click "Unternehmen analysieren"
2. ✅ Select industry
3. ✅ Adjust sliders
4. ✅ Choose pain points
5. ✅ Enter name/email
6. ✅ Click Submit
7. ✅ Should redirect to dashboard
8. ✅ Check metrics display
9. ✅ Test scenario sliders

---

## Step 5: Deploy to GitHub Pages (2 minutes)

### 5.1 Create GitHub Account (if needed)
- Go to [github.com](https://github.com)
- Sign up (free)

### 5.2 Create Repository
1. Click "New repository"
2. Name: `ki-beratung-landingpage`
3. Make it **Public**
4. Click "Create repository"

### 5.3 Upload Files
```bash
cd your-project-folder

git init
git add .
git commit -m "Initial commit: KI.NETIC dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ki-beratung-landingpage.git
git push -u origin main
```

### 5.4 Enable GitHub Pages
1. Go to GitHub repo
2. Click "Settings"
3. Scroll to "Pages"
4. Select "main" branch
5. Click "Save"
6. Wait 1 minute...
7. **Your site is live!** 🎉

**Your URL**: `https://YOUR_USERNAME.github.io/ki-beratung-landingpage/`

---

## Step 6: Customize (Optional - 5 more minutes)

### Change Colors (Brand)
**File**: `dashboard.html`

Find the CSS section and replace:
- `#00FFFF` → your primary color
- `#00FF88` → your secondary color

**Example color combos**:
- Blue: `#2563EB` + `#60A5FA`
- Purple: `#A855F7` + `#EC4899`
- Green: `#10B981` + `#14B8A6`

### Change Video
Find: `dQw4w9WgXcQ`  
Replace with: Your YouTube video ID

**How to find video ID**:
- YouTube URL: `https://youtu.be/{VIDEO_ID}`
- Extract the ID part

### Change Testimonials
Find: `"💬 Was unsere Kunden sagen"`

Replace quotes and names with yours.

---

## 🎯 Verification Checklist

Before launching, verify:

- [ ] Assessment flow works
- [ ] Dashboard shows your email
- [ ] Calendly URL is yours
- [ ] Form goes to your Formspree
- [ ] Mobile looks good
- [ ] Video plays (if added)
- [ ] No console errors (F12)

---

## 🚀 You're Done!

**Your site is now live at**: `https://YOUR_USERNAME.github.io/ki-beratung-landingpage/`

### Next Steps:
1. **Share the URL** - Send to customers
2. **Monitor bookings** - Check Calendly & Formspree
3. **Track leads** - See form submissions
4. **Update data** - Change industry rates/costs as needed
5. **Add analytics** - (Optional) Set up Google Analytics

---

## ⚡ Quick Reference: 3 Essential URLs

| What | URL | Where |
|------|-----|-------|
| Calendly | `https://calendly.com/YOUR_USERNAME/30min` | dashboard.html |
| Formspree | `https://formspree.io/f/YOUR_ID` | dashboard.html |
| Email | `your-email@yourdomain.com` | Both files |

---

## 🆘 Quick Troubleshooting

**Q: Dashboard shows "loading" forever**  
A: Make sure you completed the assessment in index.html first

**Q: Form doesn't send**  
A: Check your Formspree form ID is correct

**Q: Calendly shows blank**  
A: Update your Calendly username in the URL

**Q: Console shows errors (F12)**  
A: Check that you updated URLs correctly (no typos)

**Q: Mobile layout is broken**  
A: Try refreshing (Ctrl+Shift+R) to clear cache

---

## 📚 Need Help?

- **For detailed customization**: See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- **For testing**: See [LOCAL_TESTING_GUIDE.md](LOCAL_TESTING_GUIDE.md)
- **For deployment**: See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **For features**: See [FEATURE_SUMMARY.md](FEATURE_SUMMARY.md)

---

## 🎉 Celebrate!

You've just deployed a professional AI assessment platform! 

**Congrats! 🥳**

---

**Total time**: ~15 minutes  
**Difficulty**: ⭐ (Very Easy)  
**Result**: Professional, production-ready website  
**Cost**: $0 (free GitHub hosting + free integrations)

