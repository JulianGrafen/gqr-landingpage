'use client';

import { GhsPictogramBadge } from '@/components/sdb-preview/GhsPictogramBadge';
import { SdbUnlockCard } from '@/components/sdb-preview/SdbUnlockCard';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { SDB_UNLOCK_RESULT_COPY } from '@/config/sdb-preview/unlock-result-copy';
import {
  buildResultInsightBadges,
  resolveLockedPreviewSections,
  resolveSharpPreviewSections,
} from '@/lib/sdb-preview/build-result-insight-badges';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';

type Props = {
  variant: SdbPreviewVariant;
  teaser: SdbPreviewTeaser;
  sourceLabel?: string | null;
  draftToken?: string | null;
};

export function Trgs555PreviewDocument({ variant, teaser, sourceLabel = null, draftToken = null }: Props) {
  const isStatic = variant === 'static';
  const badges = buildResultInsightBadges(teaser);
  const sharpSections = resolveSharpPreviewSections(teaser);
  const lockedSections = resolveLockedPreviewSections(teaser);

  const docClass = isStatic
    ? 'sdb-live-preview-document'
    : 'relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#162340]/80';

  return (
    <div className={docClass}>
      <header className={isStatic ? 'sdb-live-preview-document__head' : 'border-b border-white/10 px-5 py-4'}>
        <p className={isStatic ? undefined : 'text-xs font-bold uppercase tracking-wider text-[#ff6b35]'}>
          KI-gestützter Entwurf · TRGS 555
        </p>
        <h4 className={isStatic ? 'sdb-live-preview-document__title' : 'mt-1 text-xl font-black text-[#f0f6ff]'}>
          {teaser.tradeName}
        </h4>
        <p className={isStatic ? 'sdb-live-preview-document__manufacturer' : 'line-clamp-2 text-sm text-[#8fa4c0]'}>
          {teaser.manufacturer}
        </p>
        {badges.length > 0 ? (
          <ul className={isStatic ? 'sdb-live-preview-badges' : 'mt-3 flex flex-wrap gap-2'} aria-label="Erkannte Eckdaten">
            {badges.map((badge) => (
              <li
                key={badge.id}
                className={
                  isStatic
                    ? 'sdb-live-preview-badge'
                    : 'rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-[#c8d4e6]'
                }
              >
                {badge.label}
              </li>
            ))}
          </ul>
        ) : null}
        {teaser.ghsPictograms.length > 0 ? (
          <div className={isStatic ? 'sdb-live-preview-document__ghs' : 'mt-3 flex flex-wrap gap-2'}>
            {teaser.ghsPictograms.map((code) => (
              <GhsPictogramBadge key={code} code={code} variant={variant} />
            ))}
          </div>
        ) : null}
      </header>

      <div className={isStatic ? 'sdb-live-preview-document__sections' : 'space-y-0 px-5 py-4'}>
        {sharpSections.map((section) => (
          <section
            key={section.key}
            className={isStatic ? 'sdb-live-preview-section' : 'relative border-t border-white/10 py-4 first:border-t-0'}
            aria-label={section.title}
          >
            <h5 className={isStatic ? undefined : 'text-sm font-bold text-[#f0f6ff]'}>{section.title}</h5>
            <p
              className={
                isStatic
                  ? 'sdb-live-preview-section__body'
                  : 'mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#c8d4e6]'
              }
            >
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <div className={isStatic ? 'sdb-live-preview-locked' : 'relative max-h-[220px] overflow-hidden'}>
        <div className={isStatic ? 'sdb-live-preview-locked__body' : 'pointer-events-none select-none px-5'} aria-hidden="true">
          {lockedSections.map((section) => (
            <section
              key={section.key}
              className={
                isStatic
                  ? 'sdb-live-preview-section sdb-live-preview-section--locked'
                  : 'relative border-t border-white/10 py-4 first:border-t-0'
              }
            >
              <h5 className={isStatic ? undefined : 'text-sm font-bold text-[#f0f6ff]'}>{section.title}</h5>
              <p
                className={
                  isStatic
                    ? 'sdb-live-preview-section__body sdb-live-preview-section__body--blur'
                    : 'mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#c8d4e6] blur-md opacity-80'
                }
              >
                {section.body}
              </p>
              {section.key === 'emergency_qr' && teaser.qrPreviewUrl ? (
                <img
                  src={teaser.qrPreviewUrl}
                  alt=""
                  className={isStatic ? 'sdb-live-preview-qr-blur' : 'mx-auto mt-2 blur-md'}
                  width={120}
                  height={120}
                />
              ) : null}
            </section>
          ))}
        </div>
        <div
          className={
            isStatic
              ? 'sdb-live-preview-locked__fade'
              : 'pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1e35] via-[#0f1e35]/85 to-transparent'
          }
          aria-hidden="true"
        />
        <div className={isStatic ? 'sdb-live-preview-locked__overlay' : 'absolute inset-0 z-10 flex items-center justify-center p-4'}>
          <SdbUnlockCard
            variant={variant}
            previewToken={teaser.previewToken}
            productName={teaser.tradeName}
            sourceLabel={sourceLabel}
            draftToken={draftToken}
          />
        </div>
      </div>

      <p className={isStatic ? 'sdb-live-preview-legal' : 'border-t border-white/10 px-5 py-3 text-center text-[11px] leading-snug text-[#8fa4c0]'}>
        {SDB_UNLOCK_RESULT_COPY.legalLine}
      </p>
    </div>
  );
}
