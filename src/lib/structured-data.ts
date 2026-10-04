// Builds the page's structured data (JSON-LD, schema.org vocabulary) from the
// site content. Search engines and AI agents read this to learn who Matthew is,
// Matthew's current role and employer, and the docs Matthew wrote.
import type { SiteContent } from './content';

export function buildStructuredData({ profile, samples, currentRole }: SiteContent, site: URL) {
  const personId = new URL('/#person', site).href;

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    url: site.href,
    jobTitle: currentRole.role,
    worksFor: { '@type': 'Organization', name: currentRole.company },
    description: profile.description,
    knowsAbout: profile.skills.flatMap((group) => group.items),
    sameAs: [profile.links.linkedin, profile.links.github].filter(Boolean),
  };

  const works = samples.map((sample) => ({
    '@type': 'CreativeWork',
    name: sample.title,
    url: sample.url,
    description: sample.summary,
    about: sample.product,
    audience: { '@type': 'Audience', audienceType: sample.audience },
    author: { '@id': personId },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': new URL('/#page', site).href,
        url: site.href,
        name: `${profile.name} | ${currentRole.role}`,
        description: profile.description,
        mainEntity: { '@id': personId },
      },
      person,
      ...works.map((work) => ({ '@id': work.url, ...work })),
    ],
  };
}
