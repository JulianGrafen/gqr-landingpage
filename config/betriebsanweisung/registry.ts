import {
  HAZARDOUS_SUBSTANCE_SEO_ENTRIES,
  HAZARDOUS_SUBSTANCE_SLUGS,
} from '@/config/betriebsanweisung/entries';
import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

export function getAllBetriebsanweisungEntries(): HazardousSubstanceSeoEntry[] {
  return [...HAZARDOUS_SUBSTANCE_SEO_ENTRIES];
}

export function isBetriebsanweisungSlug(slug: string): slug is HazardousSubstanceSlug {
  return (HAZARDOUS_SUBSTANCE_SLUGS as readonly string[]).includes(slug);
}

export function getBetriebsanweisungEntry(slug: string): HazardousSubstanceSeoEntry | undefined {
  return isBetriebsanweisungSlug(slug)
    ? HAZARDOUS_SUBSTANCE_SEO_ENTRIES.find((entry) => entry.slug === slug)
    : undefined;
}

export function formatCasDisplay(casNumber: HazardousSubstanceSeoEntry['casNumber']): string {
  if (casNumber.kind === 'substance') return casNumber.value;
  if (casNumber.mainComponentCas) {
    return `${casNumber.label} (Referenz-CAS ${casNumber.mainComponentCas})`;
  }
  return casNumber.label;
}
