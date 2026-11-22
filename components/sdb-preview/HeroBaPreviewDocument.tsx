'use client';

import { BaLiveExtractedDocument } from '@/components/betriebsanweisung/BaLiveExtractedDocument';
import { BaSampleLockedDocument } from '@/components/betriebsanweisung/BaSampleLockedDocument';
import { BaUnlockCtaView } from '@/components/betriebsanweisung/BaUnlockCtaView';
import { LIVE_PREVIEW_COPY } from '@/config/betriebsanweisung/live-preview-copy';
import { SAMPLE_PREVIEW_COPY } from '@/config/betriebsanweisung/sample-preview';
import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';
import { formatApplicationAreaField } from '@/lib/betriebsanweisung/format-workplace-context';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { handOffPreviewTokenToRegistration } from '@/lib/sdb-preview/preview-handoff';
import { useSdbUnlockHref } from '@/lib/sdb-preview/use-sdb-unlock-href';
import { hasTransferablePreviewToken, type SdbPreviewSource } from '@/lib/sdb-preview/useSdbPreview';

const HERO_REGISTER_FALLBACK = 'https://app.gefahrstoff-qr.de/register';

const HERO_SAMPLE_SUBSTANCE = 'Ihr Gefahrstoff';
const HERO_APPLICATION_AREA = formatApplicationAreaField(['Werkstatt', 'Produktion', 'Labor']);

type IdleProps = {
  onRequestUpload: () => void;
};

type ReadyProps = {
  teaser: SdbPreviewTeaser;
  source: SdbPreviewSource | null;
};

function describeSource(source: SdbPreviewSource | null): string {
  if (!source) return 'Ihrem Sicherheitsdatenblatt';
  switch (source.kind) {
    case 'upload':
      return source.fileName;
    case 'demo':
      return source.label;
    case 'example':
      return `Beispiel-SDB ${SDB_PREVIEW_EXAMPLES.find((example) => example.id === source.exampleId)?.label ?? source.exampleId}`;
  }
}

/**
 * Idle-Zustand im Hero: dieselbe HTML-Muster-BA wie auf den pSEO-Slug-Seiten.
 */
export function HeroBaSamplePreview({ onRequestUpload }: IdleProps) {
  return (
    <div className="sdb-hero-ba-preview overflow-hidden rounded-2xl border border-white/[0.12] bg-white shadow-2xl shadow-black/30">
      <p className="relative z-20 m-0 border-0 border-b border-amber-200/40 bg-amber-50 px-5 py-2 text-[11px] font-semibold leading-snug text-amber-950">
        {SAMPLE_PREVIEW_COPY.sampleBadge}
      </p>
      <BaSampleLockedDocument
        substanceName={HERO_SAMPLE_SUBSTANCE}
        applicationArea={HERO_APPLICATION_AREA}
        overlay={
          <div
            className="flex h-full cursor-pointer items-center justify-center p-4 sm:p-6"
            role="presentation"
            onClick={onRequestUpload}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onRequestUpload();
              }
            }}
          >
            <div
              className="max-w-sm cursor-default rounded-xl border border-slate-200/80 bg-white/95 p-5 text-center shadow-lg"
              role="dialog"
              aria-modal="false"
              aria-label={SAMPLE_PREVIEW_COPY.lockedOverlayTitle}
              onClick={(event) => event.stopPropagation()}
            >
              <p className="m-0 text-base font-bold leading-snug text-slate-900">
                {SAMPLE_PREVIEW_COPY.lockedOverlayTitle}
              </p>
              <button type="button" onClick={onRequestUpload} className="ba-teaser-overlay-cta mt-4">
                Eigenes SDB-PDF auswählen →
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}

function HeroBaUnlockCta({ previewToken }: { previewToken: string | null }) {
  const href = useSdbUnlockHref({
    previewToken,
    fallbackHref: HERO_REGISTER_FALLBACK,
    returnTo: '/',
    utmSource: 'landing',
    utmMedium: 'hero',
    utmCampaign: 'sdb-live-preview',
    utmContent: 'hero-ba-vorschau',
  });

  return (
    <BaUnlockCtaView
      label={LIVE_PREVIEW_COPY.lockedOverlay.cta}
      tone="light"
      className="mt-3"
      href={href}
      onClick={previewToken ? () => handOffPreviewTokenToRegistration(previewToken) : undefined}
    />
  );
}

/**
 * Nach SDB-Scan: Live-BA mit echten GHS-Piktogrammen aus der Extraktion.
 */
export function HeroBaLivePreview({ teaser, source }: ReadyProps) {
  const previewToken = hasTransferablePreviewToken(source) ? teaser.previewToken : null;

  return (
    <div className="sdb-hero-ba-preview overflow-hidden rounded-2xl border border-white/[0.12] bg-white shadow-2xl shadow-black/30">
      <p className="relative z-20 m-0 flex items-center gap-1.5 truncate border-0 border-b border-teal-200 bg-teal-50 px-5 py-2 text-[11px] font-semibold leading-snug text-teal-900">
        {LIVE_PREVIEW_COPY.sourceBadgePrefix}{' '}
        <span className="truncate font-bold">{describeSource(source)}</span>
      </p>
      <BaLiveExtractedDocument
        teaser={teaser}
        applicationArea={HERO_APPLICATION_AREA}
        isDemo={source?.kind === 'example' || source?.kind === 'demo'}
        unlockCta={<HeroBaUnlockCta previewToken={previewToken} />}
      />
    </div>
  );
}
