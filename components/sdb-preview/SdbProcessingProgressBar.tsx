'use client';

import {
  EXTRACTION_WORK_STAGES,
  extractionStageIndex,
  type ExtractionProgressSnapshot,
} from '@/lib/sdb-preview/extraction-progress';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  progress: ExtractionProgressSnapshot;
  /** Sidebar: nur Label + Balken, ohne Schrittliste. */
  compact?: boolean;
  /** Clientseitig erkannter Produktname (Abschnitt 1) während die API läuft. */
  earlyHint?: string | null;
};

export function SdbProcessingProgressBar({ variant, progress, compact = false, earlyHint = null }: Props) {
  const percent = Math.min(100, Math.max(0, progress.percent));
  const activeIndex = extractionStageIndex(progress.stageId);
  const isComplete = progress.stageId === 'complete';

  const boxClass =
    variant === 'static'
      ? 'sdb-live-preview-processing'
      : compact
        ? 'rounded-xl border border-[#ff6b35]/25 bg-[#0f1e35]/80 px-3 py-3'
        : 'mt-4 rounded-xl border border-[#ff6b35]/25 bg-[#0f1e35]/80 px-4 py-4';

  return (
    <div className={boxClass} aria-live="polite" aria-busy={!isComplete}>
      <div className="flex items-start justify-between gap-3 text-xs font-semibold text-[#8fa4c0]">
        <span className="text-teal-300">{progress.label}</span>
        <span className="shrink-0 tabular-nums">{percent}%</span>
      </div>
      {earlyHint ? (
        <p className="mt-2 truncate text-sm font-semibold text-[#f0f6ff]" title={earlyHint}>
          Erkannt: {earlyHint}
        </p>
      ) : null}
      <div
        className={
          variant === 'static'
            ? 'sdb-live-preview-progress-track'
            : 'mt-2 h-2 overflow-hidden rounded-full bg-white/10'
        }
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={progress.label}
      >
        <div
          className={
            variant === 'static'
              ? 'sdb-live-preview-progress-fill'
              : `h-full rounded-full bg-gradient-to-r from-teal-400 to-[#ff6b35] transition-[width] ease-out ${
                  isComplete ? 'duration-200' : 'duration-300'
                }`
          }
          style={{ width: `${percent}%` }}
        />
      </div>
      {compact ? null : (
        <ol
          className={
            variant === 'static'
              ? 'sdb-live-preview-steps'
              : 'mt-3 flex flex-col gap-1 text-xs text-[#8fa4c0]'
          }
        >
          {EXTRACTION_WORK_STAGES.map((stage, index) => (
            <li
              key={stage.id}
              className={
                index <= activeIndex
                  ? variant === 'static'
                    ? 'is-done'
                    : 'font-medium text-[#f0f6ff]'
                  : variant === 'static'
                    ? undefined
                    : 'opacity-70'
              }
            >
              {stage.label}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
