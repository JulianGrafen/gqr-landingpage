/**
 * CI-Check für SERP-Meta (CTR-Optimierung): Längen, Emojis, Dubletten und Subdomain-Canonicals
 * über alle exportierten HTML-Seiten. Läuft nach dem Static Export / GitHub-Pages-Sync.
 *
 * Abbruchgründe (exit 1):
 *  - Title > SEO_LIMITS.titleMax oder Description > SEO_LIMITS.descriptionMax
 *  - Emoji in Title/Description
 *  - Canonical, og:url oder Sitemap-Eintrag auf app.gefahrstoff-qr.de
 *  - identischer Title auf mehreren indexierbaren URLs (Kannibalisierung)
 */
import fs from 'node:fs';
import path from 'node:path';
import { SEO_LIMITS } from '../lib/seo/buildMetadata';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['node_modules', '.git', '.next', 'out', 'static-loesungen', 'public', 'blog', 'impressum', 'datenschutz', 'agb']);
const APP_HOST_PATTERN = /https?:\/\/app\.gefahrstoff-qr\.de/i;
const EMOJI_PATTERN = /\p{Extended_Pictographic}/u;

/**
 * Bekannte Längen-Altlasten (vor CTR-Runde 11/2026). Werden als Warnung gemeldet, nicht als Fehler.
 * TODO(seo-meta): Copy je Seite kürzen und Eintrag entfernen — die Liste darf nur schrumpfen.
 */
const LEGACY_LENGTH_EXCEPTIONS = new Set<string>([
  'betriebsanweisung/index.html',
  'etikettensoftware-gefahrstoffe/index.html',
  'gefahrstoff-software-sicherheitsfachkraft-selbststaendig/index.html',
  'gefahrstoffmanagement-reinigungsfirma/index.html',
  'gefahrstoffverzeichnis-excel-vorlage/index.html',
  'loesungen/laborbetrieb/index.html',
  'loesungen/malerbetrieb/index.html',
  'loesungen/reinigungsunternehmen/index.html',
  'loesungen/schreinerei/index.html',
  'trgs-510-zusammenlagerungs-check/index.html',
  'wissen/gefahrstoffkataster-erstellen/index.html',
  'wissen/gefahrstoffkataster-erstellen-lassen/index.html',
  'wissen/gefahrstoffkataster-software/index.html',
  'wissen/gefahrstoffkataster-was-muss-rein/index.html',
  'wissen/gefahrstoffverzeichnis-arztpraxis-muster/index.html',
]);

interface PageMeta {
  file: string;
  title: string;
  description: string;
  canonical: string;
  ogUrl: string;
  indexable: boolean;
}

function walk(dir: string, out: string[]): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full, out);
    } else if (entry.name === 'index.html') {
      out.push(full);
    }
  }
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function readMeta(file: string): PageMeta | null {
  const html = fs.readFileSync(file, 'utf8');
  if (/http-equiv="refresh"/i.test(html)) return null; // Weiterleitungsseiten (z. B. /pricing/)
  const pick = (pattern: RegExp): string => decodeEntities(pattern.exec(html)?.[1]?.trim() ?? '');
  const robots = pick(/<meta name="robots" content="([^"]*)"/i);
  return {
    file: path.relative(ROOT, file),
    title: pick(/<title[^>]*>([\s\S]*?)<\/title>/i),
    description: pick(/<meta name="description" content="([^"]*)"/i),
    canonical: pick(/<link rel="canonical" href="([^"]*)"/i),
    ogUrl: pick(/<meta property="og:url" content="([^"]*)"/i),
    indexable: !/noindex/i.test(robots),
  };
}

const files: string[] = [];
walk(ROOT, files);
const pages = files.map(readMeta).filter((page): page is PageMeta => page !== null);
const errors: string[] = [];
const warnings: string[] = [];

for (const page of pages) {
  const lengthIssues = LEGACY_LENGTH_EXCEPTIONS.has(page.file) ? warnings : errors;
  if (!page.title) errors.push(`${page.file}: <title> fehlt`);
  if (page.title.length > SEO_LIMITS.titleMax) {
    lengthIssues.push(`${page.file}: Title ${page.title.length} > ${SEO_LIMITS.titleMax}: "${page.title}"`);
  }
  if (page.description.length > SEO_LIMITS.descriptionMax) {
    lengthIssues.push(`${page.file}: Description ${page.description.length} > ${SEO_LIMITS.descriptionMax}`);
  }
  if (EMOJI_PATTERN.test(page.title) || EMOJI_PATTERN.test(page.description)) errors.push(`${page.file}: Emoji in Title/Description`);
  if (APP_HOST_PATTERN.test(page.canonical) || APP_HOST_PATTERN.test(page.ogUrl)) {
    errors.push(`${page.file}: Canonical/og:url zeigt auf app.gefahrstoff-qr.de`);
  }
}

const byTitle = new Map<string, string[]>();
for (const page of pages.filter((p) => p.indexable && p.title)) {
  byTitle.set(page.title, [...(byTitle.get(page.title) ?? []), page.file]);
}
for (const [title, owners] of byTitle) {
  if (owners.length > 1) errors.push(`Doppelter Title "${title}": ${owners.join(', ')}`);
}

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
if (APP_HOST_PATTERN.test(sitemap)) errors.push('sitemap.xml enthält URLs auf app.gefahrstoff-qr.de');

if (warnings.length > 0) {
  console.warn(`! SEO-Meta: ${warnings.length} Längen-Altlast(en)\n  ${warnings.join('\n  ')}`);
}

if (errors.length > 0) {
  console.error(`✗ SEO-Meta: ${errors.length} Problem(e)\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ SEO-Meta: ${pages.length} Seiten geprüft (Längen, Emojis, Dubletten, Subdomain).`);
