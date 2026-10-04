// Checks the built site's metadata and machine-readable files (dist/). It
// confirms they exist, are well formed, and agree with the page. It doesn't
// measure search ranking or validate against schema.org; see the seo-aeo-audit
// skill for the external validators to use after launch.
//
// It checks that:
//   - the page head has a title, description, canonical URL, and share tags
//   - the structured data (JSON-LD) parses and describes Matthew and each sample
//   - robots.txt, sitemap.xml, llms.txt, llms-full.txt, and index.md exist and
//     agree with the page
//   - the share image template matches the current name and headline
//
//   npm run build && npm run check:metadata
//
// Exits with an error if any check fails.
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

let failures = 0;
function check(ok, message) {
  console.log(`  ${ok ? 'pass' : 'FAIL'}  ${message}`);
  if (!ok) failures += 1;
}
const section = (name) => console.log(`\n${name}`);

if (!existsSync(new URL('dist/index.html', root))) {
  console.error('No build found. Run `npm run build` first.');
  process.exit(1);
}

const html = read('dist/index.html');
const attr = (pattern) => html.match(pattern)?.[1];

// Page head
section('Page head');
const title = attr(/<title>([^<]*)<\/title>/);
const description = attr(/<meta name="description" content="([^"]*)"/);
const canonical = attr(/<link rel="canonical" href="([^"]*)"/);
check(Boolean(title), `Title: ${title}`);
check(description && description.length >= 50 && description.length <= 170, `Description is 50–170 characters (${description?.length ?? 0})`);
check(canonical?.startsWith('https://'), `Canonical URL: ${canonical}`);
for (const tag of ['og:title', 'og:description', 'og:url', 'og:image']) {
  check(html.includes(`property="${tag}"`), `Has ${tag}`);
}
check(html.includes('name="twitter:card"'), 'Has twitter:card');
check(html.includes('type="text/markdown" href="/index.md"'), 'Links to the Markdown version');
check(existsSync(new URL('public/og-image.png', root)), 'Share image exists');

// Structured data
section('Structured data (JSON-LD)');
let graph = [];
try {
  const json = attr(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  graph = JSON.parse(json)['@graph'];
  check(true, 'Parses as JSON');
} catch {
  check(false, 'Parses as JSON');
}
const person = graph.find((node) => node['@type'] === 'Person');
const page = graph.find((node) => node['@type'] === 'ProfilePage');
const works = graph.filter((node) => node['@type'] === 'CreativeWork');
check(Boolean(page), 'Has a ProfilePage');
check(person?.name && person?.jobTitle && person?.worksFor?.name, `Person: ${person?.name}, ${person?.jobTitle} at ${person?.worksFor?.name}`);
check(person?.sameAs?.length > 0, 'Person links to at least one profile (sameAs)');
check(works.length > 0, `${works.length} writing samples (CreativeWork)`);
check(works.every((work) => html.includes(`href="${work.url}"`)), 'Every sample in the structured data is linked on the page');
check(page?.description === description, 'ProfilePage description matches the meta description');

// Files for crawlers and agents
section('Crawler and agent files');
const exists = (path) => existsSync(new URL(`dist/${path}`, root));
for (const path of ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', 'index.md']) {
  check(exists(path), `${path} exists`);
}
const robots = exists('robots.txt') ? read('dist/robots.txt') : '';
check(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots.txt does not block the site');
check(robots.includes('Sitemap: '), 'robots.txt points to the sitemap');
const sitemap = exists('sitemap.xml') ? read('dist/sitemap.xml') : '';
check(canonical && sitemap.includes(`<loc>${canonical}</loc>`), 'sitemap.xml lists the canonical URL');

const llms = exists('llms.txt') ? read('dist/llms.txt') : '';
const full = exists('index.md') ? read('dist/index.md') : '';
const headline = llms.match(/^> (.+)$/m)?.[1];
check(person && llms.startsWith(`# ${person.name}\n`), 'llms.txt starts with the name as its H1');
check(Boolean(headline) && html.includes(headline), 'llms.txt headline matches the page');
check(works.every((work) => llms.includes(`(${work.url})`) && full.includes(`(${work.url})`)), 'llms.txt and index.md link every sample');
check(exists('llms-full.txt') && read('dist/llms-full.txt') === full, 'llms-full.txt matches index.md');

// Share image template
section('Share image');
const og = read('scripts/images/og-image.html');
check(person && og.includes(`<h1>${person.name}</h1>`), 'og-image.html shows the current name');
check(Boolean(headline) && og.includes(headline), 'og-image.html shows the current headline (run `npm run images` after fixing)');

// Content readiness
section('Content');
const todos = ['profile.yaml', 'samples.yaml']
  .flatMap((file) => read(`src/content/${file}`).split('\n').filter((line) => line.includes('TODO(matthew):')));
check(todos.length === 0, todos.length ? `${todos.length} TODO(matthew) items left: ${todos.map((t) => t.trim()).join(' | ')}` : 'No TODO(matthew) items left');

if (failures) {
  console.log(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll checks passed.');
