// /sitemap.xml: lists the site's pages for search engines. The site is a
// single page, so this is one entry; add new routes here if pages are added.
import type { APIRoute } from 'astro';

const PAGES = ['/'];

export const GET: APIRoute = ({ site }) => {
  const urls = PAGES.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
