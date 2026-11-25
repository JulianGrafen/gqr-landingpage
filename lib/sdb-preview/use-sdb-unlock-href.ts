'use client';

import { useEffect, useState } from 'react';
import { buildUnlockRegisterUrl, type UnlockUrlOptions } from '@/lib/sdb-preview/build-unlock-url';
import { withDraftParam } from '@/lib/sdb-preview/create-draft';
import { loadSdbPreviewConfig } from '@/lib/sdb-preview/load-config';

export type SdbUnlockHrefOptions = Omit<UnlockUrlOptions, 'previewToken' | 'registerBaseUrl'> & {
  /** `null` = kein serverseitiger Prefill (z. B. Demo) → `fallbackHref`. */
  previewToken: string | null;
  /** Link ohne Token, solange die Config lädt oder kein Token existiert. */
  fallbackHref: string;
  /** Token aus `POST /api/public/drafts`; wird als `?draft=` an jede Register-URL gehängt. */
  draftToken?: string | null;
};

function hrefFromToken(
  previewToken: string,
  extras: Omit<SdbUnlockHrefOptions, 'previewToken' | 'fallbackHref' | 'draftToken'>,
  registerBaseUrl?: string,
): string {
  return buildUnlockRegisterUrl({
    previewToken,
    registerBaseUrl,
    returnTo: extras.returnTo,
    utmSource: extras.utmSource,
    utmMedium: extras.utmMedium,
    utmCampaign: extras.utmCampaign,
    utmContent: extras.utmContent,
  });
}

/** Register-URL mit `previewToken`; Basis-URL aus `sdb-preview-config.json`. */
export function useSdbUnlockHref({
  previewToken,
  fallbackHref,
  returnTo,
  utmSource,
  utmMedium,
  utmCampaign,
  utmContent,
  draftToken = null,
}: SdbUnlockHrefOptions): string {
  const extras = { returnTo, utmSource, utmMedium, utmCampaign, utmContent };
  const [href, setHref] = useState(() =>
    previewToken ? hrefFromToken(previewToken, extras) : fallbackHref,
  );

  useEffect(() => {
    if (!previewToken) {
      setHref(fallbackHref);
      return;
    }
    setHref(hrefFromToken(previewToken, extras));
    let cancelled = false;
    loadSdbPreviewConfig().then((config) => {
      if (cancelled) return;
      setHref(hrefFromToken(previewToken, extras, config.registerBaseUrl));
    });
    return () => {
      cancelled = true;
    };
  }, [previewToken, fallbackHref, returnTo, utmSource, utmMedium, utmCampaign, utmContent]);

  return withDraftParam(href, draftToken);
}
