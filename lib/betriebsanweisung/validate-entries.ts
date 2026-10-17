import { HAZARDOUS_SUBSTANCE_SEO_ENTRIES } from '@/config/betriebsanweisung/entries';
import type { GhsPictogramCode, HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

const GHS_CODES = new Set<GhsPictogramCode>([
  'GHS01',
  'GHS02',
  'GHS03',
  'GHS04',
  'GHS05',
  'GHS06',
  'GHS07',
  'GHS08',
  'GHS09',
]);

/** Verbotene Schlüssel — dürfen in Nightly-Batches nicht mehr gesetzt werden. */
const FORBIDDEN_ENTRY_KEYS = [
  'specificPpeAdvice',
  'typicalPpeMistake',
  'storageClassTrgs510',
  'trgs510Storage',
  'typicalHStatements',
  'classificationBasis',
  'chemicalFormula',
  'ecNumber',
  'flashPoint',
  'ignitionTemperature',
  'agwTrgs900',
  'faqItems',
] as const;

export function isValidCasChecksum(casNumber: string): boolean {
  const normalized = casNumber.replace(/\s/g, '');
  if (!/^\d{2,7}-\d{2}-\d$/.test(normalized)) return false;
  const digitsOnly = normalized.replace(/-/g, '');
  const checkDigit = Number(digitsOnly.slice(-1));
  const body = digitsOnly.slice(0, -1);
  let sum = 0;
  for (let i = 0; i < body.length; i += 1) {
    sum += Number(body[body.length - 1 - i]) * (i + 1);
  }
  return sum % 10 === checkDigit;
}

function validateEntry(entry: HazardousSubstanceSeoEntry, index: number): void {
  const prefix = `Eintrag #${index + 1} (${entry.slug || 'ohne slug'})`;
  const raw = entry as unknown as Record<string, unknown>;

  for (const key of FORBIDDEN_ENTRY_KEYS) {
    if (key in raw && raw[key] !== undefined) {
      throw new Error(`${prefix}: verbotenes Feld "${key}" — nur öffentliche Identifikationsdaten erlaubt`);
    }
  }

  if (!entry.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) {
    throw new Error(`${prefix}: slug fehlt oder ungültig`);
  }

  if (!entry.substanceName.trim()) {
    throw new Error(`${prefix}: substanceName fehlt`);
  }

  if (!entry.documentDisplayName.trim()) {
    throw new Error(`${prefix}: documentDisplayName fehlt`);
  }

  if (!Array.isArray(entry.synonyms) || entry.synonyms.length === 0) {
    throw new Error(`${prefix}: synonyms muss mindestens ein Element haben`);
  }

  if (entry.casNumber.kind === 'substance') {
    if (!isValidCasChecksum(entry.casNumber.value)) {
      throw new Error(`${prefix}: CAS ungültig (${entry.casNumber.value})`);
    }
  } else {
    if (!entry.casNumber.label.trim()) {
      throw new Error(`${prefix}: Gemisch-Label fehlt`);
    }
    if (entry.casNumber.mainComponentCas && !isValidCasChecksum(entry.casNumber.mainComponentCas)) {
      throw new Error(`${prefix}: mainComponentCas ungültig (${entry.casNumber.mainComponentCas})`);
    }
  }

  if (!entry.applicationAreaWorkplace.trim()) {
    throw new Error(`${prefix}: applicationAreaWorkplace fehlt`);
  }

  if (!entry.ghsPictograms.length) {
    throw new Error(`${prefix}: mindestens ein GHS-Piktogramm erforderlich`);
  }
  for (const code of entry.ghsPictograms) {
    if (!GHS_CODES.has(code)) {
      throw new Error(`${prefix}: unbekanntes GHS (${code})`);
    }
  }

  if (entry.signalWord !== 'Gefahr' && entry.signalWord !== 'Achtung') {
    throw new Error(`${prefix}: signalWord ungültig`);
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
