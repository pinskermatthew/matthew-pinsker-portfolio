# Decisions

A log of meaningful project decisions and the reasons for them. Newest last.

## 001: Use Astro with hand-written CSS

**Date:** 2026-10-03

**Decision:** Build the site with Astro. Use hand-written CSS, no UI framework, and no client-side JavaScript.

**Why:** The site's facts must appear in several places: the page, `llms.txt`, structured data, and the sitemap. Astro generates all of them from one set of content files, so they can't drift apart. A hand-built site would need a custom build script to do the same thing. Mintlify was ruled out because it produces docs-style sites with limited design control. Gatsby was ruled out because development has largely stalled.

## 002: Single page, case-study pages later

**Date:** 2026-10-03

**Decision:** Launch as a single page. Leave room to add `/work/<sample>` pages later.

**Why:** Each sample links to a live public doc, which is the page search and answer engines will cite. Separate pages for short sample entries would be thin content. If Matthew writes case studies later, they get their own pages.

## 003: Public information only for employer work

**Date:** 2026-10-03

**Decision:** Sample entries describe public product features and Matthew's role in generic terms. They never describe employer-internal processes, tools, people, or metrics.

**Why:** The samples come from Matthew's current employer. Protecting confidential information matters more than a more detailed portfolio, and deeper process detail can be shared in interviews.

## 004: Content in validated YAML

**Date:** 2026-10-03

**Decision:** Keep all site content in `src/content/*.yaml`, validated by schemas in `src/content.config.ts`.

**Why:** Matthew and AI agents can update the site by editing one readable file, without touching templates. Schema validation catches mistakes, such as a missing field or a bad URL, at build time.

## 005: Domain registered with Cloudflare

**Date:** 2026-10-03

**Decision:** `matthewpinsker.com` is registered with Cloudflare Registrar, with DNS on Cloudflare.

**Why:** Cloudflare sells domains at cost and includes WHOIS privacy for free. Hosting is decided in Phase 4. GitHub Pages is the current favorite.

## 006: Editorial visual design

**Date:** 2026-10-03

**Decision:** Use an editorial design: Source Serif 4 for headings, Inter for body text, IBM Plex Mono for small metadata, a warm off-white background, and a rust accent. Dark mode follows the system setting, and visitors can override it.

**Why:** For a writer, typography signals craft right away, and most technical writing portfolios use a docs-tool or startup look. The monospace details hint at docs as code without making the site feel like a terminal. Two other directions (docs as code, bold minimal) were considered. Fraunces was tried first for headings but replaced with Source Serif 4, whose letterforms (especially the "f") are plainer and more technical.

## 007: Minimal client-side JavaScript

**Date:** 2026-10-03

**Decision:** Allow two small scripts: a light/dark theme toggle and a back-to-top button. External links open in a new tab.

**Why:** Matthew asked for these features. Both scripts are progressive enhancement: without JavaScript, the page still renders fully, follows the system theme, and hides the two buttons.

## 008: Condensed experience section

**Date:** 2026-10-03

**Decision:** Show one entry per company with the company, title, years, and promotions. Leave out responsibilities and locations, and point to LinkedIn for the full history.

**Why:** The full resume-style list repeated LinkedIn and pulled attention from the samples and the AI approach, which are what make this a portfolio. Companies, titles, and dates carry the facts recruiters and AI agents need, and structured data in Phase 3 will repeat them in machine-readable form.

## 009: Self-hosted fonts and inlined CSS

**Date:** 2026-10-03

**Decision:** Serve fonts from the site itself with Fontsource packages instead of Google Fonts. Inline the stylesheet into the page and preload the heading font.

**Why:** Self-hosting is faster and doesn't send visitors' data to Google. The optically sized Source Serif 4 file is larger (about 120 KB) than the plain version (about 50 KB), but the plain version made the large headings look wide and heavy. Inlining the small stylesheet and preloading the heading font raised the mobile Lighthouse performance score from 97 to 99.
