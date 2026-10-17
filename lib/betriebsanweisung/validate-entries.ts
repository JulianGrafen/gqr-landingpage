import { BETRIEBSANWEISUNG_EXPERT_EXTENSIONS } from '@/config/betriebsanweisung/expert-extensions';
import { HAZARDOUS_SUBSTANCE_SEO_ENTRIES } from '@/config/betriebsanweisung/entries';
import type {
  GhsPictogramCode,
  HStatementCode,
  HazardousSubstanceSeoEntry,
} from '@/config/betriebsanweisung/types';

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

const H_CODE_PATTERN = /^(H\d{3}|EUH\d{3})$/;

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

function assertHCode(code: string): asserts code is HStatementCode {
  if (!H_CODE_PATTERN.test(code)) {
    throw new Error(`Ungültiger H-/EUH-Code: ${code}`);
  }
}

function validateEntry(entry: HazardousSubstanceSeoEntry, index: number): void {
  const prefix = `Eintrag #${index + 1} (${entry.slug || 'ohne slug'})`;

  if (!entry.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) {
    throw new Error(`${prefix}: slug fehlt oder ungültig`);
  }

  if (!entry.substanceName.trim()) {
    throw new Error(`${prefix}: substanceName fehlt`);
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

  if (!entry.typicalHStatements.length) {
    throw new Error(`${prefix}: typicalHStatements leer`);
  }
  for (const h of entry.typicalHStatements) {
    assertHCode(h.code);
    if (!h.text.trim()) {
      throw new Error(`${prefix}: H-Text leer für ${h.code}`);
    }
  }

  if (!entry.typicalIndustries.length) {
    throw new Error(`${prefix}: typicalIndustries leer`);
  }

  if (!entry.specificPpeAdvice.trim() || !entry.typicalPpeMistake.trim()) {
    throw new Error(`${prefix}: PSA-Felder fehlen`);
  }

  if (!entry.storageClassTrgs510.trim()) {
    throw new Error(`${prefix}: storageClassTrgs510 fehlt`);
  }

  if (!entry.classificationBasis.trim()) {
    throw new Error(`${prefix}: classificationBasis fehlt`);
  }

  if (!entry.documentDisplayName.trim()) {
    throw new Error(`${prefix}: documentDisplayName fehlt`);
  }

  if (!entry.applicationAreaWorkplace.trim()) {
    throw new Error(`${prefix}: applicationAreaWorkplace fehlt`);
  }

  if (!entry.trgs510Storage.zusammenlagerungsverbote.length) {
    throw new Error(`${prefix}: trgs510Storage.zusammenlagerungsverbote leer`);
  }

  if (!entry.trgs510Storage.safetyCabinetNotes.trim()) {
    throw new Error(`${prefix}: safetyCabinetNotes fehlt`);
  }

  if (!Array.isArray(entry.faqItems) || entry.faqItems.length !== 3) {
    throw new Error(`${prefix}: faqItems muss exakt 3 Einträge haben`);
  }
  for (const [i, faq] of entry.faqItems.entries()) {
    if (!faq.question.trim() || !faq.answer.trim()) {
      throw new Error(`${prefix}: FAQ ${i + 1} unvollständig`);
    }
  }
}

export function validateHazardousSubstanceEntries(
  entries: readonly HazardousSubstanceSeoEntry[] = HAZARDOUS_SUBSTANCE_SEO_ENTRIES,
): void {
  const slugs = new Set<string>();
  const expertSlugs = new Set(Object.keys(BETRIEBSANWEISUNG_EXPERT_EXTENSIONS));

  entries.forEach((entry, index) => {
    if (!expertSlugs.has(entry.slug)) {
      throw new Error(`Kein Expert-Extension-Eintrag für slug: ${entry.slug}`);
    }
    validateEntry(entry, index);
    if (slugs.has(entry.slug)) {
      throw new Error(`Doppelter slug: ${entry.slug}`);
    }
    slugs.add(entry.slug);
  });
}
