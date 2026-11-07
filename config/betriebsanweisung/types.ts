import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

/** FAQs pro Stoffseite (UI + FAQPage JSON-LD), generiert im Template. Ohne stoffspezifische Gefahrendaten. */
export type SubstanceFaqItems = readonly SeoFaqItem[];

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
