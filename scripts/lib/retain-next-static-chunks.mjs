/**
 * Synchronisiert `out/_next` ins Repo-Root, ohne Chunks des vorherigen Builds sofort zu löschen.
 *
 * Hintergrund: GitHub Pages cacht HTML ~10 Minuten; offene Tabs und Crawler halten alte Seiten
 * noch länger. Werden `_next/static/*` beim Deploy komplett ersetzt, lädt altes HTML 404-Chunks
 * und Next zeigt „Application error: a client-side exception has occurred“.
 *
 * Dateien unter `_next/static` tragen einen Content-Hash und sind unveränderlich. Sie werden
 * daher behalten, bis sie `RETENTION_DAYS` lang in keinem Build mehr vorkamen.
 */
import fs from 'fs';
import path from 'path';

const RETENTION_DAYS = 7;
const MANIFEST_NAME = '.chunk-retention.json';
const DAY_MS = 24 * 60 * 60 * 1000;

function listFiles(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, base);
    return entry.name === MANIFEST_NAME ? [] : [path.relative(base, full)];
  });
}

function readManifest(manifestPath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirs(path.join(dir, entry.name));
  }
  if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}

/**
 * @param {string} outNextDir  `out/_next`
 * @param {string} destNextDir Repo-Root `_next`
 * @param {Date} [now]
 */
export function syncNextDirWithRetention(outNextDir, destNextDir, now = new Date()) {
  const outStatic = path.join(outNextDir, 'static');
  const destStatic = path.join(destNextDir, 'static');
  const manifestPath = path.join(destStatic, MANIFEST_NAME);

  // Bisher vorhandene Chunks merken (Erstlauf: alle bekommen das heutige Datum).
  const manifest = readManifest(manifestPath);
  const todayIso = now.toISOString().slice(0, 10);
  for (const rel of listFiles(destStatic)) manifest[rel] ??= todayIso;

  // Alles außer `static` (z. B. Build-ID-Ordner) wird wie bisher hart ersetzt.
  if (fs.existsSync(destNextDir)) {
    for (const entry of fs.readdirSync(destNextDir)) {
      if (entry !== 'static') fs.rmSync(path.join(destNextDir, entry), { recursive: true, force: true });
    }
  }
  for (const entry of fs.readdirSync(outNextDir)) {
    if (entry !== 'static') fs.cpSync(path.join(outNextDir, entry), path.join(destNextDir, entry), { recursive: true });
  }

  // Neue Chunks kopieren und als „heute gebaut“ markieren.
  const currentFiles = new Set(listFiles(outStatic));
  fs.mkdirSync(destStatic, { recursive: true });
  fs.cpSync(outStatic, destStatic, { recursive: true });
  for (const rel of currentFiles) manifest[rel] = todayIso;

  // Alte Chunks erst nach Ablauf der Frist entfernen.
  let pruned = 0;
  for (const [rel, lastBuiltIso] of Object.entries(manifest)) {
    if (currentFiles.has(rel)) continue;
    const ageDays = (now.getTime() - new Date(lastBuiltIso).getTime()) / DAY_MS;
    if (ageDays <= RETENTION_DAYS) continue;
    fs.rmSync(path.join(destStatic, rel), { force: true });
    delete manifest[rel];
    pruned += 1;
  }
  removeEmptyDirs(destStatic);
  fs.mkdirSync(destStatic, { recursive: true });

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);

  const retained = Object.keys(manifest).length - currentFiles.size;
  return { current: currentFiles.size, retained, pruned };
}
