/** Genau drei FAQs (Programmatic SEO + JSON-LD) — werden im Template generiert. */
export type SubstanceFaqTuple = [
  { question: string; answer: string },
  { question: string; answer: string },
  { question: string; answer: string },
];

/**
 * Öffentliche Stoffdaten für Betriebsanweisungs-Landingpages.
 * Keine CAS, GHS, H/P oder andere konkrete Gefahrstoffangaben im Web.
 */
export interface HazardousSubstanceSeoEntry {
  slug: string;
  substanceName: string;
  /** Kurzbeschreibung für Meta-Tags (title/description/OG). */
  metaDescription: string;
  typicalIndustries: string[];
}
