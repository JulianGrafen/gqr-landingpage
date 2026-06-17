/**
 * Kopiert den Next.js Static Export (out/) ins Repo-Root für GitHub Pages.
 * Überschreibt nur definierte Pfade — index.html und statische Legacy-Seiten bleiben unangetastet.
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');

/** Pfade relativ zu out/ → Repo-Root (kein index.html — Homepage bleibt statisch). */
const SYNC_PATHS = ['wissen', 'loesungen', '_next'];

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

  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log(`✓ ${rel}/`);
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

console.log('GitHub-Pages-Sync abgeschlossen.');
