---
name: seo-aeo-audit
description: Audit the portfolio for search engine (SEO) and AI answer engine (AEO) readiness, and fix what's out of sync. Use when Matthew asks about SEO, AEO, llms.txt, structured data, robots.txt, or how search engines and AI agents see the site, or after any content change before a release.
---

# SEO and AEO audit

Checks that search engines and AI agents get accurate, consistent facts about Matthew from every machine-readable output, and fixes problems at the source.

## How the outputs are built

Every output is generated from the content files at build time (CLAUDE.md rule 10). Never edit the output; fix the source.

| Output | Built by | Source |
| --- | --- | --- |
| Title, description, share tags | `src/layouts/Base.astro` | `profile.yaml` (`name`, `description`, current role) |
| Structured data (JSON-LD) | `src/lib/structured-data.ts` | `profile.yaml`, `samples.yaml` |
| `/llms.txt` | `src/lib/markdown.ts` (`buildLlmsTxt`) | `profile.yaml`, `samples.yaml` |
| `/index.md`, `/llms-full.txt` | `src/lib/markdown.ts` (`buildFullMarkdown`) | `profile.yaml`, `samples.yaml` |
| `/robots.txt` | `src/pages/robots.txt.ts` | AI crawler list in the file (decision 010) |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | `PAGES` list in the file |
| Share image | `scripts/images/og-image.html` | Name and headline, copied by hand; run `npm run images` |

## 1. Run the automated checks

```sh
npm run build
npm run check:metadata
```

Fix every failure before going further. A `TODO(matthew)` failure means Matthew still needs to confirm some content; list those items for Matthew rather than resolving them yourself.

## 2. Review the outputs by reading them

The script checks structure, not quality. Read these yourself:

1. **`dist/llms.txt` and `dist/index.md`:** Would an AI agent summarizing Matthew get Matthew's current role, strongest samples, and approach to AI right? Is anything confusing out of context?
2. **The meta description** (`description` in `profile.yaml`): About 140–160 characters is ideal. It should name Matthew, the current role, and what sets Matthew apart, in third person.
3. **Structured data** (`<script type="application/ld+json">` in `dist/index.html`): every fact must also appear on the visible page. Never add facts to structured data that the page doesn't show.
4. **Confidentiality:** the outputs repeat the page content, so CLAUDE.md rule 1 applies to them too.

## 3. Check new pages and crawlers

- **New page or route:** add it to `PAGES` in `src/pages/sitemap.xml.ts`, and link it from `llms.txt` if it has content agents should read.
- **AI crawlers:** if a major AI company has launched a new crawler, add its user agent to `AI_CRAWLERS` in `src/pages/robots.txt.ts`. Confirm the name from the company's own docs.

## 4. After launch only

Once the site is live at https://matthewpinsker.com, also suggest that Matthew:

- Test the page in Google's Rich Results Test and the Schema.org validator.
- Check Google Search Console and Bing Webmaster Tools for crawl errors and the sitemap status.
- Ask an AI assistant with web search, "Who is Matthew Pinsker?", and compare the answer with the site.

## 5. Report

Summarize what passed, what you fixed (and in which source file), and anything Matthew needs to decide. Run `npm run build` and `npm run check:metadata` again after any fix.
