# Design Specification: Dream Moto B&W Minimalism Redesign

## Goal
Redesign the Dream Moto landing page to feature a modern, high-contrast, premium Black & White (B&W) minimalist aesthetic, improving readability, structural flow, and focus on video showcases.

---

## Brand & Visual Theme: Minimalism (B&W)

### Color Palette
- **Primary Background**: Pure Black (`#000000`)
- **Secondary Background**: Deep Matte Charcoal (`#0D0D0D`)
- **Contrast Card Background**: Off-Black (`#161616`)
- **Primary Text**: Clean White (`#FFFFFF`)
- **Secondary/Muted Text**: Silver Gray (`#A0A0A0`)
- **Accent/Highlights**: Pure White (`#FFFFFF`) or subtle Platinum (`#E5E5E5`)
- **Borders**: Thin dark borders (`rgba(255,255,255,0.1)`)

### Typography
- Sleek, spacious typography utilizing **Be Vietnam Pro** for extreme legibility in Vietnamese.
- Section titles: Large bold uppercase headings with spacious padding and letter spacing to convey luxury.

---

## Layout & Section Order (Sườn Trang)

1. **Navigation Header**
   - Left: New Logo (`logo.jpg`) styled as a sleek circular or hexagonal crop (matching the logo's original shape).
   - Center: Desktop Nav (Services, Bikers, Feedbacks, FAQ, Contact).
   - Right: Minimalist Zalo CTA button (White background, black text, no neon glows).
2. **Hero Section**
   - High-contrast, clean layout. Left column highlights main value proposition with big bold headers and clean numbers (Stats). Right column showcases a 9:16 vertical mockup.
3. **5 Services Showcase (with video previews)**
   - Displays services configured in `data-config.js`. Features standard layouts showing the title, description, features list, and a modern B&W 9:16 video/image container.
4. **Biker Team (Đội ngũ Bikers)**
   - Clean profile cards with circular avatar crops and B&W theme, focusing on their 9:16 showcase files.
5. **Real Customer Feedbacks (Feedback khách thật)**
   - [NEW SECTION] Displays real reviews in a spacious grid format, using clean, high-contrast card blocks.
6. **Short FAQ (FAQ ngắn)**
   - A minimalist accordion section answering standard questions with clean dividers.
7. **Final CTA & Map**
   - Google Map embed (styled in B&W/dark mode using CSS filters) alongside location information and a large booking button.
8. **Contact & Footer**
   - Clean 3-column contact directory and social media links.

---

## Verification Plan

1. Verify layout flows beautifully on both desktop and mobile screens.
2. Confirm the B&W theme is applied universally, replacing previous neon pink/blue colors.
3. Ensure the newly added logo is displayed correctly.
4. Check that all interactive items (calculators, video modals, booking deep links) continue to work properly.
