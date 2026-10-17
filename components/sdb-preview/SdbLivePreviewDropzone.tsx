'use client';

import { SdbDropzoneInput } from '@/components/sdb-preview/SdbDropzoneInput';
import { SdbExampleChips } from '@/components/sdb-preview/SdbExampleChips';
import { SdbProcessingProgressBar } from '@/components/sdb-preview/SdbProcessingProgressBar';
import { SdbProcessingTimeline } from '@/components/sdb-preview/SdbProcessingTimeline';
import { SdbPreviewCompactResult } from '@/components/sdb-preview/SdbPreviewCompactResult';
import { Trgs555PreviewDocument } from '@/components/sdb-preview/Trgs555PreviewDocument';
import { shellClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { PROCESSING_STEP_LABELS } from '@/lib/sdb-preview/api-contract';
import { useSdbPreview } from '@/lib/sdb-preview/useSdbPreview';

export type SdbLivePreviewDropzoneProps = {
  variant?: SdbPreviewVariant;
  className?: string;
  /** Optionaler Text oberhalb der Dropzone (z. B. stoffspezifischer SDB-Hinweis). */
  uploadIntro?: string;
  /** Engere Einbettung in Sidebars (ohne doppelte Schatten). */
  embedded?: boolean;
};

export function SdbLivePreviewDropzone({
  variant = 'next',
  className = '',
  uploadIntro,
  embedded = false,
}: SdbLivePreviewDropzoneProps) {
  const {
    phase,
    processingStepIndex,
    processingLabel,
    teaser,
    error,
    fileLabel,
    uploadFile,
    runExample,
    reset,
  } = useSdbPreview();

  const busy = phase === 'processing';
  const stepCount = PROCESSING_STEP_LABELS.length;
  const progressPercent = Math.round(((processingStepIndex + 1) / stepCount) * 100);

  return (
    <div
      className={[shellClass(variant, embedded), className].filter(Boolean).join(' ')}
      data-sdb-live-preview
    >
      {uploadIntro ? (
        <p
          className={
            variant === 'static'
              ? 'sdb-live-preview-intro'
              : 'mb-3 text-sm leading-relaxed text-[#8fa4c0]'
          }
        >
          {uploadIntro}
        </p>
      ) : null}
      <SdbDropzoneInput variant={variant} disabled={busy} onFile={uploadFile} />
      <SdbExampleChips variant={variant} disabled={busy} onSelect={runExample} />

      {fileLabel && phase !== 'idle' ? (
        <p className={variant === 'static' ? 'sdb-live-preview-file-label' : 'mt-2 truncate text-xs text-[#8fa4c0]'}>
          Datei: {fileLabel}
        </p>
      ) : null}

      {phase === 'processing' ? (
        variant === 'static' ? (
          <SdbProcessingTimeline variant={variant} activeIndex={processingStepIndex} label={processingLabel} />
        ) : (
          <SdbProcessingProgressBar
            variant={variant}
            activeIndex={processingStepIndex}
            label={processingLabel}
            progressPercent={progressPercent}
          />
        )
      ) : null}

      {phase === 'error' && error ? (
        <div
          className={
            variant === 'static'
              ? 'sdb-live-preview-error'
              : 'mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200'
          }
          role="alert"
        >
          {error}
          <button type="button" className="ml-2 underline" onClick={reset}>
            Erneut versuchen
          </button>
        </div>
      ) : null}

      {phase === 'ready' && teaser ? (
        variant === 'static' ? (
          <Trgs555PreviewDocument variant={variant} teaser={teaser} />
        ) : (
          <SdbPreviewCompactResult variant={variant} teaser={teaser} />
        )
      ) : null}
    </div>
  );
}
