// Loads the site's content once, for every output that needs it: the page,
// structured data, llms.txt, and the Markdown version. Keeping one loader is
// what keeps those outputs in sync (CLAUDE.md rule 10).
import { getCollection, getEntry } from 'astro:content';

export async function getSiteContent() {
  const profileEntry = await getEntry('profile', 'matthew');
  if (!profileEntry) throw new Error('Missing profile entry "matthew" in src/content/profile.yaml');
  const profile = profileEntry.data;

  const samples = (await getCollection('samples'))
    .map((entry) => entry.data)
    .sort((a, b) => a.order - b.order);

  const currentRole = profile.experience[0];
  const title = `${profile.name} | ${currentRole.role}`;

  return { profile, samples, currentRole, title };
}

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;
