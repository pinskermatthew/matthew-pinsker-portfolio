# Project plan

Goal: a portfolio site and repo that make Matthew a strong technical-writer candidate in an AI-forward market. Target: launch by early November 2026, then keep improving through the job search (6–12 months).

Status key: `[x]` done, `[ ]` to do.

## Phase 0: Strategy and decisions

- [x] Choose the stack: Astro ([decision 001](decisions.md#001-use-astro-with-hand-written-css))
- [x] Choose the structure: single page ([decision 002](decisions.md#002-single-page-case-study-pages-later))
- [x] Set the confidentiality policy ([decision 003](decisions.md#003-public-information-only-for-employer-work))
- [x] Register `matthewpinsker.com` ([decision 005](decisions.md#005-domain-registered-with-cloudflare))
- [x] Choose the launch samples: Passport docs and Postman runners docs
- [x] Confirm the headline and positioning

## Phase 1: Repo and AI scaffolding

- [x] Scaffold the Astro project
- [x] Write `CLAUDE.md`
- [x] Write the style guide, decision log, and this plan
- [x] Set up the content model (`profile.yaml`, `samples.yaml`) with schemas
- [x] Create the `add-sample` skill
- [x] Upgrade local Node.js to 22.12 or later, install, and build
- [x] Matthew reviews and resolves `TODO(matthew)` items in `src/content/`

## Phase 2: Design and build

- [x] Agree on the visual direction: color, type, layout ([decision 006](decisions.md#006-editorial-visual-design))
- [x] Define design tokens (CSS custom properties), including dark mode
- [x] Style all sections; responsive from 360px wide
- [x] Add a light/dark toggle, back-to-top button, and new-tab external links ([decision 007](decisions.md#007-minimal-client-side-javascript))
- [x] Condense the experience section ([decision 008](decisions.md#008-condensed-experience-section))
- [x] Self-host fonts instead of loading them from Google Fonts ([decision 009](decisions.md#009-self-hosted-fonts-and-inlined-css))
- [x] Add a favicon and social share (Open Graph) image
- [x] Accessibility pass: WCAG 2.2 AA contrast, Lighthouse accessibility 100
- [x] Manual keyboard check: Tab through the page, including the skip link and theme toggle
- [x] Lighthouse score of 95+ in all categories (mobile: 99/100/100/100; desktop: 100 across the board)
- [x] Add skills: `copy-review`, `update-experience`
- [x] Write the visual design guide (`docs/design.md`), add `npm run contrast` and `npm run screenshots`, and add the `update-design` skill
- [x] Replace the back-to-top arrow with a rocket icon

## Phase 3: SEO and AEO

- [x] `<head>` metadata: description, canonical, Open Graph, Twitter card
- [x] JSON-LD: `Person`, `ProfilePage`, and `CreativeWork` for each sample
- [x] `robots.txt` that allows search and AI crawlers ([decision 010](decisions.md#010-generated-machine-readable-outputs-open-to-ai-crawlers))
- [x] `sitemap.xml`
- [x] Generated `llms.txt` and `llms-full.txt`, plus a Markdown version of the page
- [x] Add `npm run check:metadata`
- [x] Matthew approves the page description
- [x] Add skill: `seo-aeo-audit`

## Phase 4: Launch

- [ ] Choose hosting (favorite: GitHub Pages with a GitHub Actions deploy)
- [ ] CI: build, link check, and HTML validation on every PR
- [ ] Point `matthewpinsker.com` DNS at the host and enforce HTTPS
- [ ] Redirect `pinskermatthew.github.io` to the new domain
- [ ] Set up Google Search Console and Bing Webmaster Tools; submit the sitemap
- [ ] Align off-site profiles so search engines and AI agents connect them to the site (search for "Matthew Pinsker" mostly returns a historian of the same name):
  - [ ] LinkedIn: match the site's headline wording, include "technical writer," and link to matthewpinsker.com
  - [ ] GitHub profile: add "technical writer," a short bio, and the site link
  - [ ] Add any other public profiles or author pages to `links` in `profile.yaml` so structured data lists them
  - [ ] After a few weeks, ask an AI assistant with web search "Who is Matthew Pinsker, the technical writer?" and compare the answer with the site
- [ ] Add privacy-friendly analytics
- [ ] Add a space-themed 404 page ("Lost in space") with a link home
- [ ] Add skill: `pre-publish`
- [x] Rewrite the README for employers, including "How this site was built with AI"
- [ ] Add deployment and CI details to the README once they exist
- [ ] Make the repo public and add a "View source" link to it in the footer

## Phase 5: Expand the portfolio (ongoing)

- [ ] Case studies for flagship samples (generic process, no internal details)
- [ ] Flagship AI docs-ops tool, for example a docs drift detector
- [ ] Agent-readiness audit of a public open-source docs site
- [ ] Open-source docs contributions
- [ ] Style guide as a Vale and Claude review skill, with evals
- [ ] One or two articles on AI-assisted docs workflows

## Phase 6: Job-search upkeep (months 4–12)

- [ ] Monthly content refresh using the project skills
- [ ] Tailor the headline to the roles being targeted
- [ ] Keep LinkedIn consistent with the site
- [ ] Review Search Console queries and adjust
