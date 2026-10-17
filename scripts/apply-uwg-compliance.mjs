#!/usr/bin/env node
/**
 * Batch § 5 UWG / Footer replacements in static HTML, JSON, MDX (not _next).
 */
import fs from 'node:fs';
import path from 'node:path';

import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FOOTER_COPYRIGHT =
  '© 2026 Gefahrstoff-QR · Das Angebot richtet sich ausschließlich an Unternehmen, Gewerbetreibende, Freiberufler und juristische Personen des öffentlichen Rechts im Sinne des § 14 BGB.';

const REPLACEMENTS = [
  ['Rechtssicheres Gefahrstoffverzeichnis nach §&nbsp;6 GefStoffV', 'Gefahrstoffverzeichnis nach Vorgaben von §&nbsp;6 GefStoffV &amp; TRGS'],
  ['Rechtssicheres Gefahrstoffverzeichnis nach § 6 GefStoffV', 'Gefahrstoffverzeichnis nach Vorgaben von § 6 GefStoffV & TRGS'],
  [
    'Rechtssicheres Gefahrstoffverzeichnis nach &#167;&nbsp;6 GefStoffV.',
    'Gefahrstoffverzeichnis nach Vorgaben von &#167;&nbsp;6 GefStoffV &amp; TRGS.',
  ],
  [
    '<p class="footer-copy">&#xa9; 2026 Gefahrstoff-QR &middot; Alle Rechte vorbehalten.</p>',
    `<p class="footer-copy">${FOOTER_COPYRIGHT.replace('©', '&#xa9;').replace('§', '&#167;').replace('ö', '&#246;').replace('ß', '&#223;')}</p>`,
  ],
  ['100 % DSGVO-konform', 'Serverstandort Deutschland (DSGVO-konform)'],
  ['100% DSGVO-konform', 'Serverstandort Deutschland (DSGVO-konform)'],
  ['Muster-Entwurf jetzt freischalten (Sofort-Download)', 'Muster-Entwurf jetzt in der App freischalten'],
  ['© 2026 Gefahrstoff-QR · Alle Rechte vorbehalten.', FOOTER_COPYRIGHT],
  ['© 2025 Gefahrstoff-QR · Alle Rechte vorbehalten.', FOOTER_COPYRIGHT],
  [`© ${new Date().getFullYear()} Gefahrstoff-QR · Alle Rechte vorbehalten.`, FOOTER_COPYRIGHT],
];

const EXT = new Set(['.html', '.json', '.mdx', '.md', '.tsx', '.ts']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === '_next' || name === '.next' || name === 'out') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXT.has(path.extname(name))) out.push(full);
  }
  return out;
}

let changed = 0;
for (const file of walk(ROOT)) {
  if (file.includes(`${path.sep}_next${path.sep}`)) continue;
  let text = fs.readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of REPLACEMENTS) {
    next = next.split(from).join(to);
  }
  if (next !== text) {
    fs.writeFileSync(file, next);
    changed += 1;
    console.log('updated', path.relative(ROOT, file));
  }
}
console.log(`Done. ${changed} file(s) updated.`);
