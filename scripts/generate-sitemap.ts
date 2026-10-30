import fs from 'node:fs';
import path from 'node:path';
import { HAZARDOUS_SUBSTANCE_SLUGS } from '../config/betriebsanweisung/entries';
import { buildSitemapXml } from '../lib/sitemap/build-sitemap-xml';
import { discoverSitemapEntries } from '../lib/sitemap/discover-urls';
import { validateHazardousSubstanceEntries } from '../lib/betriebsanweisung/validate-entries';

const ROOT = process.cwd();

validateHazardousSubstanceEntries();

const missingExport = HAZARDOUS_SUBSTANCE_SLUGS.filter(
  (slug) => !fs.existsSync(path.join(ROOT, 'betriebsanweisung', slug, 'index.html')),
);
if (missingExport.length > 0) {
  console.error(
    `Sitemap: ${missingExport.length} Betriebsanweisung(en) ohne exportiertes HTML unter betriebsanweisung/*/index.html`,
  );
  console.error(`Beispiele: ${missingExport.slice(0, 8).join(', ')}${missingExport.length > 8 ? '…' : ''}`);
  console.error('→ npm run build:github-pages (Next-Export + Sync) ausführen, dann erneut generate:sitemap.');
  process.exit(1);
}

const entries = discoverSitemapEntries(ROOT);
const baInSitemap = entries.filter((e) => e.loc.includes('/betriebsanweisung/')).length;
const expectedBa = HAZARDOUS_SUBSTANCE_SLUGS.length + 1;

if (baInSitemap !== expectedBa) {
  console.error(`Sitemap: ${baInSitemap} Betriebsanweisungs-URLs, erwartet ${expectedBa} (Index + ${HAZARDOUS_SUBSTANCE_SLUGS.length} Slugs).`);
  process.exit(1);
}

const xml = buildSitemapXml(entries);
const target = path.join(ROOT, 'sitemap.xml');
fs.writeFileSync(target, xml, 'utf8');
console.log(`✓ sitemap.xml (${entries.length} URLs, Betriebsanweisung ${baInSitemap}/${expectedBa})`);
