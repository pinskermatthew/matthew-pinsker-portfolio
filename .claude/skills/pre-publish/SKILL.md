---
name: pre-publish
description: Run the final checks before merging a branch to main, which publishes the portfolio to matthewpinsker.com. Use when Matthew is about to open or merge a pull request, asks "is this ready to ship?", or asks for a release check.
---

# Pre-publish check

Merging to `main` publishes the site: Cloudflare Workers Builds deploys it to matthewpinsker.com within minutes. This skill confirms a branch is ready, then hands Matthew a commit message and PR text. Matthew commits and merges himself.

## 1. See what changed

```sh
git status --short
git diff main...HEAD --stat
```

Note which kinds of files changed: content (`src/content/`), design (`global.css`, components), generated outputs (`src/lib/`, `src/pages/*.ts`), docs, or tooling. The checks below depend on it.

## 2. Run the automated checks

Run all of them, whatever changed. They're fast.

```sh
npm run build
npm run check:metadata
npm run contrast
```

Every check must pass. If `check:metadata` reports `TODO(matthew)` items, list them for Matthew; don't resolve them yourself.

## 3. Run the checks for what changed

| If this changed | Also do this |
| --- | --- |
| Site copy (`src/content/`, visible template text) | Run the `copy-review` skill on the changed text |
| Name, headline, accent color, or display font | Run `npm run images`, then look at `public/og-image.png` |
| Design (CSS, components, layout) | With the dev server running, run `npm run screenshots` and review all six images |
| Fonts, layout, or anything loaded on the page | Run Lighthouse on the production build (`npx astro preview`), mobile and desktop; every category stays at 95 or higher |
| Content or generated outputs | Read `dist/llms.txt` and `dist/index.md` for anything confusing out of context |

## 4. Check the repo itself

The repo is public, so it's part of the portfolio.

1. **Confidentiality (CLAUDE.md rule 1):** search the diff, including docs and comments, for anything describing an employer's internal processes, tools, people, or metrics.
2. **Secrets and personal details:** no API keys, tokens, `.env` files, phone numbers, or home addresses in the diff.
3. **Docs in sync (CLAUDE.md rule 12):** if commands, skills, outputs, docs, or folders changed, the tables in `README.md` and `CLAUDE.md` match.
4. **Plan and decisions:** `docs/PLAN.md` reflects what's done; a meaningful choice has an entry in `docs/decisions.md`.

## 5. Preview, then hand off

1. Remind Matthew that the pull request gets a Cloudflare preview URL (posted on the PR, or under the Worker's deployments in the Cloudflare dashboard). Suggest checking it on a phone and a desktop, in both themes.
2. Report the results: each check, pass or fail, and anything Matthew needs to decide.
3. If everything passes, give Matthew a commit message (imperative mood, ending with the `Co-Authored-By` line) and a PR title and description. List any untracked files to include.
