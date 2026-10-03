---
name: copy-review
description: Review the portfolio's site copy against the style guide and confidentiality rules, and propose fixes. Use when Matthew asks to review, proofread, tighten, or check the site's wording, or before a release.
---

# Review site copy

Checks every piece of text on the site against `docs/style-guide.md` and CLAUDE.md rules 1 and 2, then proposes fixes for Matthew to approve.

## 1. Collect the copy

Read these files in full:

- `src/content/profile.yaml`
- `src/content/samples.yaml`
- Any visible text in `src/pages/index.astro` and `src/components/` (headings, link text, labels)
- `scripts/images/og-image.html` (the social share image text)

If Matthew names a specific section or file, review only that.

## 2. Check each piece of text

Read `docs/style-guide.md` first, then check for:

1. **Confidentiality (CLAUDE.md rule 1).** Anything that describes an employer's internal processes, tools, people, metrics, or unreleased features. Flag these first; they block a release.
2. **Unsupported claims (CLAUDE.md rule 2).** Facts that aren't confirmed by Matthew or a public source. Product facts in `summary` fields must match the public page at `url`; fetch it if you're unsure.
3. **Words and phrases to avoid.** Everything in the style guide's "Words to avoid" table, plus filler words that add nothing.
4. **Voice and mechanics.** First person where the guide calls for it, active voice, sentence-case headings, contractions, serial commas, official product capitalization.
5. **Length limits.** Summary of two sentences; sample fields of about 30 words or fewer.
6. **Consistency.** The name and headline match across `profile.yaml` and `og-image.html`. The same tool is spelled the same way everywhere.

## 3. Report

List findings in order of severity: confidentiality, unsupported claims, then style. For each one, give:

- The file and field
- The current text
- The proposed text
- The rule it breaks

If nothing needs to change, say so.

## 4. Apply approved fixes

Make only the changes Matthew approves. Then:

1. Run `npm run build` and fix any errors.
2. If you changed the name or headline, update `scripts/images/og-image.html` and run `npm run images`.
3. Summarize what changed.
