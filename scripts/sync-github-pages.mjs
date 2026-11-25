/**
 * Kopiert den Next.js Static Export (out/) ins Repo-Root für GitHub Pages.
 * Überschreibt nur definierte Pfade — index.html und statische Legacy-Seiten bleiben unangetastet.
 */
import fs from 'fs';
import path from 'path';
import { syncNextDirWithRetention } from './lib/retain-next-static-chunks.mjs';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');

/** Pfade relativ zu out/ → Repo-Root (kein index.html — Homepage bleibt statisch). */
const SYNC_PATHS = [
  'wissen',
  'loesungen',
  'betriebsanweisung',
  'gefahrstoff-app',
  'etikettensoftware-gefahrstoffe',
  'gefahrstoffkataster-excel-vorlage',
  'gefahrstoffkataster-software',
  'gefahrstoffverzeichnis-excel-vorlage',
  'trgs-510-zusammenlagerungs-check',
  'so-funktioniert-die-ki',
  'sicherheit-avv',
  'praxisbeispiele',
  '_next',
];

if (!fs.existsSync(OUT)) {
  console.error('out/ fehlt. Zuerst: npm run build');
  process.exit(1);
}

for (const rel of SYNC_PATHS) {
  const src = path.join(OUT, rel);
  const dest = path.join(ROOT, rel);

  if (!fs.existsSync(src)) {
    console.warn(`Übersprungen (nicht in out/): ${rel}`);
    continue;
  }

  if (rel === '_next') {
    const stats = syncNextDirWithRetention(src, dest);
    console.log(`✓ _next/ (${stats.current} aktuell, ${stats.retained} aus Vor-Builds behalten, ${stats.pruned} entfernt)`);
    continue;
  }

  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log(`✓ ${rel}/`);
}

/**
 * Symbol-Ordner aus public/images → Repo-Root images/<ordner>/ (ohne restliches images/ zu überschreiben).
 * ghs = GHS-Piktogramme, ba-symbols = ISO-7010-Zeichen der Live-BA-Vorschau (aus gqr-backend).
 */
const SYNCED_IMAGE_DIRS = ['ghs', 'ba-symbols'];
for (const dir of SYNCED_IMAGE_DIRS) {
  const imageOut = path.join(OUT, 'images', dir);
  const imageDest = path.join(ROOT, 'images', dir);
  if (!fs.existsSync(imageOut)) continue;
  fs.mkdirSync(imageDest, { recursive: true });
  fs.cpSync(imageOut, imageDest, { recursive: true });
  console.log(`✓ images/${dir}/`);
}

/**
 * Öffentliche Downloads (z. B. AVV-PDF für /sicherheit-avv/) aus public/downloads → Repo-Root downloads/.
 * Zusammenführen statt Ersetzen, damit manuell hinterlegte Dateien im Root erhalten bleiben.
 */
const downloadsOut = path.join(OUT, 'downloads');
if (fs.existsSync(downloadsOut)) {
  const downloadsDest = path.join(ROOT, 'downloads');
  fs.mkdirSync(downloadsDest, { recursive: true });
  fs.cpSync(downloadsOut, downloadsDest, { recursive: true });
  console.log('✓ downloads/');
}

const FAVICON_FILES = [
  'favicon.ico',
  'favicon.png',
  'favicon-48x48.png',
  'favicon-192x192.png',
  'apple-touch-icon.png',
  'favico.png',
];

for (const name of FAVICON_FILES) {
  const src = path.join(OUT, name);
  const dest = path.join(ROOT, name);
  if (!fs.existsSync(src)) {
    console.warn(`Übersprungen (nicht in out/): ${name}`);
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log(`✓ ${name}`);
}

/**
 * Aus der zentralen Konfiguration generierte Root-Dateien (app/robots.ts, app/llms.txt, app/pricing.md).
 * Pflicht: Fehlen sie im Export, ist der Build defekt.
 */
const GENERATED_ROOT_FILES = ['robots.txt', 'llms.txt', 'pricing.md'];

for (const name of GENERATED_ROOT_FILES) {
  const src = path.join(OUT, name);
  if (!fs.existsSync(src) || !fs.statSync(src).isFile()) {
    console.error(`Generierte Datei fehlt in out/: ${name}`);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(ROOT, name));
  console.log(`✓ ${name} (generiert)`);
}

const STATIC_LOESUNGEN = path.join(ROOT, 'static-loesungen');
if (fs.existsSync(STATIC_LOESUNGEN)) {
  for (const name of fs.readdirSync(STATIC_LOESUNGEN)) {
    const src = path.join(STATIC_LOESUNGEN, name);
    const dest = path.join(ROOT, 'loesungen', name);
    if (!fs.statSync(src).isDirectory()) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
    console.log(`✓ loesungen/${name}/ (static overlay)`);
  }
}

console.log('GitHub-Pages-Sync abgeschlossen.');
