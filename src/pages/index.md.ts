// /index.md: the whole page as Markdown. Linked from the page head as an
// alternate version for agents and tools that prefer Markdown.
import type { APIRoute } from 'astro';
import { getSiteContent } from '../lib/content';
import { buildFullMarkdown } from '../lib/markdown';

export const GET: APIRoute = async ({ site }) =>
  new Response(buildFullMarkdown(await getSiteContent(), site!), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
