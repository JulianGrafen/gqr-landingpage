'use client';

import { useEffect, useState } from 'react';
import { buildUnlockRegisterUrl, type UnlockUrlOptions } from '@/lib/sdb-preview/build-unlock-url';
import { loadSdbPreviewConfig } from '@/lib/sdb-preview/load-config';

export type SdbUnlockHrefOptions = Omit<UnlockUrlOptions, 'previewToken' | 'registerBaseUrl'> & {
  /** `null` = kein serverseitiger Prefill (z. B. Demo) → `fallbackHref`. */
  previewToken: string | null;
  /** Link ohne Token, solange die Config lädt oder kein Token existiert. */
  fallbackHref: string;
};

/** Register-URL mit `previewToken`; Basis-URL aus `sdb-preview-config.json`. */
export function useSdbUnlockHref({
  previewToken,
  fallbackHref,
  returnTo,
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
}: SdbUnlockHrefOptions): string {
  const [href, setHref] = useState(fallbackHref);

  useEffect(() => {
    if (!previewToken) {
      setHref(fallbackHref);
      return;
    }
    let cancelled = false;
    loadSdbPreviewConfig().then((config) => {
      if (cancelled) return;
      setHref(
        buildUnlockRegisterUrl({
          previewToken,
          registerBaseUrl: config.registerBaseUrl,
          returnTo,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
        }),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [previewToken, fallbackHref, returnTo, utmSource, utmMedium, utmCampaign, utmContent]);

  return href;
}
