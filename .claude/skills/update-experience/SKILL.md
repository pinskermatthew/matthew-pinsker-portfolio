---
name: update-experience
description: Update the portfolio's experience section, skills, or summary after a job change, promotion, or new skill. Use when Matthew mentions a new role, title, promotion, employer, or skill to add to the site.
---

# Update experience

Keeps the experience section, skills, and summary in `src/content/profile.yaml` current, following decision 008 (condensed experience) and the style guide.

## 1. Gather the change

Ask Matthew for anything you don't already have:

- **New role or employer:** company name, title, and start year. For a role that ended, the end year.
- **Promotion:** the old title, the new title, and the year.
- **New skill or tool:** the name, and which skill group it belongs in.

Don't guess dates or titles. If Matthew isn't sure, add a `# TODO(matthew):` comment instead.

## 2. Update `profile.yaml`

Follow the "Experience entries" rules in `docs/style-guide.md`:

- **New employer:** add an entry at the top of `experience`. Give the previous entry an `end` year.
- **Promotion:** change `role` to the new title, and update `note` to summarize the progression in one or two short sentences, for example "Promoted from Technical Writer in 2025."
- **Skills:** add the item to the right group in `skills`. Keep each group to about five items; if a group grows past that, ask Matthew which item to drop.
- One entry per company. No responsibilities, highlights, or locations; the detailed history lives on LinkedIn.

## 3. Check related content

A role change often affects other text. Check and propose updates to:

- `summary`: years of experience ("7+ years") and seniority.
- `headline`, if the focus of the role changed.
- `scripts/images/og-image.html`, if the headline changed. Then run `npm run images`.

Years of experience count from June 2019, Matthew's first technical writing role.

## 4. Confirm and verify

1. Show Matthew the changed YAML before you save it, and apply any edits Matthew asks for.
2. Run `npm run build` and fix any errors.
3. Summarize what changed and any `TODO(matthew)` items left.
