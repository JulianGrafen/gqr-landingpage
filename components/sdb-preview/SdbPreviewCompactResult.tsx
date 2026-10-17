'use client';

import { useState } from 'react';
import { GhsPictogramBadge } from '@/components/sdb-preview/GhsPictogramBadge';
import { SdbUnlockCard } from '@/components/sdb-preview/SdbUnlockCard';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  teaser: SdbPreviewTeaser;
};

export function SdbPreviewCompactResult({ variant, teaser }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const identification = teaser.sections.find((s) => s.key === 'identification');
  const hazardLines = teaser.hazardStatements.slice(0, 3);

  if (variant === 'static') {
    return null;
  }

  return (
    <div className="mt-4 flex max-h-[min(28rem,calc(100vh-11rem))] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#162340]/90 shadow-lg">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#ff6b35]">Extraktion abgeschlossen</p>
        <h4 className="mt-1 text-lg font-black leading-snug text-[#f0f6ff]">{teaser.tradeName}</h4>
        <p className="mt-1 text-xs leading-relaxed text-[#8fa4c0]">{teaser.manufacturer}</p>

        {teaser.signalWord ? (
          <p className="mt-2 text-sm">
            Signalwort:{' '}
            <span className="font-bold text-red-400">{teaser.signalWord}</span>
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="GHS aus SDB">
          {teaser.ghsPictograms.map((code) => (
            <GhsPictogramBadge key={code} code={code} variant="next" />
          ))}
        </div>

        {hazardLines.length > 0 ? (
          <ul className="mt-3 space-y-1 border-t border-white/10 pt-3 text-xs leading-relaxed text-[#c8d4e6]">
            {hazardLines.map((line) => (
              <li key={line} className="list-none">
                {line}
              </li>
            ))}
          </ul>
        ) : null}

        {detailsOpen && identification ? (
          <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-white/10 bg-[#0f1e35]/60 p-3 text-xs text-[#8fa4c0]">
            {identification.body}
          </pre>
        ) : null}

        <button
          type="button"
          className="mt-3 text-xs font-semibold text-teal-300 hover:underline"
          aria-expanded={detailsOpen}
          onClick={() => setDetailsOpen((v) => !v)}
        >
          {detailsOpen ? 'Details ausblenden' : 'Details anzeigen'}
        </button>
      </div>

      <div className="shrink-0 border-t border-white/10 bg-[#0f1e35]/95 p-3">
        <SdbUnlockCard variant={variant} previewToken={teaser.previewToken} compact />
      </div>
    </div>
  );
}
