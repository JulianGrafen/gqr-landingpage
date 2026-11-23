import fs from 'node:fs';
import path from 'node:path';
import { HAZARDOUS_SUBSTANCE_SLUGS } from '@/config/betriebsanweisung/entries';
import { INDUSTRY_SLUGS } from '@/config/industry-solutions';

const ROOT = process.cwd();

/** GitHub-Pages-Root: jede Config-Route braucht `…/index.html` im committeten Export. */
function exportIndexExists(segments: readonly string[]): boolean {
  return fs.existsSync(path.join(ROOT, ...segments, 'index.html'));
}

const errors: string[] = [];

for (const slug of INDUSTRY_SLUGS) {
  if (slug === 'kfz-werkstatt') continue;
  if (!exportIndexExists(['loesungen', slug])) {
    errors.push(`/loesungen/${slug}/ → loesungen/${slug}/index.html fehlt im Export`);
  }
}

for (const slug of HAZARDOUS_SUBSTANCE_SLUGS) {
  if (!exportIndexExists(['betriebsanweisung', slug])) {
    errors.push(`/betriebsanweisung/${slug}/ → betriebsanweisung/${slug}/index.html fehlt im Export`);
  }
}

if (errors.length > 0) {
  console.error(`Export-Routen-Validierung fehlgeschlagen (${errors.length}):\n`);
  for (const e of errors.slice(0, 50)) {
    console.error(`  • ${e}`);
  }
  if (errors.length > 50) {
    console.error(`  … und ${errors.length - 50} weitere`);
  }
  process.exit(1);
}

console.log(
  `Export-Routen OK (${INDUSTRY_SLUGS.length - 1} Lösungen, ${HAZARDOUS_SUBSTANCE_SLUGS.length} Betriebsanweisungen).`,
);