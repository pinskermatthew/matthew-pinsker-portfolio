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

Run `npm run build` after every change and fix any errors before reporting the task as done.

## How the site is built

[Astro](https://astro.build) static site, single page, hand-written CSS, no client-side JavaScript.

| Path | Purpose |
| --- | --- |
| `src/content/profile.yaml` | All facts about Matthew: headline, summary, approach, skills, experience, links |
| `src/content/samples.yaml` | Writing samples shown in "Selected work" |
| `src/content.config.ts` | Schemas that validate the YAML at build time |
| `src/pages/index.astro` | The single page; renders the content files |
| `src/layouts/Base.astro` | HTML document shell and `<head>` metadata |
| `src/styles/global.css` | Site styles |
| `public/` | Files served as-is (favicon, robots.txt, and so on) |
| `docs/` | Project docs: plan, decisions, style guide |
| `.claude/skills/` | Project skills for routine maintenance |

**Content lives in YAML, not templates.** To change what the site says, edit the files in `src/content/`. Edit `.astro` files only to change structure or presentation. Never hard-code facts about Matthew in a template.

## Rules

1. **Protect employer confidentiality.** Describe public product features (as stated in public docs) and generic process only. Never describe an employer's internal processes, internal tools, team structure, people, metrics, or unreleased features. If you're unsure whether something is public, leave it out and ask.
2. **Never invent facts.** Don't make up titles, dates, metrics, employers, testimonials, or skills. If something is missing, add a `TODO(matthew):` comment in the YAML and tell Matthew. Before launch, `grep -rn "TODO(matthew)" src` must return nothing.
3. **Follow the style guide.** All site copy follows [docs/style-guide.md](docs/style-guide.md).
4. **Keep it a single page.** Don't add pages or routes without asking. `/work/<sample>` case-study pages may come later (see the plan).
5. **Keep it light.** Don't add client-side JavaScript, UI frameworks, or new dependencies without asking.
6. **Keep it accessible.** Use semantic HTML, one `<h1>`, ordered heading levels, descriptive link text, and WCAG 2.2 AA color contrast.
7. **Keep machine-readable outputs in sync.** From Phase 3, `llms.txt`, structured data (JSON-LD), and the sitemap are generated from the content files. Never edit their output by hand.
8. **Record decisions.** When a change reflects a meaningful choice (stack, structure, hosting, policy), add an entry to `docs/decisions.md`.

## Project skills

| Skill | Use it to |
| --- | --- |
| `add-sample` | Add a writing sample to `samples.yaml` by interviewing Matthew |

## Git

- Work on a branch for anything beyond a small content edit, and open a PR.
- Write commit messages in the imperative mood, for example `Add Passport docs sample`.
- Commit only when Matthew asks.
