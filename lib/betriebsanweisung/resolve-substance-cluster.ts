import {
  GENERAL_CLUSTER_SLUG_TERMS,
  INDUSTRY_MATCH_ORDER,
  SLUG_MATCH_ORDER,
  SUBSTANCE_CLUSTER_MATCHERS,
  type SubstanceClusterId,
} from '@/config/betriebsanweisung/substance-clusters';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

type ClusterInput = Pick<HazardousSubstanceSeoEntry, 'slug' | 'typicalIndustries'>;

/** Ordnet einen Stoff deterministisch einem Branchen-Cluster zu (Fallback: `general`). */
export function resolveSubstanceCluster(entry: ClusterInput): SubstanceClusterId {
  const slug = entry.slug.toLowerCase();
  const industries = entry.typicalIndustries.map((industry) => industry.toLowerCase());

  if (GENERAL_CLUSTER_SLUG_TERMS.some((term) => slug.includes(term))) return 'general';

  const bySlug = SLUG_MATCH_ORDER.find((id) =>
    SUBSTANCE_CLUSTER_MATCHERS[id].slugTerms.some((term) => slug.includes(term)),
  );
  if (bySlug) return bySlug;

  const byIndustry = INDUSTRY_MATCH_ORDER.find((id) =>
    SUBSTANCE_CLUSTER_MATCHERS[id].industryTerms.some((term) => industries.some((industry) => industry.includes(term))),
  );
  return byIndustry ?? 'general';
}
