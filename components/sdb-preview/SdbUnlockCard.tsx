'use client';

import { useEffect, useState } from 'react';
import { primaryCtaClass, unlockCardClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { buildUnlockRegisterUrl } from '@/lib/sdb-preview/build-unlock-url';
import { loadSdbPreviewConfig } from '@/lib/sdb-preview/load-config';

type Props = {
  variant: SdbPreviewVariant;
  previewToken: string;
};

export function SdbUnlockCard({ variant, previewToken }: Props) {
  const [href, setHref] = useState('#');

  useEffect(() => {
    loadSdbPreviewConfig().then((cfg) => {
      setHref(
        buildUnlockRegisterUrl({
          previewToken,
          registerBaseUrl: cfg.registerBaseUrl,
        }),
      );
    });
  }, [previewToken]);

  return (
    <div className={unlockCardClass(variant)}>
      <p className={variant === 'static' ? 'sdb-live-preview-unlock__eyebrow' : 'gqr-kicker'}>
        Vorprüfung zur fachlichen Freigabe
      </p>
      <h3 className={variant === 'static' ? 'sdb-live-preview-unlock__title' : 'gqr-section-title mt-2 text-xl sm:text-2xl'}>
        Ihr TRGS-555-Entwurf &amp; Notfall-QR-Code sind vorbereitet
      </h3>
      <p className={variant === 'static' ? 'sdb-live-preview-unlock__text' : 'gqr-section-sub mt-3 text-sm'}>
        Schalten Sie jetzt das vollständige Dokument zur Prüfung durch die SiFa / den Arbeitgeber (§ 14 GefStoffV) frei — ohne Verkaufsgespräch.
      </p>
      <a className={primaryCtaClass(variant)} href={href}>
        Kompletten Entwurf &amp; Kataster-Zugang freischalten
      </a>
      <p className={variant === 'static' ? 'sdb-live-preview-unlock__fine' : 'mt-3 text-xs text-[#8fa4c0]'}>
        KI-gestützter Entwurf (gemäß TRGS 555) — keine automatische Rechtsgültigkeit.
      </p>
    </div>
  );
}
