# Site style guide

How copy on matthewpinsker.com should read. This applies to everything in `src/content/` and any text in templates. It's a draft; Matthew has final say.

## Voice

- **First person.** The site is Matthew speaking: "I write…", "I own…".
- **Confident and specific.** Name the product, the audience, and what Matthew did. Show, don't claim: "I own the docs end to end" beats "I'm passionate about docs."
- **Plain.** Short sentences, common words, active voice.
- **To the point.** Lead with the key fact. Cut filler words and phrases unless they help the sentence flow. If a sentence reads the same without a word, delete the word.
- **Honest about AI.** Describe AI as a tool Matthew directs. Never imply AI did work that Matthew didn't review and own, and never hide that AI was used.

## Mechanics

- Sentence case for headings and titles: "Selected work", not "Selected Work".
- Use contractions ("I'm", "don't").
- Use numerals for numbers 10 and over, and with units or plus signs ("7+ years").
- Use the serial comma.
- Link text describes the destination. Never use "click here" or a bare URL.
- Product and tool names use their official capitalization: GitHub, Postman, Fern, Claude Code, llms.txt, MCP.

## Words to avoid

| Avoid | Why | Try instead |
| --- | --- | --- |
| passionate, rockstar, ninja, guru | Empty self-praise | Describe what you did |
| leverage, utilize | Jargon | use |
| seamless, robust, cutting-edge, revolutionary | Marketing filler | Say what's actually true |
| simply, just, easy | Can make readers feel bad when it isn't easy | Drop the word |
| as well as | Wordy | and |
| in order to | Wordy | to |
| very, really, actually, basically | Filler | Drop the word, or use a stronger word |
| both (as in "serves both X and Y") | Usually filler | Drop the word |
| AI-powered (repeatedly) | Loses meaning fast | Say what the AI does |

## Writing-sample entries

Each entry in `src/content/samples.yaml` follows this pattern:

- **`title`:** the title of the doc or site, as published.
- **`product`:** the product name, and its parent company if that helps.
- **`summary`:** one or two sentences on what the product does, based only on its public docs.
- **`audience`:** who the docs are for, in plain words.
- **`role`:** what Matthew did, in first person, starting with "I". Generic process only: no internal tools, people, or metrics (see CLAUDE.md, rule 1).
- **`tools`:** three to five tools, most important first.

Keep each field to about 30 words or fewer. Keep the profile `summary` to two sentences.

## Experience entries

Each highlight in `experience` in `src/content/profile.yaml` starts with a verb, without "I". Use present tense for a current role and past tense for earlier ones. Keep highlights generic (see CLAUDE.md, rule 1), and use two or three per role.
