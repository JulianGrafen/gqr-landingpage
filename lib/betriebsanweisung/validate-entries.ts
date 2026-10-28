import { HAZARDOUS_SUBSTANCE_SEO_ENTRIES } from '@/config/betriebsanweisung/entries';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

/** Verbotene Schlüssel — keine Gefahrstoff-Detaildaten in Nightly-Batches. */
const FORBIDDEN_ENTRY_KEYS = [
  'casNumber',
  'ghsPictograms',
  'signalWord',
  'typicalHStatements',
  'hStatements',
  'documentDisplayName',
  'applicationAreaWorkplace',
  'synonyms',
  'specificPpeAdvice',
  'typicalPpeMistake',
  'storageClassTrgs510',
  'trgs510Storage',
  'classificationBasis',
  'chemicalFormula',
  'ecNumber',
  'flashPoint',
  'ignitionTemperature',
  'agwTrgs900',
  'faqItems',
] as const;

function validateEntry(entry: HazardousSubstanceSeoEntry, index: number): void {
  const prefix = `Eintrag #${index + 1} (${entry.slug || 'ohne slug'})`;
  const raw = entry as unknown as Record<string, unknown>;

  for (const key of FORBIDDEN_ENTRY_KEYS) {
    if (key in raw && raw[key] !== undefined) {
      throw new Error(`${prefix}: verbotenes Feld "${key}" — nur substanceName und SEO-Basisdaten erlaubt`);
    }
  }

  if (!entry.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) {
    throw new Error(`${prefix}: slug fehlt oder ungültig`);
  }

  if (!entry.substanceName.trim()) {
    throw new Error(`${prefix}: substanceName fehlt`);
  }

  if (!entry.metaDescription.trim()) {
    throw new Error(`${prefix}: metaDescription fehlt`);
  }

  if (!entry.typicalIndustries.length) {
    throw new Error(`${prefix}: typicalIndustries leer`);
  }
}

export function validateHazardousSubstanceEntries(
  entries: readonly HazardousSubstanceSeoEntry[] = HAZARDOUS_SUBSTANCE_SEO_ENTRIES,
): void {
  const slugs = new Set<string>();

  entries.forEach((entry, index) => {
    validateEntry(entry, index);
    if (slugs.has(entry.slug)) {
      throw new Error(`Doppelter slug: ${entry.slug}`);
    }
    slugs.add(entry.slug);
  });
}
