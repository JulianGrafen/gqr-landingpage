'use client';

import { PROCESSING_STEP_LABELS } from '@/lib/sdb-preview/api-contract';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  activeIndex: number;
  label: string;
};

export function SdbProcessingTimeline({ variant, activeIndex, label }: Props) {
  const boxClass =
    variant === 'static'
      ? 'sdb-live-preview-processing'
      : 'flex min-h-[140px] flex-col items-center justify-center gap-4 rounded-2xl border border-teal-400/30 bg-teal-400/5 p-6';

  return (
    <div className={boxClass} aria-live="polite" aria-busy="true">
      <span className={variant === 'static' ? 'sdb-processing__spinner' : 'h-6 w-6 animate-spin rounded-full border-2 border-teal-300 border-t-transparent'} />
      <p className={variant === 'static' ? '' : 'text-center text-sm font-bold text-teal-300'}>{label}</p>
      <ol className={variant === 'static' ? 'sdb-live-preview-steps' : 'flex flex-wrap justify-center gap-2 text-xs text-[#8fa4c0]'}>
        {PROCESSING_STEP_LABELS.map((step, index) => (
          <li
            key={step}
            className={
              index <= activeIndex
                ? variant === 'static'
                  ? 'is-done'
                  : 'font-semibold text-teal-300'
                : undefined
            }
          >
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
