'use client';

import type { MouseEventHandler } from 'react';
import { SdbTrustFeatureList } from '@/components/programmatic-seo/SdbTrustFeatureList';
import { LIVE_PREVIEW_COPY } from '@/config/betriebsanweisung/live-preview-copy';

export type BaUnlockCtaTone = 'dark' | 'light';

type Props = {
  label: string;
  /** `dark` = Sidebar (Navy), `light` = Overlay auf dem weißen DIN-A4-Dokument. */
  tone: BaUnlockCtaTone;
  className?: string;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Präsentations-CTA ohne pSEO-Upload-Kontext — Hero der statischen Startseite und Wrapper `BaUnlockCta`.
 */
export function BaUnlockCtaView({ label, tone, className = '', href, onClick }: Props) {
  return (
    <div className={className}>
      <a
        href={href}
        onClick={onClick}
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
