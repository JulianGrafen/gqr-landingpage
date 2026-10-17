import fs from 'fs';
import path from 'path';
import { buildSitemapXml } from '../lib/sitemap/build-sitemap-xml';
import { validateHazardousSubstanceEntries } from '../lib/betriebsanweisung/validate-entries';

const ROOT = process.cwd();
const lastmod = new Date().toISOString().slice(0, 10);

validateHazardousSubstanceEntries();

const xml = buildSitemapXml(lastmod);
const target = path.join(ROOT, 'sitemap.xml');
fs.writeFileSync(target, xml, 'utf8');
console.log(`✓ sitemap.xml (${lastmod})`);
