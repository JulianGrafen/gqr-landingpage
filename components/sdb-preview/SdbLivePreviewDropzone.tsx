'use client';

import { SdbDropzoneInput } from '@/components/sdb-preview/SdbDropzoneInput';
import { SdbExampleChips } from '@/components/sdb-preview/SdbExampleChips';
import { SdbProcessingTimeline } from '@/components/sdb-preview/SdbProcessingTimeline';
import { Trgs555PreviewDocument } from '@/components/sdb-preview/Trgs555PreviewDocument';
import { shellClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { useSdbPreview } from '@/lib/sdb-preview/useSdbPreview';

export type SdbLivePreviewDropzoneProps = {
  variant?: SdbPreviewVariant;
  className?: string;
};

export function SdbLivePreviewDropzone({ variant = 'next', className = '' }: SdbLivePreviewDropzoneProps) {
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

  return (
    <div className={[shellClass(variant), className].filter(Boolean).join(' ')} data-sdb-live-preview>
      <SdbDropzoneInput variant={variant} disabled={busy} onFile={uploadFile} />
      <SdbExampleChips variant={variant} disabled={busy} onSelect={runExample} />

      {fileLabel && phase !== 'idle' ? (
        <p className={variant === 'static' ? 'sdb-live-preview-file-label' : 'mt-2 text-xs text-[#8fa4c0]'}>
          Datei: {fileLabel}
        </p>
      ) : null}

      {phase === 'processing' ? (
        <SdbProcessingTimeline variant={variant} activeIndex={processingStepIndex} label={processingLabel} />
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

      {phase === 'ready' && teaser ? <Trgs555PreviewDocument variant={variant} teaser={teaser} /> : null}
    </div>
  );
}
