---
name: add-sample
description: Add a writing sample to the portfolio's "Selected work" section. Use when Matthew wants to add, showcase, or feature a doc, docs site, or other writing sample on the site.
---

# Add a writing sample

Adds one entry to `src/content/samples.yaml` that follows the site's style guide and confidentiality rules.

## 1. Gather facts

Ask Matthew for anything you don't already have:

1. The public URL of the sample.
2. What Matthew did on it: wrote it, owns the site, restructured it, and so on.
3. Whether any part of it is confidential or shouldn't be described.

Then fetch the public URL and take the following from the page itself: the published title, what the product does, and who the docs are for. Don't use any other source for product facts.

If the URL isn't publicly reachable, stop and tell Matthew. Samples must link to public pages.

## 2. Draft the entry

Write the entry using the field rules in `docs/style-guide.md` ("Writing-sample entries"). In particular:

- `summary` comes only from the public page.
- `role` is first person and generic. Before you write it, check it against CLAUDE.md rule 1. Remove anything that describes internal processes, internal tools, people, or metrics.
- Don't invent anything. If you're unsure of a detail, add a `# TODO(matthew):` comment above the field.
- Set `order` so the new sample lands where Matthew wants it. Renumber the other entries if needed.
- Set `id` to a short kebab-case slug, unique in the file.

## 3. Confirm with Matthew

Show Matthew the drafted YAML entry before you write it to the file. Apply any edits Matthew asks for.

## 4. Write and verify

1. Add the entry to `src/content/samples.yaml`.
2. Run `npm run build`. If it fails on schema validation, fix the entry and build again.
3. Report the result: the sample's title, where it appears in the list, and any `TODO(matthew)` items left.
