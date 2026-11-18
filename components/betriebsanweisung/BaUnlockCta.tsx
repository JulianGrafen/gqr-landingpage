'use client';

import { useBetriebsanweisungSdbUpload } from '@/components/betriebsanweisung/betriebsanweisung-sdb-upload-context';
import { SdbTrustFeatureList } from '@/components/programmatic-seo/SdbTrustFeatureList';
import { LIVE_PREVIEW_COPY } from '@/config/betriebsanweisung/live-preview-copy';

type Props = {
  label: string;
  /** `dark` = Sidebar (Navy), `light` = Overlay auf dem weißen DIN-A4-Dokument. */
  tone: 'dark' | 'light';
  className?: string;
};

/**
 * Freischalt-CTA mit Micro-Trust-Bullets. Href und Token-Übergabe kommen aus dem gemeinsamen
 * Vorschau-Kontext, damit alle CTAs dieselbe Registrierungs-URL nutzen.
 */
export function BaUnlockCta({ label, tone, className = '' }: Props) {
  const { unlockHref, handOffToRegistration } = useBetriebsanweisungSdbUpload();

  return (
    <div className={className}>
      <a
        href={unlockHref}
        onClick={handOffToRegistration}
        className={
          tone === 'light'
            ? 'ba-teaser-overlay-cta text-center no-underline'
            : 'gqr-cta-primary gqr-cta-primary--md inline-flex w-full justify-center text-center no-underline'
        }
      >
        {label}
      </a>
      <SdbTrustFeatureList className="mt-3 text-left" tone={tone} items={LIVE_PREVIEW_COPY.trustBullets} />
    </div>
  );
}
