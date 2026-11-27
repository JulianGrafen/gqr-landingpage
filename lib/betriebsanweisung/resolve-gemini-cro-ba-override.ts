import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';
import {
  GEMINI_CRO_BA_OVERRIDES,
  type GeminiCroBetriebsanweisungOverride,
} from '@/config/seo/gemini-cro-2026-11-24';
import {
  GEMINI_CRO_BA_OVERRIDES_2026_11_27,
  type GeminiCroBetriebsanweisungPageOverride,
} from '@/config/seo/gemini-cro-2026-11-27';
import { fitTitle } from '@/lib/seo/buildMetadata';

export type ResolvedBetriebsanweisungGeminiCroOverride = GeminiCroBetriebsanweisungOverride &
  GeminiCroBetriebsanweisungPageOverride;

export function getBetriebsanweisungGeminiCroOverride(
  slug: HazardousSubstanceSlug,
): ResolvedBetriebsanweisungGeminiCroOverride | undefined {
  const legacy = GEMINI_CRO_BA_OVERRIDES[slug];
  const page = GEMINI_CRO_BA_OVERRIDES_2026_11_27[slug];
  if (!legacy && !page) return undefined;
  return { ...legacy, ...page } as ResolvedBetriebsanweisungGeminiCroOverride;
}

export function resolveBetriebsanweisungGeminiCroTitle(
  slug: HazardousSubstanceSeoEntry['slug'] | HazardousSubstanceSlug,
): string | undefined {
  const override = GEMINI_CRO_BA_OVERRIDES_2026_11_27[slug as HazardousSubstanceSlug];
  if (!override?.titleCandidates?.length) return undefined;
  return fitTitle(override.titleCandidates);
}