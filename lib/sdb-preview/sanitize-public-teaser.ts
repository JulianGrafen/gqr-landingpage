import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';

const PLACEHOLDER = 'Nach Freischaltung in der App verfügbar.';

/** Entfernt BA-/PSA-Detail aus dem Client-State (öffentliche Landing). */
export function sanitizePublicTeaser(teaser: SdbPreviewTeaser): SdbPreviewTeaser {
  return {
    ...teaser,
    hazardStatements: teaser.hazardStatements.slice(0, 2),
    sections: teaser.sections.map((section) => ({
      ...section,
      unlocked: false,
      body: PLACEHOLDER,
    })),
  };
}
