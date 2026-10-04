# CLAUDE.md

Guidance for Claude (and other AI agents) working in this repository.

## What this project is

The personal portfolio site of Matthew Pinsker, a technical writer, published at <https://matthewpinsker.com>. It has two audiences:

- **The site:** hiring managers, recruiters, and AI agents and answer engines that summarize Matthew's work.
- **The repo:** potential employers may read it as evidence of how Matthew works with AI. Keep the history, docs, and skills clean and intentional.

The project plan and current status are in [docs/PLAN.md](docs/PLAN.md). Key decisions and their reasons are in [docs/decisions.md](docs/decisions.md).

## Commands

Requires Node.js 22.12 or later; `.nvmrc` pins the recommended version (24 LTS).

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server at http://localhost:4321. It runs in the background; stop it with `npx astro dev stop`. |
| `npm run build` | Build the static site to `dist/`. Also validates all content against the schemas. |
| `npm run preview` | Serve the built site locally |
| `npm run contrast` | Check that all text colors meet WCAG AA contrast in both themes |
| `npm run screenshots` | Save full-page screenshots at 360, 768, and 1280px in light and dark mode (needs the dev server and Google Chrome) |
| `npm run check:metadata` | Check the built site's metadata, structured data, robots.txt, sitemap, and llms.txt (run `npm run build` first) |
| `npm run images` | Regenerate the favicon and social share image from `scripts/images/` (needs Google Chrome) |

Run `npm run build` after every change and fix any errors before reporting the task as done.

## How the site is built

[Astro](https://astro.build) static site, single page, hand-written CSS, and minimal client-side JavaScript (theme toggle and back-to-top button only).

| Path | Purpose |
| --- | --- |
| `src/content/profile.yaml` | All facts about Matthew: headline, summary, approach, skills, experience, links |
| `src/content/samples.yaml` | Writing samples shown in "Selected work" |
| `src/content.config.ts` | Schemas that validate the YAML at build time |
| `src/pages/index.astro` | The single page; renders the content files |
| `src/pages/404.astro` | The "Lost in space" page for unknown URLs (excluded from search) |
| `src/pages/*.ts` | Generated files for crawlers and agents: `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, and `index.md` |
| `src/lib/` | Shared content loader (`content.ts`) and the builders for structured data and Markdown outputs |
| `src/layouts/Base.astro` | HTML document shell and `<head>` metadata |
| `src/components/` | Reusable pieces: `ExternalLink`, `ThemeToggle`, `BackToTop` |
| `src/styles/global.css` | Site styles. Colors, fonts, and spacing are tokens (CSS custom properties) at the top of the file. |
| `public/` | Files served as-is. The favicon and `og-image.png` are generated; don't edit them by hand. |
| `scripts/` | Image generation (`generate-images.sh` and its templates in `scripts/images/`), the contrast, metadata, and screenshot checks |
| `docs/` | Project docs: plan, decisions, writing style guide (`style-guide.md`), and visual design guide (`design.md`) |
| `.claude/skills/` | Project skills for routine maintenance |
| `.github/workflows/ci.yml` | CI on every pull request: build, metadata, contrast, and link checks |
| `wrangler.jsonc` | Cloudflare hosting config. Cloudflare Workers Builds deploys `main` and builds a preview URL for other branches. |

**Content lives in YAML, not templates.** To change what the site says, edit the files in `src/content/`. Edit `.astro` files only to change structure or presentation. Never hard-code facts about Matthew in a template.

## Rules

1. **Protect employer confidentiality.** Describe public product features (as stated in public docs) and generic process only. Never describe an employer's internal processes, internal tools, team structure, people, metrics, or unreleased features. If you're unsure whether something is public, leave it out and ask.
2. **Never invent facts.** Don't make up titles, dates, metrics, employers, testimonials, or skills. If something is missing, add a `TODO(matthew):` comment in the YAML and tell Matthew. Before launch, `grep -rn "TODO(matthew)" src` must return nothing.
3. **Follow the style guide.** All site copy follows [docs/style-guide.md](docs/style-guide.md).
4. **Keep it a single page.** Don't add pages or routes without asking. The only other page is the 404 page. `/work/<sample>` case-study pages may come later (see the plan).
5. **Keep it light.** Don't add new client-side JavaScript, UI frameworks, or dependencies without asking. Any script must be progressive enhancement: the page must still read correctly without it.
6. **Keep it accessible.** Use semantic HTML, one `<h1>`, ordered heading levels, descriptive link text, and WCAG 2.2 AA color contrast in both light and dark mode.
7. **Use `ExternalLink` for links to other sites.** It opens them in a new tab, adds the ↗ arrow, and tells screen reader users. Use a plain `<a>` for links within the page.
8. **Keep the share image in sync.** `scripts/images/og-image.html` repeats the name and headline. If either changes in `profile.yaml`, update the template and run `npm run images`.
9. **Follow the design guide.** Visual changes follow [docs/design.md](docs/design.md). Use the CSS custom properties in `global.css` for colors, fonts, and spacing, and run `npm run contrast` after any color change.
10. **Keep machine-readable outputs in sync.** The page head, structured data (JSON-LD), `llms.txt`, `llms-full.txt`, and `index.md` are generated from the content files through `src/lib/content.ts`. Never edit their output by hand, and never put a fact in structured data that the visible page doesn't show. Run `npm run check:metadata` after content changes.
11. **Record decisions.** When a change reflects a meaningful choice (stack, structure, hosting, policy), add an entry to `docs/decisions.md`.
12. **Keep the README and this file in sync with the repo.** When you add, rename, or remove an npm command, skill, generated output, project doc, or top-level folder, update the matching table in both `README.md` and `CLAUDE.md` in the same change. The README is written for employers, in Matthew's voice; keep its claims about how the site was built accurate.

## Project skills

| Skill | Use it to |
| --- | --- |
| `add-sample` | Add a writing sample to `samples.yaml` by interviewing Matthew |
| `copy-review` | Review site copy against the style guide and confidentiality rules |
| `update-experience` | Update experience, skills, or summary after a job change or new skill |
| `update-design` | Change colors, fonts, spacing, layout, or components, and verify the result |
| `seo-aeo-audit` | Check and fix how search engines and AI agents see the site |
| `pre-publish` | Run the final checks before a merge to `main`, which publishes the site |

## Git

- Work on a branch for anything beyond a small content edit, and open a PR.
- Write commit messages in the imperative mood, for example `Add Passport docs sample`.
- Commit only when Matthew asks.
