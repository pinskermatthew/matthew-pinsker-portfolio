// Content model for the site. All facts about Matthew live in the YAML files
// under src/content/; templates only render them. The schemas below validate
// that content at build time, so a missing or malformed field fails the build.
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const profile = defineCollection({
  loader: file('src/content/profile.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    headline: z.string(),
    summary: z.string(),
    links: z.object({
      linkedin: z.string().url(),
      github: z.string().url(),
    }),
    approach: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    ),
    skills: z.array(
      z.object({
        group: z.string(),
        items: z.array(z.string()),
      }),
    ),
    experience: z.array(
      z.object({
        company: z.string(),
        location: z.string(),
        role: z.string(),
        start: z.string(),
        end: z.string().optional(),
        note: z.string().optional(),
        highlights: z.array(z.string()),
      }),
    ),
  }),
});

const samples = defineCollection({
  loader: file('src/content/samples.yaml'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    product: z.string(),
    url: z.string().url(),
    summary: z.string(),
    audience: z.string(),
    role: z.string(),
    tools: z.array(z.string()),
    order: z.number().int(),
  }),
});

export const collections = { profile, samples };
