import fs from 'node:fs';
import path from 'node:path';
import { buildSitemapXml } from '../lib/sitemap/build-sitemap-xml';
import { discoverSitemapEntries } from '../lib/sitemap/discover-urls';
import { validateHazardousSubstanceEntries } from '../lib/betriebsanweisung/validate-entries';

const ROOT = process.cwd();

validateHazardousSubstanceEntries();

const entries = discoverSitemapEntries(ROOT);
const xml = buildSitemapXml(entries);
const target = path.join(ROOT, 'sitemap.xml');
fs.writeFileSync(target, xml, 'utf8');
console.log(`✓ sitemap.xml (${entries.length} URLs)`);
