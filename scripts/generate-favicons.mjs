/**
 * Erzeugt Standard-Favicons aus public/favico.png (Quelle 500×500).
 * Ausgabe: public/ + Repo-Root für GitHub Pages.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public/favico.png');

if (!fs.existsSync(SRC)) {
  console.error('Quelle fehlt: public/favico.png');
  process.exit(1);
}

const sizes = [
  ['favicon-48x48.png', 48],
  ['favicon-192x192.png', 192],
  ['apple-touch-icon.png', 180],
];

for (const [name, size] of sizes) {
  const dest = path.join(ROOT, 'public', name);
  execSync(`sips -z ${size} ${size} "${SRC}" --out "${dest}"`, { stdio: 'inherit' });
}

fs.copyFileSync(path.join(ROOT, 'public/favicon-48x48.png'), path.join(ROOT, 'public/favicon.png'));

const png48 = fs.readFileSync(path.join(ROOT, 'public/favicon-48x48.png'));
const header = Buffer.from([0, 0, 1, 0, 1, 0]);
const entry = Buffer.alloc(16);
entry.writeUInt8(48, 0);
entry.writeUInt8(48, 1);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png48.length, 8);
entry.writeUInt32LE(22, 12);
const ico = Buffer.concat([header, entry, png48]);

for (const dir of [path.join(ROOT, 'public'), ROOT]) {
  fs.writeFileSync(path.join(dir, 'favicon.ico'), ico);
}

for (const name of ['favicon.png', 'favicon-48x48.png', 'favicon-192x192.png', 'apple-touch-icon.png', 'favicon.ico', 'favico.png']) {
  const from = path.join(ROOT, 'public', name === 'favico.png' ? 'favico.png' : name);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, path.join(ROOT, name));
  }
}

console.log('Favicons generiert.');
