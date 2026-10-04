# Visual design guide

How matthewpinsker.com looks, and the rules for changing it. The tokens live at the top of [`src/styles/global.css`](../src/styles/global.css); this guide explains what each one is for. For why the site looks this way, see [decisions 006 and 009](decisions.md#006-editorial-visual-design). For how to make a change, use the `update-design` skill.

## Principles

- **Editorial, not decorative.** Typography and spacing do the work. No gradients, shadows (except the back-to-top button), or illustrations.
- **Personality in small doses.** One or two small, functional touches, like the rocket back-to-top button. Never in the way of the content, and never in headings or work copy.
- **Content first.** Design never competes with the samples and the writing.
- **Accessible in both themes.** Every change works in light and dark mode, at every width, with a keyboard.

## Color

Use only these tokens. Don't add a color without adding a token for it, in all three color blocks.

| Token | Role | Light | Dark |
| --- | --- | --- | --- |
| `--color-bg` | Page background | `#faf7f2` warm paper | `#1a1816` warm charcoal |
| `--color-text` | Body text, headings | `#1f1d1a` | `#ede8e0` |
| `--color-muted` | Secondary text, nav links, labels, tool tags | `#5c574f` | `#b0a99e` |
| `--color-accent` | Links, small-caps labels, numbering, arrows | `#9a3412` rust | `#f0a07a` peach |
| `--color-rule` | Divider lines and button borders (decorative only, never text) | `#e2dcd2` | `#3a3530` |
| `--color-chip-bg` | Tool tag background | `#f1ece4` | `#262320` |

### Contrast

Every text pair must reach 4.5:1 (WCAG 2.2 AA). Check with `npm run contrast`; it also confirms the two dark-mode blocks match.

| Pair | Light | Dark |
| --- | --- | --- |
| text on bg | 15.7:1 | 14.5:1 |
| muted on bg | 6.7:1 | 7.6:1 |
| accent on bg | 6.8:1 | 8.4:1 |
| muted on chip-bg | 6.1:1 | 6.7:1 |

### Dark mode

Dark colors are defined twice in `global.css`: once for visitors whose system prefers dark, and once for visitors who pick dark with the theme toggle. Keep the two blocks identical.

## Type

All fonts are self-hosted with Fontsource packages.

| Token | Font | Use for |
| --- | --- | --- |
| `--font-display` | Source Serif 4 (optically sized) | Name, section headings, card and entry titles, contact line |
| `--font-body` | Inter | Everything else, including the headline under the name |
| `--font-mono` | IBM Plex Mono | Small details only: tool tags, dates, numbering, footer |

### Size scale

| Token | Size | Use for |
| --- | --- | --- |
| `--text-hero` | 2.75–4.5rem (fluid) | Name only |
| `--text-xl` | 1.75rem | Section headings, contact line |
| `--text-lg` | 1.25rem | Entry titles, approach and skill group headings |
| `--text-base` | 1.0625rem (17px) | Body text |
| `--text-sm` | 0.875rem | Nav links, notes, secondary links |

Sample titles use 1.5rem and the headline 1.375rem; these are one-offs, not tokens.

### Type rules

- **No italics.** Matthew prefers upright type.
- **Weights:** the name is 700; headings and titles are 600; body text is 400; the headline and emphasized links are 500.
- **Hierarchy comes from contrast between fonts,** not only size: serif for titles, sans-serif for the text under them.
- **Small caps labels** (the product name above each sample) use the body font in uppercase, 0.8rem, with 0.08em letter spacing, in the accent color.

## Spacing and layout

| Token | Size | Use for |
| --- | --- | --- |
| `--space-xs` | 0.25rem | Between a label and its value |
| `--space-sm` | 0.5rem | Between tightly related items |
| `--space-md` | 1rem | Between paragraphs and small groups |
| `--space-lg` | 2rem | Between entries; section heading padding |
| `--space-xl` | 4rem | Between sections and between samples |
| `--measure` | 46rem | Maximum content width |
| `--gutter` | 1rem | Side padding at every width |

### Breakpoints

The site is designed phone-first. Test at 360, 768, and 1280px wide.

| Width | What changes |
| --- | --- |
| Below 30rem (480px) | Sample details (Audience, My role) stack, label above value |
| From 40rem (640px) | Experience dates move into their own left-hand column |
| From 48rem (768px) | Name, nav, and theme toggle share one header row. Below this, the footer gets extra bottom padding to clear the back-to-top button. |

## Components

| Component | Where | Notes |
| --- | --- | --- |
| Sample card | Selected work | Small-caps product label, serif title with arrow, summary, Audience and My role details, tool tags. Samples are separated by a dashed rule and `--space-xl`. |
| Approach item | How I work with AI | Monospace number (01, 02, 03) in the accent color beside a serif title and muted text |
| Experience entry | Experience | Dates (monospace), company (serif), role, optional note. Dates stay aligned whatever the company name's length. |
| Tool tag | Sample cards | Monospace, muted text on `--color-chip-bg`, 4px radius |
| External link | Everywhere | `ExternalLink` component: opens a new tab, adds a ↗ arrow, announces "(opens in a new tab)" to screen readers |
| Icon button | Theme toggle, back-to-top | Round, 1px `--color-rule` border, turns accent on hover. The back-to-top icon is a small line-drawn rocket, the site's one touch of personality (a nod to Matthew's interest in space). |
| 404 page | `/404.html` | Centered: a large rocket drifting among accent-colored stars, a monospace "404", the hero-size heading "Lost in space", and a link home. The rocket stops drifting for reduced-motion visitors. |

## Interaction and accessibility

- Every link and button shows a 2px accent outline on keyboard focus.
- The first Tab press reveals a "Skip to content" link.
- Motion is limited to smooth scrolling, the back-to-top fade, the rocket's 2px lift on hover or focus, and the 404 rocket's slow drift. All of it turns off when the visitor prefers reduced motion; the rocket's flame still appears, without movement.
- Scripts are progressive enhancement: without JavaScript, the page renders fully and follows the system theme.

## Generated assets

The favicon and social share image use the accent color, the display font, the name, and the headline. If any of these change, update the templates in `scripts/images/` and run `npm run images`.
