'use client';

import { useCallback } from 'react';
import { trackFunnelEvent } from '@/lib/analytics/funnel';
import { handOffPreviewTokenToRegistration } from '@/lib/sdb-preview/preview-handoff';
import { useSdbUnlockHref, type SdbUnlockHrefOptions } from '@/lib/sdb-preview/use-sdb-unlock-href';

export type RegisterCtaOptions = SdbUnlockHrefOptions & {
  /** Position des CTAs im Ergebnis (Funnel-Auswertung), z. B. `hero-ba-overlay`. */
  placement: string;
};

export type RegisterCtaProps = {
  href: string;
  onClick: () => void;
};

/**
 * Gemeinsame Logik aller Register-/Freischalt-CTAs im Live-Ergebnis:
 * Register-URL inkl. `previewToken` und `?draft=`, Token-Handoff und `overlay_cta_click`.
 */
export function useRegisterCta({ placement, ...hrefOptions }: RegisterCtaOptions): RegisterCtaProps {
  const href = useSdbUnlockHref(hrefOptions);
  const { previewToken, draftToken } = hrefOptions;

  const onClick = useCallback(() => {
    trackFunnelEvent('overlay_cta_click', { placement, hasDraft: Boolean(draftToken) });
    if (previewToken) handOffPreviewTokenToRegistration(previewToken);
  }, [placement, previewToken, draftToken]);

  return { href, onClick };
}
