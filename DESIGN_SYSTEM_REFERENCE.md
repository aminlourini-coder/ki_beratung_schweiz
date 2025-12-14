# 🎨 iOS Redesign - Visual Design Reference Guide

## Design System at a Glance

### Color Palette

#### Primary Colors
```
iOS Blue (Primary)       #007AFF  RGB: 0, 122, 255
Light Blue              #5AC8FA  RGB: 90, 200, 250
Dark Blue               #0051D5  RGB: 0, 81, 213
```

#### Semantic Colors
```
Success (Green)         #34C759  RGB: 52, 199, 89
Warning (Orange)        #FF9500  RGB: 255, 149, 0
Error (Red)             #FF3B30  RGB: 255, 59, 48
```

#### Gray Scale
```
Gray 1 (Lightest)       #F2F2F7  (Light backgrounds)
Gray 2                  #E5E5EA  (Secondary backgrounds)
Gray 3                  #D1D1D6  (Borders)
Gray 4                  #C7C7CC  (Dividers)
Gray 5                  #AEAEB2  (Subtle text)
Gray 6                  #8E8E93  (Secondary text)
```

#### Text Colors
```
Primary Text            #1C1C1E  (Main content)
Secondary Text          #3A3A3C  (Supporting text)
Tertiary Text           #48484A  (Muted text)
```

---

## Typography System

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
```

### Type Scale

#### Headers
```
H1:  56px  weight-700  line-height-1.07143  letter-spacing:-0.02em
H2:  48px  weight-700  line-height-1.08     letter-spacing:-0.02em
H3:  32px  weight-700  line-height-1.125    letter-spacing:-0.02em
H4:  24px  weight-600  line-height-1.17     letter-spacing:-0.015em
```

#### Body
```
Large:     21px  weight-400  line-height-1.381   letter-spacing:-0.005em
Regular:   15px  weight-400  line-height-1.47059 letter-spacing:-0.022em
Small:     13px  weight-500  line-height-1.38462 letter-spacing:0em
```

#### Special
```
Subheading: 17px  weight-600  line-height-1.235  letter-spacing:-0.01em
Meta:       14px  weight-500  line-height-1.43   letter-spacing:0em
```

---

## Spacing System

### 8px Grid
All spacing is based on multiples of 8px:

```
xs:  8px   (8 × 1)
sm:  16px  (8 × 2)
md:  24px  (8 × 3)
lg:  32px  (8 × 4)
xl:  40px  (8 × 5)
2xl: 48px  (8 × 6)
3xl: 64px  (8 × 8)
```

### Component Spacing
```
Container padding:    24px (desktop), 16px (mobile)
Section gap:          24px-32px
Card padding:         16px-24px
Input padding:        12px (vertical) × 16px (horizontal)
Button padding:       14px (vertical) × 20px (horizontal)
Button min-height:    48px (touch target)
Touch target size:    44px minimum (iOS standard)
```

---

## Shadow System

### Elevation Levels

#### Shadow Small (Cards, Subtle)
```css
box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
```
Use for: Subtle depth, secondary cards

#### Shadow Medium (Default)
```css
box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05);
```
Use for: Form inputs, small components

#### Shadow Large (Cards, Modals)
```css
box-shadow: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
```
Use for: Cards on hover, dropdowns

#### Shadow XL (Heavy Elevation)
```css
box-shadow: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04);
```
Use for: Modals, full-screen overlays

---

## Border Radius System

```
Small:  8px      (Form inputs, tags)
Medium: 12px     (Buttons, cards)
Large:  16px     (Large panels)
XL:     20px     (Major components)
Full:   9999px   (Pills, circles)
```

---

## Component Styling Guide

### Buttons

#### Primary Button
```css
Background:     #007AFF
Text Color:     #FFFFFF
Padding:        14px 20px (min-height 48px)
Border Radius:  12px
Font Weight:    600
Font Size:      15px
Transition:     0.2s ease-out
Hover Effect:   0 8px 24px rgba(0,122,255,0.3)
Active Effect:  scale(0.95)
```

#### Secondary Button
```css
Background:     #E5E5EA (Gray 2)
Text Color:     #1C1C1E
Padding:        14px 20px
Border Radius:  12px
Hover:          Background #D1D1D6
```

### Input Fields

#### Text Input
```css
Background:     #F2F2F7 (Gray 1)
Border:         1px solid #D1D1D6 (Gray 3)
Padding:        12px 16px
Border Radius:  12px
Font Size:      16px
Focus Border:   #007AFF (primary)
Focus Shadow:   0 0 0 3px rgba(0,122,255,0.1)
Transition:     0.2s ease-out
```

### Cards

#### Light Card (Frosted)
```css
Background:     rgba(255,255,255,0.7) with backdrop-filter
Backdrop Filter: saturate(180%) blur(20px)
Border:         1px solid rgba(0,0,0,0.04)
Border Radius:  20px
Padding:        24px-32px
Shadow:         --shadow-sm
Hover Shadow:   --shadow-lg
Transition:     0.3s ease-out
```

### Forms

#### Form Wrapper
```css
Background:     rgba(255,255,255,0.7) with backdrop-filter
Border:         1px solid rgba(0,0,0,0.04)
Border Radius:  20px
Padding:        48px (desktop), 32px (mobile)
Max Width:      650px
Box Shadow:     --shadow-lg
```

#### Form Label
```css
Font Size:      15px
Font Weight:    600
Color:          #1C1C1E (text-primary)
Margin Bottom:  8px
Letter Spacing: -0.01em
```

---

## Animation System

### Easing Functions

#### Spring Curve
```css
cubic-bezier(0.175, 0.885, 0.32, 1.275)
```
Used for: Interactive elements, bouncy animations

#### Ease Out
```css
cubic-bezier(0.16, 1, 0.3, 1)
```
Used for: Exit animations, transitions

### Animation Timings
```
Quick:      0.15s  (hover states, micro-interactions)
Normal:     0.2s   (transitions, focus changes)
Standard:   0.3s   (element transforms)
Slow:       0.5s   (page enter animations)
Extended:   1s+    (complex sequences)
```

### Keyframe Animations

#### Slide Up
```css
@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(24px) scale(0.98); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}
Duration: 0.5s ease-out
```

#### Pulse
```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(0.97); }
}
Duration: 2s infinite
```

#### Float
```css
@keyframes float {
  0%, 100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(20px,-20px) scale(1.05); }
  66% { transform: translate(-20px,15px) scale(0.98); }
}
Duration: 30s linear infinite
```

---

## Responsive Design Breakpoints

### Mobile First
```css
Base:     up to 640px   (mobile phones)
Tablet:   640px-1024px  (tablets, landscape phones)
Desktop:  1024px+       (desktops, large screens)
```

### Key Responsive Changes
```
Mobile:
  - Single column layouts
  - H1: 40px (from 56px)
  - Padding: 16px (from 24px)
  - Button height: 44px (touch target)
  - Form padding: 32px (from 48px)

Desktop:
  - Multi-column layouts
  - Full typography sizing
  - Padding: 24px-32px
  - Hover effects enabled
```

---

## Accessibility Standards

### Touch Targets
```
Minimum Size:  44px × 44px (iOS standard)
Button Height: 48px minimum
Spacing:       8px minimum between targets
Padding:       Generous internal spacing
```

### Color Contrast
```
WCAG AA Compliance:
  - Text: 4.5:1 contrast ratio
  - Large text: 3:1 contrast ratio
  - UI Components: 3:1 contrast ratio
```

### Focus States
```
All interactive elements must have visible focus state:
- Outline or background change
- 2-3px visible border/shadow
- Color: primary blue (#007AFF)
- Keyboard accessible
```

---

## CSS Variables Reference

### Colors
```css
--primary: #007AFF;
--primary-light: #5AC8FA;
--primary-dark: #0051D5;
--success: #34C759;
--warning: #FF9500;
--error: #FF3B30;

--gray-1: #F2F2F7;
--gray-2: #E5E5EA;
--gray-3: #D1D1D6;
--gray-5: #AEAEB2;
--gray-6: #8E8E93;

--text-primary: #1C1C1E;
--text-secondary: #3A3A3C;
--text-tertiary: #48484A;

--bg-primary: #FFFFFF;
--bg-secondary: #F2F2F7;
```

### Shadows
```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04);
```

### Spacing & Sizing
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

### Animation
```css
--spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

---

## Usage Examples

### Button with Hover State
```css
.btn-primary {
  background: var(--primary);
  color: #fff;
  padding: 14px 20px;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  min-height: 48px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,122,255,0.3);
}

.btn-primary:active {
  transform: scale(0.95);
}
```

### Card with Frosted Glass
```css
.card {
  background: rgba(255,255,255,0.7);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s var(--ease-out);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
```

### Form Input with Focus
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--gray-3);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 16px;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0,122,255,0.1);
}
```

---

## Browser Support

✅ Chrome 90+
✅ Safari 14+
✅ Firefox 88+
✅ Edge 90+
✅ Mobile Safari (iOS 14+)
✅ Chrome Mobile (Android 9+)

### CSS Features Used
- ✅ CSS Grid
- ✅ Flexbox
- ✅ CSS Variables
- ✅ Backdrop Filter
- ✅ CSS Transitions
- ✅ CSS Animations

---

## Performance Optimization Tips

1. **Use CSS Variables** - For easy maintenance and reduced file size
2. **Limit Blur Effects** - Use backdrop-filter sparingly on mobile
3. **Hardware Acceleration** - Use `transform` instead of `top/left`
4. **Reduce Motion** - Support `prefers-reduced-motion` media query
5. **Optimize Images** - Use WebP with fallbacks
6. **Minimize Shadows** - Complex shadows impact performance

---

## Testing Checklist

- [ ] Test on iOS Safari (iPhone, iPad)
- [ ] Test on Android Chrome
- [ ] Test keyboard navigation
- [ ] Test color contrast ratios
- [ ] Test touch target sizes (44px)
- [ ] Test animations at 60fps
- [ ] Test light mode only (no dark mode needed for MVP)
- [ ] Test form submissions
- [ ] Test modal interactions
- [ ] Test responsive breakpoints

---

**Design System Version:** 1.0
**Last Updated:** 2024
**Apple iOS Standard:** HIG 2024
