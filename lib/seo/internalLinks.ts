import { isBetriebsanweisungSlug } from '@/config/betriebsanweisung/registry';
import {
  EDITORIAL_SOLUTION_CALLOUTS,
  KFZ_BETRIEBSANWEISUNG_CALLOUTS,
  type SolutionCalloutCopy,
  type SolutionCalloutSlot,
} from '@/config/internal-links/solution-callouts';
import { getIndustry, type IndustrySlug } from '@/config/industry-solutions';
import { buildIndustryPath } from '@/lib/seo/build-industry-seo';

/** Aufgelöster Callout: Copy plus validiertes Linkziel. */
export interface SolutionCallout extends SolutionCalloutCopy {
  href: `/${string}/`;
  targetIndustry: IndustrySlug;
}

function resolveTarget(targetIndustry: IndustrySlug, copy: SolutionCalloutCopy): SolutionCallout {
  const industry = getIndustry(targetIndustry);
  if (!industry) {
    throw new Error(`internalLinks: unbekannte Branche "${targetIndustry}" als Linkziel.`);
  }
  return { ...copy, href: buildIndustryPath(industry), targetIndustry };
}

/** Callout für eine Betriebsanweisungs-Seite (aktuell Kfz-Stoffe), sonst `null`. */
export function getBetriebsanweisungSolutionCallout(slug: string): SolutionCallout | null {
  if (!isBetriebsanweisungSlug(slug)) return null;
  const copy = KFZ_BETRIEBSANWEISUNG_CALLOUTS[slug];
  return copy ? resolveTarget('kfz-werkstatt', copy) : null;
}

/** Callout für redaktionelle Seiten (Blog, Wissen) anhand des kanonischen Pfads. */
export function getEditorialSolutionCallout(
  canonicalPath: string,
  slot: SolutionCalloutSlot,
): SolutionCallout | null {
  const definition = EDITORIAL_SOLUTION_CALLOUTS[canonicalPath];
  const copy = definition?.slots[slot];
  return definition && copy ? resolveTarget(definition.targetIndustry, copy) : null;
}

/** Quellpfade, deren Callouts per Marker in statische HTML-Dateien geschrieben werden. */
export function getStaticHtmlCalloutSourcePaths(): string[] {
  return Object.entries(EDITORIAL_SOLUTION_CALLOUTS)
    .filter(([, definition]) => definition.rendering === 'static-html')
    .map(([sourcePath]) => sourcePath);
}
