# Implementation Plan: Dream Moto Night Ride Website

**Goal:** Build a complete, stunning, high-converting TikTok-style landing page for "Dream Moto Night Ride" (Motorbike video shooting & passenger night ride at Ba Son Bridge).

---

## Plan Steps

### Step 1: Initialize Project Directory & Create Unit Tests
- Create folder `DreamMotoNight`
- Create `tests/calculator.test.js` to test price calculation logic and Zalo auto-fill link generator.

### Step 2: Implement HTML Base Structure (`index.html`)
- Mobile-first, responsive, semantic HTML5 structure.
- Sections:
  1. Header / Navbar with Logo & Zalo CTA
  2. Hero Section (Fullscreen video loop, live slot badge, primary CTA)
  3. TikTok 9:16 Video Showcase (5 Trends with vertical video cards & category selectors)
  4. Spot Map Cầu Ba Sơn (Interactive photo spots: Đỉnh cầu Ba Sơn, Bến Bạch Đằng view, Đô thị mới Thủ Thiêm)
  5. Interactive Price Calculator & Bike Selector (Z1000, S1000RR, Ducati Panigale, Harley Davidson, Vespa Sprint...)
  6. Night Slot Picker (Gold night hours selection: 19:30, 20:30, 21:30, 22:30, 23:30)
  7. Client Reviews / Social Proof (TikTok Feed Style with views & likes)
  8. 3-Step Simple Process & FAQ Accordion
  9. Floating Zalo / Phone Action Bar for Mobile Inbox Conversion

### Step 3: Implement CSS Design System (`style.css`)
- Dark Obsidian background (`#0B0E14`, `#121824`)
- Cyberpunk Neon Accents: Neon Gold (`#FFD700`), Cyan (`#00F3FF`), Electric Crimson (`#FF0055`)
- Glassmorphism containers, smooth glow effects, custom scrollbars, animations.
- Responsive breakpoints for mobile, tablet, and desktop.

### Step 4: Implement Dynamic JavaScript (`app.js`)
- Price calculation engine function `calculateBookingPrice(bike, service, addon)`.
- Zalo link generator `generateZaloLink(bike, service, slot, price)`.
- Trend video switcher / modal player.
- Interactive Slot selection logic.
- Accordion toggle for FAQs.

### Step 5: Automated & Manual Verification
- Run tests with Node test runner or Playwright to confirm 100% test pass.
- Verify visually with local dev server / browser preview.
