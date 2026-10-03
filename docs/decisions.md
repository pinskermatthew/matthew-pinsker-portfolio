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
