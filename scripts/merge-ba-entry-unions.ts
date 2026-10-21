/**
 * Union of HAZARDOUS_SUBSTANCE_SEO_ENTRIES from pSEO PR branches (by slug, main wins on conflict).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const ENTRIES = path.join(ROOT, 'config/betriebsanweisung/entries.ts');

const REFS = [
  'HEAD',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-20-9afc',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-19-0db8',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-21-d014',
] as const;

function loadEntriesSource(ref: string): string {
  return execSync(`git show ${ref}:config/betriebsanweisung/entries.ts`, {
    encoding: 'utf8',
  });
}

function extractEntryBlocks(source: string): { slug: string; block: string }[] {
  const marker = 'export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [';
  const start = source.indexOf(marker);
  if (start < 0) throw new Error('missing HAZARDOUS_SUBSTANCE_SEO_ENTRIES');
  let i = source.indexOf('[', start) + 1;
  const out: { slug: string; block: string }[] = [];

  while (i < source.length) {
    while (i < source.length && /[\s,]/.test(source[i]!)) i++;
    if (source[i] === ']') break;
    if (source[i] !== '{') throw new Error(`expected object at ${i}`);

    const begin = i;
    let depth = 0;
    for (; i < source.length; i++) {
      const ch = source[i]!;
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          i++;
          break;
        }
      }
    }
    const block = source.slice(begin, i).trim();
    const slugMatch = block.match(/slug:\s*'([^']+)'/);
    if (!slugMatch) throw new Error(`no slug in block starting ${begin}`);
    out.push({ slug: slugMatch[1]!, block });
  }
  return out;
}

const bySlug = new Map<string, string>();
for (const ref of REFS) {
  try {
    for (const { slug, block } of extractEntryBlocks(loadEntriesSource(ref))) {
      if (!bySlug.has(slug)) bySlug.set(slug, block);
    }
  } catch (e) {
    console.warn(`skip ${ref}:`, e instanceof Error ? e.message : e);
  }
}

const sorted = [...bySlug.entries()].sort(([a], [b]) => a.localeCompare(b, 'de'));
const body = sorted.map(([, block]) => `  ${block.replace(/\n/g, '\n  ')},`).join('\n');

const template = fs.readFileSync(ENTRIES, 'utf8');
const start = template.indexOf('export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [');
const end = template.indexOf('] as const satisfies readonly HazardousSubstanceSeoEntry[];');
if (start < 0 || end < 0) throw new Error('entries.ts structure unexpected');

const tail = template.slice(end + '] as const satisfies readonly HazardousSubstanceSeoEntry[];'.length);
const next = `${template.slice(0, start)}export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [\n${body}\n] as const satisfies readonly HazardousSubstanceSeoEntry[];${tail}`;
fs.writeFileSync(ENTRIES, next);
console.log(`✓ entries.ts union: ${sorted.length} substances`);
