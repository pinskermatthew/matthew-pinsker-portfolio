// /llms-full.txt: the whole page as plain text, for AI agents.
import type { APIRoute } from 'astro';
import { getSiteContent } from '../lib/content';
import { buildFullMarkdown } from '../lib/markdown';

export const GET: APIRoute = async ({ site }) =>
  new Response(buildFullMarkdown(await getSiteContent(), site!), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
