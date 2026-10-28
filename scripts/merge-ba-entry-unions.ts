/**
 * Union of HAZARDOUS_SUBSTANCE_SEO_ENTRIES from main + open pSEO PRs #12–#18.
 * Converts legacy rich blocks to the reduced HazardousSubstanceSeoEntry schema.
 * HEAD wins on slug conflict.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const ENTRIES = path.join(ROOT, 'config/betriebsanweisung/entries.ts');

const REFS = [
  'HEAD',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-22-3902',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-23-f77c',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-24-21f2',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-25-5796',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-26-d424',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-27-334e',
  'origin/cursor/pseo-betriebsanweisungen-2026-10-28-1bce',
] as const;

type ReducedEntry = {
  slug: string;
  substanceName: string;
  metaDescription: string;
  typicalIndustries: string[];
};

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
    const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
    if (!slugMatch) throw new Error(`no slug in block starting ${begin}`);
    out.push({ slug: slugMatch[1]!, block });
  }
  return out;
}

function readQuotedField(block: string, field: string): string | undefined {
  const re = new RegExp(`${field}:\\s*(['"])([^'"]*)\\1`);
  return block.match(re)?.[2];
}

function parseTypicalIndustries(block: string): string[] {
  const start = block.indexOf('typicalIndustries:');
  if (start < 0) return [];
  const bracket = block.indexOf('[', start);
  if (bracket < 0) return [];
  let depth = 0;
  let end = bracket;
  for (let i = bracket; i < block.length; i++) {
    const ch = block[i]!;
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const inner = block.slice(bracket + 1, end);
  const industries: string[] = [];
  const itemRe = /['"]([^'"]+)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(inner)) !== null) {
    industries.push(m[1]!);
  }
  return industries;
}

function blockToReduced(block: string): ReducedEntry {
  const slug = readQuotedField(block, 'slug');
  const substanceName = readQuotedField(block, 'substanceName');
  if (!slug || !substanceName) {
    throw new Error(`block missing slug/substanceName: ${block.slice(0, 80)}…`);
  }

  let metaDescription = readQuotedField(block, 'metaDescription');
  if (!metaDescription?.trim()) {
    metaDescription = `Betriebsanweisung ${substanceName}: KI-gestützter TRGS-555-Entwurf aus Ihrem Sicherheitsdatenblatt in Gefahrstoff-QR.`;
  }

  const typicalIndustries = parseTypicalIndustries(block);
  if (!typicalIndustries.length) {
    throw new Error(`typicalIndustries empty for ${slug}`);
  }

  return { slug, substanceName, metaDescription, typicalIndustries };
}

function formatEntry(entry: ReducedEntry): string {
  const industries = entry.typicalIndustries.map((i) => `      "${i.replace(/"/g, '\\"')}",`).join('\n');
  return `  {
    slug: '${entry.slug}',
    substanceName: "${entry.substanceName.replace(/"/g, '\\"')}",
    metaDescription: "${entry.metaDescription.replace(/"/g, '\\"')}",
    typicalIndustries: [
${industries}
    ],
  }`;
}

const bySlug = new Map<string, ReducedEntry>();
for (const ref of REFS) {
  try {
    for (const { slug, block } of extractEntryBlocks(loadEntriesSource(ref))) {
      if (!bySlug.has(slug)) {
        bySlug.set(slug, blockToReduced(block));
      }
    }
  } catch (e) {
    console.warn(`skip ${ref}:`, e instanceof Error ? e.message : e);
  }
}

const sorted = [...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug, 'de'));
const body = sorted.map((entry) => `${formatEntry(entry)},`).join('\n');

const template = fs.readFileSync(ENTRIES, 'utf8');
const start = template.indexOf('export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [');
const end = template.indexOf('] as const satisfies readonly HazardousSubstanceSeoEntry[];');
if (start < 0 || end < 0) throw new Error('entries.ts structure unexpected');

const tail = template.slice(end + '] as const satisfies readonly HazardousSubstanceSeoEntry[];'.length);
const header = template.slice(0, start);
const next = `${header}export const HAZARDOUS_SUBSTANCE_SEO_ENTRIES = [
${body}
] as const satisfies readonly HazardousSubstanceSeoEntry[];${tail}`;
fs.writeFileSync(ENTRIES, next);
console.log(`✓ entries.ts union: ${sorted.length} substances (reduced schema)`);
