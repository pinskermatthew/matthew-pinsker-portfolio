// Builds the plain-text versions of the site for AI agents and other tools:
//   - /index.md and /llms-full.txt: the whole page as Markdown
//   - /llms.txt: a short index in the llms.txt format (https://llmstxt.org)
// Both are generated from the same content as the page, so they never drift.
import type { SiteContent } from './content';

const dates = (job: { start: string; end?: string }) => `${job.start}–${job.end ?? 'present'}`;

export function buildFullMarkdown({ profile, samples }: SiteContent, site: URL): string {
  const lines: string[] = [
    `# ${profile.name}`,
    '',
    `> ${profile.headline}`,
    '',
    profile.summary,
    '',
    `- Website: ${site.href}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    '',
    '## Selected work',
    '',
  ];

  for (const sample of samples) {
    lines.push(
      `### [${sample.title}](${sample.url})`,
      '',
      sample.summary,
      '',
      `- **Product:** ${sample.product}`,
      `- **Audience:** ${sample.audience}`,
      `- **My role:** ${sample.role}`,
      `- **Tools:** ${sample.tools.join(', ')}`,
      '',
    );
  }

  lines.push('## How I work with AI', '');
  for (const item of profile.approach) {
    lines.push(`### ${item.title}`, '', item.body, '');
  }

  lines.push('## Skills and tools', '');
  for (const group of profile.skills) {
    lines.push(`### ${group.group}`, '', ...group.items.map((item) => `- ${item}`), '');
  }

  lines.push('## Experience', '');
  for (const job of profile.experience) {
    const note = job.note ? ` ${job.note}` : '';
    lines.push(`- **${job.role}, ${job.company}** (${dates(job)}).${note}`);
  }
  lines.push('', `Full work history: ${profile.links.linkedin}`, '');

  lines.push('## Contact', '', `${profile.contactLead} Contact me on [LinkedIn](${profile.links.linkedin}).`, '');

  return lines.join('\n');
}

export function buildLlmsTxt({ profile, samples, currentRole }: SiteContent, site: URL): string {
  const url = (path: string) => new URL(path, site).href;

  return [
    `# ${profile.name}`,
    '',
    `> ${profile.headline}`,
    '',
    profile.summary,
    '',
    `Current role: ${currentRole.role} at ${currentRole.company}.`,
    '',
    '## Writing samples',
    '',
    ...samples.map((sample) => `- [${sample.title}](${sample.url}): ${sample.summary}`),
    '',
    '## Profile',
    '',
    `- [Full profile in Markdown](${url('/index.md')}): Selected work, how I work with AI, skills, and experience`,
    `- [LinkedIn](${profile.links.linkedin}): Full work history and contact`,
    '',
    '## Optional',
    '',
    `- [Full site text](${url('/llms-full.txt')}): The same content as the full profile, as one plain-text file`,
    '',
  ].join('\n');
}
