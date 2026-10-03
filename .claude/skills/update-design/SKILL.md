---
name: update-design
description: Change the portfolio's visual design (colors, fonts, sizes, spacing, layout, or components) and verify the result. Use when Matthew asks to change how the site looks, restyle a section, or fix a visual or responsive issue.
---

# Update the design

Makes a visual change within the design system in `docs/design.md`, then verifies contrast, responsiveness, both themes, and performance.

## 1. Understand the change

1. Read `docs/design.md` in full.
2. Restate the change in terms of the system: which tokens, components, or breakpoints it touches.
3. If the request conflicts with a rule in `docs/design.md` (for example, a new color with no token, or italic text), say so and ask Matthew before you go further.

## 2. Make the change

- Change tokens in the `:root` blocks at the top of `src/styles/global.css` rather than hard-coding values in individual rules.
- A color change goes in all three color blocks: light, and both dark-mode blocks.
- Change markup in `src/pages/index.astro` or `src/components/` only when the structure has to change.
- Don't add client-side JavaScript or dependencies without asking (CLAUDE.md rule 5).

## 3. Verify

Run each check and fix any problems before you report back.

1. **Build:** `npm run build`.
2. **Contrast:** `npm run contrast`. Every pair must pass in both themes.
3. **Screenshots:** with the dev server running (`npm run dev`), run `npm run screenshots`. It saves full-page screenshots at 360, 768, and 1280px wide, in light and dark mode. Review every image for:
   - Text running off the screen or a horizontal scrollbar
   - Elements that overlap, including the back-to-top button
   - Alignment that shifts between similar items
   - Hierarchy: the name, then section headings, then body text
4. **Lighthouse:** for changes to fonts, layout, or anything loaded on the page, run Lighthouse against the production build (`npm run build`, then `npx astro preview`) on mobile and desktop. Every category must stay at 95 or higher.
5. **Generated assets:** if the accent color, display font, name, or headline changed, update `scripts/images/` and run `npm run images`, then look at `public/og-image.png` and `public/icon-512.png`.

## 4. Document and report

1. Update `docs/design.md` to match: token values, the contrast table (use the numbers `npm run contrast` prints), components, or breakpoints.
2. If the change alters the design direction (a new font, a new accent color, a new layout pattern), add an entry to `docs/decisions.md`.
3. Tell Matthew what changed and what you checked, and suggest Matthew review it at http://localhost:4321 in both themes.
