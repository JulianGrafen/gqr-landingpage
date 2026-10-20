import fs from 'node:fs';
import path from 'node:path';
import {
  defaultLocFromFile,
  discoverSitemapEntries,
  resolveDeployFile,
} from '../lib/sitemap/discover-urls';
import { normalizeSitemapLoc, parsePageMeta } from '../lib/sitemap/page-meta';
import { SITE_URL } from '../config/site-seo';

const ROOT = process.cwd();
const sitemapPath = path.join(ROOT, 'sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error('validate-sitemap: sitemap.xml missing — run npm run generate:sitemap');
  process.exit(1);
}

const xml = fs.readFileSync(sitemapPath, 'utf8');
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!.trim());

const discovered = discoverSitemapEntries(ROOT);
const discoveredLocs = new Set(discovered.map((e) => e.loc));

const errors: string[] = [];

for (const loc of locs) {
  if (!loc.startsWith(`${SITE_URL}/`) && loc !== `${SITE_URL}/`) {
    errors.push(`Sitemap loc outside SITE_URL: ${loc}`);
    continue;
  }

  const file = resolveDeployFile(ROOT, loc);
  if (!file) {
    errors.push(`No deploy HTML for sitemap URL: ${loc}`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  const meta = parsePageMeta(html);
  if (meta.noindex) {
    errors.push(`Sitemap lists noindex page: ${loc} (${path.relative(ROOT, file)})`);
  }

  const expected = meta.canonical ?? defaultLocFromFile(ROOT, file) ?? loc;
  const normalizedExpected = normalizeSitemapLoc(expected);
  const normalizedLoc = normalizeSitemapLoc(loc);
  if (normalizedExpected !== normalizedLoc) {
    errors.push(
      `Canonical mismatch for ${loc}: page canonical is ${normalizedExpected} (${path.relative(ROOT, file)})`,
    );
  }
}

for (const loc of discoveredLocs) {
  if (!locs.includes(loc)) {
    errors.push(`Indexable page missing from sitemap: ${loc}`);
  }
}

if (errors.length > 0) {
  console.error(`Sitemap validation failed (${errors.length} issue(s)):\n`);
  for (const e of errors.slice(0, 40)) {
    console.error(`  • ${e}`);
  }
  if (errors.length > 40) {
    console.error(`  … and ${errors.length - 40} more`);
  }
  process.exit(1);
}

console.log(`Sitemap validation OK (${locs.length} URLs, export + canonical aligned).`);
