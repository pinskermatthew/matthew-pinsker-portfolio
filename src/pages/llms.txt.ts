// /llms.txt: a short index of the site for AI agents (https://llmstxt.org).
import type { APIRoute } from 'astro';
import { getSiteContent } from '../lib/content';
import { buildLlmsTxt } from '../lib/markdown';

export const GET: APIRoute = async ({ site }) =>
  new Response(buildLlmsTxt(await getSiteContent(), site!), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
