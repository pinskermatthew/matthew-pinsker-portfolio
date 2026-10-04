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

## 010: Generated machine-readable outputs, open to AI crawlers

**Date:** 2026-10-04

**Decision:** Generate the page metadata, structured data, `llms.txt`, `llms-full.txt`, and a Markdown version of the page from the same content files as the page, through one shared loader. Allow every crawler in `robots.txt`, and list the major AI crawlers by name.

**Why:** The site's goal is to be found and accurately summarized, by people and by AI agents. Generating every output from one source means a content change updates all of them, so search engines and agents never see stale or conflicting facts. Blocking AI crawlers would work against the site's purpose; naming them makes the choice explicit. `npm run check:metadata` verifies the outputs agree.

## 011: No resume PDF

**Date:** 2026-10-04

**Decision:** Don't publish a resume PDF. The experience section and LinkedIn cover the work history.

**Why:** The experience section already shows the companies, titles, and dates, and LinkedIn has the detail. Recruiters who want a resume will ask, and Matthew can send one tailored to the role. A public PDF would be one more document to keep in sync, and one more place for personal contact details on the public web.

## 012: Host on Cloudflare

**Date:** 2026-10-04

**Decision:** Host the site on Cloudflare Workers as static assets, at `matthewpinsker.com`. Cloudflare Workers Builds deploys every merge to `main` and builds a preview URL for every other branch. GitHub Actions runs the checks on every pull request. The repo goes public before launch.

**Why:** The domain and its DNS are already at Cloudflare, so connecting the domain takes a few clicks. Preview URLs let Matthew review each pull request on a real URL before merging, which GitHub Pages can't do: its default github.io address breaks the site's root-relative paths. Hosting is free for a static site, with unlimited bandwidth, and Cloudflare Web Analytics is available without adding code to the repo. GitHub Pages was considered, to keep code and hosting in one place; it's a good fallback, and moving between them only means changing the deploy setup and DNS.

## 013: Cloudflare Web Analytics with automatic setup

**Date:** 2026-10-04

**Decision:** Use Cloudflare Web Analytics, turned on in the Cloudflare dashboard with automatic setup. Cloudflare adds its script to pages as it serves them; nothing is added to the repo.

**Why:** During a job search, it's useful to know whether people open the site and where they come from, such as LinkedIn or search. Cloudflare Web Analytics is free, uses no cookies (so no cookie banner), and doesn't build visitor profiles or track people across sites. Automatic setup keeps the site's own code at two small scripts (decision 007) and can be turned off with one click. Counts will run low, because ad blockers often block the script; treat them as a rough signal.
