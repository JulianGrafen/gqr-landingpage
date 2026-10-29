'use client';

import { PROCESSING_STEP_LABELS } from '@/lib/sdb-preview/api-contract';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  activeIndex: number;
  label: string;
  /** 0–100; when omitted, bar animates indeterminately between steps. */
  progressPercent?: number;
  /** Sidebar: nur Label + Balken, ohne Schrittliste. */
  compact?: boolean;
  /** Clientseitig erkannter Produktname (Abschnitt 1) während die API läuft. */
  earlyHint?: string | null;
};

export function SdbProcessingProgressBar({
  variant,
  activeIndex,
  label,
  progressPercent,
  compact = false,
  earlyHint = null,
}: Props) {
  const stepCount = PROCESSING_STEP_LABELS.length;
  const determinate =
    typeof progressPercent === 'number'
      ? Math.min(100, Math.max(0, progressPercent))
      : Math.round(((activeIndex + 1) / stepCount) * 100);

  const boxClass =
    variant === 'static'
      ? 'sdb-live-preview-processing'
      : compact
        ? 'rounded-xl border border-[#ff6b35]/25 bg-[#0f1e35]/80 px-3 py-3'
        : 'mt-4 rounded-xl border border-[#ff6b35]/25 bg-[#0f1e35]/80 px-4 py-4';

  return (
    <div className={boxClass} aria-live="polite" aria-busy="true">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-[#8fa4c0]">
        <span className="text-teal-300">{label}</span>
        <span>{determinate}%</span>
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
        aria-valuenow={determinate}
      >
        <div
          className={
            variant === 'static'
              ? 'sdb-live-preview-progress-fill'
              : `h-full rounded-full bg-gradient-to-r from-teal-400 to-[#ff6b35] transition-all duration-500 ease-out${
                  typeof progressPercent === 'number' ? '' : ' animate-pulse'
                }`
          }
          style={{ width: `${determinate}%` }}
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
          {PROCESSING_STEP_LABELS.map((step, index) => (
            <li
              key={step}
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
              {step}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
