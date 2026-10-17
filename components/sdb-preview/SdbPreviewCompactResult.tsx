'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { GhsPictogramBadge } from '@/components/sdb-preview/GhsPictogramBadge';
import { GHS_ASSETS, normalizeGhsCode } from '@/lib/ghs/ghs-assets';
import { SdbUnlockCard } from '@/components/sdb-preview/SdbUnlockCard';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  teaser: SdbPreviewTeaser;
  embedded?: boolean;
};

/** Filter blur on content (not backdrop-blur); strength aligned with teaser sections. */
const TEASER_DATA_BLUR_CLASS =
  'pointer-events-none select-none opacity-40 blur-[5px] [transform:translateZ(0)]';

export function SdbPreviewCompactResult({ variant, teaser, embedded = false }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const identification = teaser.sections.find((s) => s.key === 'identification');
  const hazardLines = teaser.hazardStatements.slice(0, embedded ? 1 : 3);
  const teaserLocked = variant === 'next';

  if (variant === 'static') {
    return null;
  }

  const extractedBody = (
    <>
      <h4 className={`font-black leading-snug text-[#f0f6ff] ${embedded ? 'text-base' : 'text-lg'}`}>
        {teaser.tradeName}
      </h4>
      {!embedded ? (
        <p className="mt-1 text-xs leading-relaxed text-[#8fa4c0]">{teaser.manufacturer}</p>
      ) : null}

      {teaser.signalWord ? (
        <p className="mt-2 text-sm">
          Signalwort:{' '}
          <span className="font-bold text-red-400">{teaser.signalWord}</span>
        </p>
      ) : null}

      {embedded ? (
        <div className="mt-2 flex items-center justify-center gap-2">
          {teaser.ghsPictograms.map((code) => {
            const normalized = normalizeGhsCode(code) ?? code.toUpperCase();
            const asset = GHS_ASSETS[normalized as keyof typeof GHS_ASSETS];
            if (!asset) return null;
            return (
              <img
                key={code}
                src={asset.src}
                alt=""
                width={36}
                height={36}
                className="rounded-sm"
                loading="lazy"
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {teaser.ghsPictograms.map((code) => (
            <GhsPictogramBadge key={code} code={code} variant="next" />
          ))}
        </div>
      )}

      {hazardLines.length > 0 ? (
        embedded ? (
          <p className="mt-2 line-clamp-2 border-t border-white/10 pt-2 text-xs leading-snug text-[#c8d4e6]">
            {hazardLines[0]}
          </p>
        ) : (
          <ul className="mt-3 space-y-1 border-t border-white/10 pt-3 text-xs leading-relaxed text-[#c8d4e6]">
            {hazardLines.map((line) => (
              <li key={line} className="list-none">
                {line}
              </li>
            ))}
          </ul>
        )
      ) : null}

      {!embedded && detailsOpen && identification ? (
        <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-white/10 bg-[#0f1e35]/60 p-3 text-xs text-[#8fa4c0]">
          {identification.body}
        </pre>
      ) : null}

      {!embedded && !teaserLocked ? (
        <button
          type="button"
          className="mt-3 text-xs font-semibold text-teal-300 hover:underline"
          aria-expanded={detailsOpen}
          onClick={() => setDetailsOpen((v) => !v)}
        >
          {detailsOpen ? 'Details ausblenden' : 'Details anzeigen'}
        </button>
      ) : null}
    </>
  );

  return (
    <div
      data-sdb-compact-result={embedded ? 'embedded' : 'default'}
      className={
        embedded
          ? 'flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#162340]/90 shadow-lg'
          : 'mt-4 flex max-h-[min(28rem,calc(100vh-11rem))] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#162340]/90 shadow-lg'
      }
    >
      <div className={embedded ? 'px-3 py-3' : 'flex-1 overflow-y-auto px-4 py-4'}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#ff6b35]">Extraktion abgeschlossen</p>

        {teaserLocked ? (
          <div
            className={`relative overflow-hidden rounded-lg ${embedded ? 'mt-1.5 min-h-[6.25rem]' : 'mt-2 min-h-[7.5rem]'}`}
          >
            <div className={TEASER_DATA_BLUR_CLASS} aria-hidden="true">
              {extractedBody}
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[#0f1e35]/20 px-3 py-2">
              <p className="flex max-w-[14rem] items-center justify-center gap-1.5 rounded-full border border-white/15 bg-[#0f1e35]/95 px-3 py-1.5 text-center text-[10px] font-semibold leading-snug text-teal-300 shadow-lg">
                <Lock className="h-3 w-3 shrink-0" strokeWidth={2.5} aria-hidden />
                Vollständige Auswertung in der App
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-1">{extractedBody}</div>
        )}
      </div>

      <div className={`shrink-0 border-t border-white/10 bg-[#0f1e35]/95 ${embedded ? 'p-2.5' : 'p-3'}`}>
        <SdbUnlockCard variant={variant} previewToken={teaser.previewToken} compact />
      </div>
    </div>
  );
}
