import type { SubstanceClusterId } from '@/config/betriebsanweisung/substance-clusters';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { buildTeaserFromPrefill } from '@/lib/sdb-preview/map-teaser';
import { sanitizePublicTeaser } from '@/lib/sdb-preview/sanitize-public-teaser';

/** Präfix für clientseitige Demo-Tokens: kein Redis-Prefill, wird nicht an die Registrierung übergeben. */
export const DEMO_PREVIEW_TOKEN_PREFIX = 'demo-';

export interface DemoPreviewTeaserResult {
  sourceLabel: string;
  teaser: SdbPreviewTeaser;
}

/**
 * Lädt die Demo-Daten erst bei Bedarf (eigener Chunk, nie im statischen HTML) und
 * baut daraus denselben öffentlichen Teaser wie bei einem echten Upload.
 */
export async function loadDemoPreviewTeaser(
  slug: string,
  cluster: SubstanceClusterId,
): Promise<DemoPreviewTeaserResult> {
  const { resolveDemoSdbExtraction } = await import('@/config/betriebsanweisung/demo-sdb-extractions');
  const demo = resolveDemoSdbExtraction(slug, cluster);
  const previewToken = `${DEMO_PREVIEW_TOKEN_PREFIX}${slug}`;
  const teaser = buildTeaserFromPrefill({ ...demo.prefill, previewToken }, previewToken);
  return { sourceLabel: demo.sourceLabel, teaser: sanitizePublicTeaser(teaser) };
}
