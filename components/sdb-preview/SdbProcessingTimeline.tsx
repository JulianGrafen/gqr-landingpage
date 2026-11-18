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
};

export function SdbProcessingTimeline({ variant, progress }: Props) {
  const activeIndex = extractionStageIndex(progress.stageId);
  const boxClass =
    variant === 'static'
      ? 'sdb-live-preview-processing'
      : 'flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-2xl border border-teal-400/30 bg-teal-400/5 p-6';

  return (
    <div className={boxClass} aria-live="polite" aria-busy={progress.stageId !== 'complete'}>
      <span className={variant === 'static' ? 'sdb-processing__spinner' : 'h-6 w-6 animate-spin rounded-full border-2 border-teal-300 border-t-transparent'} />
      <p className={variant === 'static' ? '' : 'text-center text-sm font-bold text-teal-300'}>{progress.label}</p>
      <ol className={variant === 'static' ? 'sdb-live-preview-steps' : 'flex flex-wrap justify-center gap-2 text-xs text-[#8fa4c0]'}>
        {EXTRACTION_WORK_STAGES.map((stage, index) => (
          <li
            key={stage.id}
            className={
              index <= activeIndex
                ? variant === 'static'
                  ? 'is-done'
                  : 'font-semibold text-teal-300'
                : undefined
            }
          >
            {stage.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
