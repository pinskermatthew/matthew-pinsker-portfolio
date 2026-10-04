# matthew-pinsker-portfolio

Source for [matthewpinsker.com](https://matthewpinsker.com), the portfolio of Matthew Pinsker, a senior technical writer who builds AI-powered documentation workflows.

The repo is part of the portfolio. It shows how I plan, write, and maintain a docs-as-code project with an AI collaborator: the rules the AI follows, the skills it runs, the checks that keep the site accurate, and the decisions behind each choice.

## How this site was built with AI

I built this site with [Claude Code](https://claude.com/claude-code). I set the direction, approved every piece of content, and made every design and policy decision. Claude Code drafted content and docs for my review, implemented the changes, and ran the checks.

What makes that collaboration reliable:

- **[CLAUDE.md](CLAUDE.md)** gives any AI agent the project's rules: protect employer confidentiality, never invent facts, keep content out of templates, and keep every machine-readable output in sync.
- **Project skills** in [.claude/skills/](.claude/skills/) turn routine work into repeatable steps, each ending in a check and a confirmation from me.
- **Automated checks** catch what review can miss: schema validation of all content, WCAG contrast in both themes, and consistency across the page, structured data, and agent files.
- **Written decisions** in [docs/decisions.md](docs/decisions.md) record what we chose and why, from the stack to the confidentiality policy.

## How the content works

Everything the site says lives in two YAML files, validated against schemas at build time:

- [src/content/profile.yaml](src/content/profile.yaml): headline, summary, approach, skills, experience, and links
- [src/content/samples.yaml](src/content/samples.yaml): writing samples

At build time, one shared loader turns those files into every output:

| Output | For |
| --- | --- |
| The page (`/`) | People |
| Title, description, and share tags | Search results and link previews |
| Structured data (JSON-LD) | Search engines and AI agents |
| `/llms.txt`, `/llms-full.txt`, `/index.md` | AI agents and tools that prefer plain text |
| `/robots.txt`, `/sitemap.xml` | Crawlers |

A content change updates all of them on the next build.

## Project skills

| Skill | What it does |
| --- | --- |
| `add-sample` | Adds a writing sample, taking product facts only from the public page and checking confidentiality |
| `copy-review` | Reviews site copy against the style guide and confidentiality rules |
| `update-experience` | Updates roles, promotions, and skills, and flags related text to change |
| `update-design` | Makes visual changes through design tokens, then checks contrast, screenshots, and Lighthouse |
| `seo-aeo-audit` | Checks how search engines and AI agents see the site, and fixes problems at the source |
| `pre-publish` | Runs the final checks before a merge to `main` publishes the site, then drafts the commit and PR text |

## Project docs

- [docs/PLAN.md](docs/PLAN.md): the phased plan and current status
- [docs/decisions.md](docs/decisions.md): key decisions and why they were made
- [docs/style-guide.md](docs/style-guide.md): voice and copy rules
- [docs/design.md](docs/design.md): the visual design system: colors, type, spacing, and components

## Run locally

Requires Node.js 22.12 or later (`.nvmrc` pins 24 LTS).

```sh
npm install
npm run dev
```

The site runs at http://localhost:4321. Stop the dev server with `npx astro dev stop`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the site to `dist/` and validate all content |
| `npm run preview` | Serve the built site locally |
| `npm run check:metadata` | Check the page head, structured data, and crawler and agent files (run after `build`) |
| `npm run contrast` | Check text contrast against WCAG 2.2 AA in both themes |
| `npm run screenshots` | Save full-page screenshots at three widths in both themes (needs the dev server and Google Chrome) |
| `npm run images` | Regenerate the favicon and social share image (needs Google Chrome) |

## Deployment and CI

- **Hosting:** [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) serves the built site as static files. The config is in [wrangler.jsonc](wrangler.jsonc).
- **Deploys:** Cloudflare Workers Builds deploys every merge to `main` to matthewpinsker.com, and builds a preview URL for every other branch, so each pull request can be reviewed on a real URL before merging.
- **CI:** [GitHub Actions](.github/workflows/ci.yml) runs on every pull request: it builds the site, validates the content, and runs the metadata, contrast, and broken-link checks.
- **Analytics:** Cloudflare Web Analytics, which uses no cookies and doesn't track visitors across sites. Cloudflare adds its script when serving the site, so it isn't in the code.

## Built with

[Astro](https://astro.build) with hand-written CSS, self-hosted fonts ([Source Serif 4](https://github.com/adobe-fonts/source-serif), [Inter](https://rsms.me/inter/), and [IBM Plex Mono](https://github.com/IBM/plex) via [Fontsource](https://fontsource.org)), and a little JavaScript for the theme toggle and back-to-top button.

## License

The code, skills, and docs are available under the [MIT License](LICENSE). The site content (the text in `src/content/` and the images in `public/`) is © Matthew Pinsker, all rights reserved.
