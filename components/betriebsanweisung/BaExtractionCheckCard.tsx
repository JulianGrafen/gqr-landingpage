'use client';

import { BaUnlockCta } from '@/components/betriebsanweisung/BaUnlockCta';
import { GhsPictogramBadge } from '@/components/sdb-preview/GhsPictogramBadge';
import { LIVE_PREVIEW_COPY, formatStatementCounts } from '@/config/betriebsanweisung/live-preview-copy';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';

const copy = LIVE_PREVIEW_COPY.checkCard;

type Props = {
  teaser: SdbPreviewTeaser;
  isDemo: boolean;
  onTestAnotherPdf: () => void;
};

/** Rechte Spalte nach erfolgreicher Extraktion: erkannte Kerndaten + Freischalt-CTA (Dokument steht links). */
export function BaExtractionCheckCard({ teaser, isDemo, onTestAnotherPdf }: Props) {
  const hazardCount = teaser.statementCounts?.hazard ?? teaser.hazardStatements.length;
  const precautionaryCount =
    teaser.statementCounts?.precautionary ?? teaser.precautionaryStatements?.length ?? null;

  const summaryRows = [
    { label: copy.substance, value: teaser.tradeName },
    { label: copy.manufacturer, value: teaser.manufacturer },
    { label: copy.statementCounts, value: formatStatementCounts(hazardCount, precautionaryCount) },
  ];

  return (
    <div className="rounded-xl border border-teal-400/30 bg-[#0f1e35]/70 p-4 shadow-inner shadow-black/20" data-ba-check-card>
      <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-teal-300">
        ✓ {isDemo ? copy.demoKicker : copy.kicker}
      </p>

      <dl className="m-0 mt-3 space-y-2 text-sm">
        {summaryRows.map(({ label, value }) => (
          <div key={label} className="flex items-baseline justify-between gap-3 border-b border-white/[0.07] pb-2">
            <dt className="shrink-0 text-xs text-[#8fa4c0]">{label}</dt>
            <dd className="m-0 truncate text-right font-semibold text-[#f0f6ff]" title={value}>
              {value}
            </dd>
          </div>
        ))}
        <div>
          <dt className="text-xs text-[#8fa4c0]">{copy.pictograms}</dt>
          <dd className="m-0 mt-2 flex flex-wrap gap-2">
            {teaser.ghsPictograms.length > 0 ? (
              teaser.ghsPictograms.map((code) => <GhsPictogramBadge key={code} code={code} variant="next" />)
            ) : (
              <span className="text-sm text-[#8fa4c0]">{copy.noPictograms}</span>
            )}
          </dd>
        </div>
      </dl>

      <BaUnlockCta label={copy.primaryCta} tone="dark" className="mt-4" />

      <button
        type="button"
        onClick={onTestAnotherPdf}
        className="mt-3 w-full border-0 bg-transparent p-0 text-center text-sm font-semibold text-teal-300 underline-offset-2 hover:underline"
      >
        {copy.secondaryCta}
      </button>
      <p className="m-0 mt-3 text-[11px] leading-snug text-[#8fa4c0]">{copy.reviewHint}</p>
    </div>
  );
}
