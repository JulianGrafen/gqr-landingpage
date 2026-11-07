import { INDUSTRY_SOLUTION_KEYWORDS } from '@/config/betriebsanweisung/industry-solution-keywords';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import { getAllIndustries, type IndustrySolution } from '@/config/industry-solutions';

/** Füllwörter, die in Branchen-Labels keine Aussagekraft für Ähnlichkeit haben. */
const STOP_WORDS = new Set(['und', 'oder', 'der', 'die', 'das', 'für', 'von', 'mit', 'im', 'in']);

function industryTokens(industries: readonly string[]): Set<string> {
  const tokens = industries
    .flatMap((label) => label.toLowerCase().split(/[^a-zäöüß0-9]+/))
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
  return new Set(tokens);
}

function sharedTokenCount(a: Set<string>, b: Set<string>): number {
  let count = 0;
  a.forEach((token) => {
    if (b.has(token)) count += 1;
  });
  return count;
}

/**
 * Verwandte Stoffseiten nach Überschneidung der Einsatzbranchen.
 * Gleichstand: alphabetische Nähe zum aktuellen Stoff, damit jede Seite andere Nachbarn verlinkt.
 */
export function findRelatedEntries(
  entry: HazardousSubstanceSeoEntry,
  allEntries: readonly HazardousSubstanceSeoEntry[],
  limit = 6,
): HazardousSubstanceSeoEntry[] {
  const ownTokens = industryTokens(entry.typicalIndustries);
  const ownIndex = allEntries.findIndex((candidate) => candidate.slug === entry.slug);

  return allEntries
    .map((candidate, index) => ({
      candidate,
      score: sharedTokenCount(ownTokens, industryTokens(candidate.typicalIndustries)),
      distance: Math.abs(index - ownIndex),
    }))
    .filter(({ candidate }) => candidate.slug !== entry.slug)
    .sort((a, b) => b.score - a.score || a.distance - b.distance)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/** Branchen-Landingpages, die zu den typischen Einsatzbranchen des Stoffs passen. */
export function findMatchingIndustrySolutions(entry: HazardousSubstanceSeoEntry): IndustrySolution[] {
  const labels = entry.typicalIndustries.map((label) => label.toLowerCase());
  return getAllIndustries().filter((industry) =>
    INDUSTRY_SOLUTION_KEYWORDS[industry.slug].some((keyword) =>
      labels.some((label) => label.includes(keyword)),
    ),
  );
}
