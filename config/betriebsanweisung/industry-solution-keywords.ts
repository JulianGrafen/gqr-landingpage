import type { IndustrySlug } from '@/config/industry-solutions';

/**
 * Zuordnung freier Branchen-Labels aus `entries.ts` zu den Branchen-Landingpages `/loesungen/{slug}/`.
 * Treffer über Wortstamm (lowercase, Teilstring), damit Varianten wie „Labor & Analytik“ greifen.
 */
export const INDUSTRY_SOLUTION_KEYWORDS: Record<IndustrySlug, readonly string[]> = {
  'kfz-werkstatt': ['kfz', 'fuhrpark'],
  schreinerei: ['schreiner', 'holz'],
  malerbetrieb: ['maler', 'lackier'],
  laborbetrieb: ['labor'],
  reinigungsunternehmen: ['gebäudereinigung', 'facility', 'reinigungsdienst'],
};
