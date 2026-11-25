'use client';

import { BaLiveExtractedDocument } from '@/components/betriebsanweisung/BaLiveExtractedDocument';
import { BaUnlockCtaView } from '@/components/betriebsanweisung/BaUnlockCtaView';
import { LIVE_PREVIEW_COPY } from '@/config/betriebsanweisung/live-preview-copy';
import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';
import { formatApplicationAreaField } from '@/lib/betriebsanweisung/format-workplace-context';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { useRegisterCta } from '@/lib/sdb-preview/use-register-cta';
import { hasTransferablePreviewToken, type SdbPreviewSource } from '@/lib/sdb-preview/useSdbPreview';

const HERO_REGISTER_FALLBACK = 'https://app.gefahrstoff-qr.de/register';
const HERO_APPLICATION_AREA = formatApplicationAreaField(['Werkstatt', 'Produktion', 'Labor']);

type ReadyProps = {
  teaser: SdbPreviewTeaser;
  source: SdbPreviewSource | null;
  draftToken: string | null;
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

function HeroBaUnlockCta({ previewToken, draftToken }: { previewToken: string | null; draftToken: string | null }) {
  const cta = useRegisterCta({
    previewToken,
    draftToken,
    fallbackHref: HERO_REGISTER_FALLBACK,
    returnTo: '/',
    utmSource: 'landing',
    utmMedium: 'hero',
    utmCampaign: 'sdb-live-preview',
    utmContent: 'hero-ba-vorschau',
    placement: 'hero-ba-overlay',
  });

  return (
    <BaUnlockCtaView
      label={LIVE_PREVIEW_COPY.lockedOverlay.cta}
      tone="light"
      className="mt-3"
      href={cta.href}
      onClick={cta.onClick}
    />
  );
}

/**
 * Nach SDB-Scan: Live-BA mit echten GHS-Piktogrammen aus der Extraktion.
 */
export function HeroBaLivePreview({ teaser, source, draftToken }: ReadyProps) {
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
        unlockCta={<HeroBaUnlockCta previewToken={previewToken} draftToken={draftToken} />}
      />
    </div>
  );
}
