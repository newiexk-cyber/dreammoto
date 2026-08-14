# Implementation Plan: Dream Moto B&W Minimalism Redesign

## Goal
Redesign the front-end layout, stylesheet, and data-driven rendering of the landing page to achieve a premium, high-contrast Black & White minimalism look with the specified page sections.

---

## Proposed Changes

### 1. Test Verification Setup (TDD)
- **Failing Test**: Add a test in `tests/test_dream_moto_logic.py` that checks for:
  - The presence of the B&W color variables in `style.css` (e.g. `--bg-dark: #000000;`, `--accent: #ffffff;`).
  - The existence of the `feedback` section in `index.html`.
- Run the test and ensure it fails.

### 2. Stylesheet Redesign (`style.css`)
- Replace the colorful, glow-based neon variables with solid B&W minimalism variables.
- Remove all glowing neon classes (`.gold-text`, `.cyan-text`, `.magenta-text`, `.btn-glow`, etc.) and replace them with high-contrast, bold, uppercase typography styles.
- Adjust font sizes to be larger and more spacious. Add `letter-spacing: 0.1em;` or more to headings to give it a fashion-brand feel.
- Ensure all buttons have clean outline or solid fill shapes (e.g. black background with white text, or thin white border).
- Style the Biker and Service media containers to use a clean `aspect-ratio: 9/16;` with a solid thin border and no neon drop shadows.

### 3. Layout Redesign (`index.html`)
- Update Header: Replace motorcycle icon logo with an image tag pointing to `logo.jpg` (styled appropriately, e.g., max-height: 40px, circular or hexagonal container).
- Rearrange sections in the correct order:
  - Hero section
  - 5 Services Showcase (dynamically rendered via JS, with 9:16 video/image previews)
  - Biker Team profiles (dynamically rendered, showing vertical crops)
  - Customer Feedbacks (new grid layout showcasing actual testimonials)
  - FAQ (streamlined text block with simple accordion questions)
  - Google Map/CTA (B&W styled embedded map + booking deep link)
  - Footer (contact info, address, and copyright)

### 4. Logic Updates (`app.js`)
- Ensure the JavaScript correctly populates all elements without styling conflicts.
- Add support for rendering the feedback section dynamically (or static layout in HTML).
- Ensure booking deep link generator works flawlessly with the new form elements.

---

## Step-by-Step Implementation

1. **Step 1: Write and run the failing test**
   - Add test case verifying CSS color tokens and HTML layout tags.
   - Run: `python -m unittest tests/test_dream_moto_logic.py`
2. **Step 2: Update `style.css` variables and base styles**
   - Confirm colors are black & white.
3. **Step 3: Modify layout in `index.html`**
   - Rearrange sections, insert logo image, add customer feedback HTML block.
4. **Step 4: Refactor styling in `style.css` to match minimalism**
   - Style layout components, cards, headers, buttons.
5. **Step 5: Run tests and verify they pass (Green status)**
6. **Step 6: Manual check & review layout on screen**
