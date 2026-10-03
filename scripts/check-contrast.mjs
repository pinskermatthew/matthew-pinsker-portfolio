// Checks the color tokens in src/styles/global.css against WCAG 2.2 AA:
//   - every text color pair the site uses has a contrast ratio of 4.5:1 or more
//   - the two dark-mode blocks define identical colors
//
//   npm run contrast
//
// Exits with an error if any check fails.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');

// Text color on background color, as used on the site.
const PAIRS = [
  ['text', 'bg', 'Body text and headings'],
  ['muted', 'bg', 'Secondary text, nav links, labels'],
  ['accent', 'bg', 'Links and small caps labels'],
  ['muted', 'chip-bg', 'Tool tags'],
  ['bg', 'text', 'Skip link (inverted)'],
];
const MIN_RATIO = 4.5;

function colorsIn(block) {
  const colors = {};
  for (const [, name, hex] of block.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)) {
    colors[name] = hex.toLowerCase();
  }
  return colors;
}

function blockAfter(selector) {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`Couldn't find "${selector}" in global.css`);
  const open = css.indexOf('{', start);
  return css.slice(open, css.indexOf('}', open));
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const themes = {
  light: colorsIn(blockAfter(':root {')),
  dark: colorsIn(blockAfter(":root[data-theme='dark'] {")),
};
const mediaDark = colorsIn(blockAfter(":root:not([data-theme='light']) {"));

let failed = false;

for (const [theme, colors] of Object.entries(themes)) {
  console.log(`\n${theme}`);
  for (const [fg, bg, use] of PAIRS) {
    if (!colors[fg] || !colors[bg]) {
      console.log(`  MISSING  --color-${fg} or --color-${bg}`);
      failed = true;
      continue;
    }
    const r = ratio(colors[fg], colors[bg]);
    const ok = r >= MIN_RATIO;
    failed ||= !ok;
    console.log(`  ${ok ? 'pass' : 'FAIL'}  ${r.toFixed(1).padStart(4)}:1  ${fg} on ${bg}  (${use})`);
  }
}

const mismatched = Object.keys({ ...themes.dark, ...mediaDark }).filter(
  (name) => themes.dark[name] !== mediaDark[name],
);
if (mismatched.length) {
  console.log(`\nFAIL  The two dark-mode blocks differ: ${mismatched.map((n) => `--color-${n}`).join(', ')}`);
  failed = true;
} else {
  console.log('\npass  The two dark-mode blocks match');
}

if (failed) {
  console.log(`\nContrast check failed. Text pairs need ${MIN_RATIO}:1 or more (WCAG 2.2 AA).`);
  process.exit(1);
}
