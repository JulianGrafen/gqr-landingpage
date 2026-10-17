import { HAZARDOUS_SUBSTANCE_SLUGS } from '@/config/betriebsanweisung/entries';
import { STATIC_SITEMAP_ENTRIES } from '@/config/sitemap/static-urls';
import { SITE_URL } from '@/config/site-seo';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlNode(loc: string, lastmod: string, changefreq: string, priority: number): string {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

export function buildSitemapXml(lastmodIsoDate: string): string {
  const staticNodes = STATIC_SITEMAP_ENTRIES.map((entry) =>
    urlNode(entry.loc, entry.lastmod, entry.changefreq, entry.priority),
  );

  const indexNode = urlNode(`${SITE_URL}/betriebsanweisung/`, lastmodIsoDate, 'weekly', 0.85);

  const substanceNodes = HAZARDOUS_SUBSTANCE_SLUGS.map((slug) =>
    urlNode(`${SITE_URL}/betriebsanweisung/${slug}/`, lastmodIsoDate, 'monthly', 0.75),
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Core pages -->
${staticNodes.join('\n')}

  <!-- Betriebsanweisungen (Programmatic SEO) -->
${indexNode}
${substanceNodes.join('\n')}

</urlset>
`;
}
