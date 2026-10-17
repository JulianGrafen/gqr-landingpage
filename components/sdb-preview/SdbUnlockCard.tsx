'use client';

import { useEffect, useState } from 'react';
import { primaryCtaClass, unlockCardClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { buildUnlockRegisterUrl } from '@/lib/sdb-preview/build-unlock-url';
import { loadSdbPreviewConfig } from '@/lib/sdb-preview/load-config';

type Props = {
  variant: SdbPreviewVariant;
  previewToken: string;
  compact?: boolean;
};

export function SdbUnlockCard({ variant, previewToken, compact = false }: Props) {
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

  if (compact && variant === 'next') {
    return (
      <div className="text-center">
        <p className="text-[10px] leading-snug text-[#8fa4c0]">
          KI-gestützter Entwurf — Vorprüfung zur fachlichen Freigabe durch SiFa / Arbeitgeber
        </p>
        <a
          className="gqr-cta-primary gqr-cta-primary--md mt-2 inline-flex w-full justify-center py-2.5 text-sm no-underline"
          href={href}
        >
          Kompletten Entwurf freischalten
        </a>
      </div>
    );
  }

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
