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
| `src/layouts/Base.astro` | HTML document shell and `<head>` metadata |
| `src/components/` | Reusable pieces: `ExternalLink`, `ThemeToggle`, `BackToTop` |
| `src/styles/global.css` | Site styles. Colors, fonts, and spacing are tokens (CSS custom properties) at the top of the file. |
| `public/` | Files served as-is. The favicon and `og-image.png` are generated; don't edit them by hand. |
| `scripts/` | `generate-images.sh` and the HTML templates it renders in `scripts/images/` |
| `docs/` | Project docs: plan, decisions, style guide |
| `.claude/skills/` | Project skills for routine maintenance |

**Content lives in YAML, not templates.** To change what the site says, edit the files in `src/content/`. Edit `.astro` files only to change structure or presentation. Never hard-code facts about Matthew in a template.

## Rules

1. **Protect employer confidentiality.** Describe public product features (as stated in public docs) and generic process only. Never describe an employer's internal processes, internal tools, team structure, people, metrics, or unreleased features. If you're unsure whether something is public, leave it out and ask.
2. **Never invent facts.** Don't make up titles, dates, metrics, employers, testimonials, or skills. If something is missing, add a `TODO(matthew):` comment in the YAML and tell Matthew. Before launch, `grep -rn "TODO(matthew)" src` must return nothing.
3. **Follow the style guide.** All site copy follows [docs/style-guide.md](docs/style-guide.md).
4. **Keep it a single page.** Don't add pages or routes without asking. `/work/<sample>` case-study pages may come later (see the plan).
5. **Keep it light.** Don't add new client-side JavaScript, UI frameworks, or dependencies without asking. Any script must be progressive enhancement: the page must still read correctly without it.
6. **Keep it accessible.** Use semantic HTML, one `<h1>`, ordered heading levels, descriptive link text, and WCAG 2.2 AA color contrast in both light and dark mode.
7. **Use `ExternalLink` for links to other sites.** It opens them in a new tab and tells screen reader users. Use a plain `<a>` for links within the page.
8. **Keep the share image in sync.** `scripts/images/og-image.html` repeats the name and headline. If either changes in `profile.yaml`, update the template and run `npm run images`.
9. **Style with tokens.** Use the CSS custom properties in `global.css` for colors, fonts, and spacing. When you change a dark-mode color, update both dark-mode blocks.
10. **Keep machine-readable outputs in sync.** From Phase 3, `llms.txt`, structured data (JSON-LD), and the sitemap are generated from the content files. Never edit their output by hand.
11. **Record decisions.** When a change reflects a meaningful choice (stack, structure, hosting, policy), add an entry to `docs/decisions.md`.

## Project skills

| Skill | Use it to |
| --- | --- |
| `add-sample` | Add a writing sample to `samples.yaml` by interviewing Matthew |
| `copy-review` | Review site copy against the style guide and confidentiality rules |
| `update-experience` | Update experience, skills, or summary after a job change or new skill |

## Git

- Work on a branch for anything beyond a small content edit, and open a PR.
- Write commit messages in the imperative mood, for example `Add Passport docs sample`.
- Commit only when Matthew asks.
