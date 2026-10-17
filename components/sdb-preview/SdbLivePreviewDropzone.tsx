'use client';

import { useEffect } from 'react';
import { SdbDropzoneInput } from '@/components/sdb-preview/SdbDropzoneInput';
import { SdbExampleChips } from '@/components/sdb-preview/SdbExampleChips';
import { SdbProcessingProgressBar } from '@/components/sdb-preview/SdbProcessingProgressBar';
import { SdbProcessingTimeline } from '@/components/sdb-preview/SdbProcessingTimeline';
import { SdbPreviewCompactResult } from '@/components/sdb-preview/SdbPreviewCompactResult';
import { Trgs555PreviewDocument } from '@/components/sdb-preview/Trgs555PreviewDocument';
import { shellClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { PROCESSING_STEP_LABELS } from '@/lib/sdb-preview/api-contract';
import { useSdbPreview, type SdbPreviewPhase } from '@/lib/sdb-preview/useSdbPreview';

export type SdbLivePreviewDropzoneProps = {
  variant?: SdbPreviewVariant;
  className?: string;
  /** Optionaler Text oberhalb der Dropzone (z. B. stoffspezifischer SDB-Hinweis). */
  uploadIntro?: string;
  /** Engere Einbettung in Sidebars (ohne doppelte Schatten). */
  embedded?: boolean;
  onPhaseChange?: (phase: SdbPreviewPhase) => void;
};

export function SdbLivePreviewDropzone({
  variant = 'next',
  className = '',
  uploadIntro,
  embedded = false,
  onPhaseChange,
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
  const embeddedActive = embedded && phase !== 'idle';
  const showExampleChips = !(embedded && (phase === 'processing' || phase === 'ready'));
  const dropzoneCompact = embeddedActive;

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (!embedded || phase === 'idle') return;
    document.getElementById('ba-sdb-dropzone')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [embedded, phase]);

  const processingBlock =
    phase === 'processing' ? (
      variant === 'static' ? (
        <SdbProcessingTimeline variant={variant} activeIndex={processingStepIndex} label={processingLabel} />
      ) : (
        <SdbProcessingProgressBar
          variant={variant}
          activeIndex={processingStepIndex}
          label={processingLabel}
          progressPercent={progressPercent}
          compact={embedded}
        />
      )
    ) : null;

  const errorBlock =
    phase === 'error' && error ? (
      <div
        className={
          variant === 'static'
            ? 'sdb-live-preview-error'
            : 'mt-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200'
        }
        role="alert"
      >
        {error}
        <button type="button" className="ml-2 underline" onClick={reset}>
          Erneut versuchen
        </button>
      </div>
    ) : null;

  const resultBlock =
    phase === 'ready' && teaser ? (
      variant === 'static' ? (
        <Trgs555PreviewDocument variant={variant} teaser={teaser} />
      ) : (
        <SdbPreviewCompactResult variant={variant} teaser={teaser} embedded={embedded} />
      )
    ) : null;

  const dropzoneBlock = (
    <>
      <SdbDropzoneInput
        variant={variant}
        disabled={busy}
        compact={dropzoneCompact}
        onFile={uploadFile}
      />
      {showExampleChips ? (
        <SdbExampleChips variant={variant} disabled={busy} onSelect={runExample} />
      ) : null}
      {fileLabel && phase !== 'idle' ? (
        <p className={variant === 'static' ? 'sdb-live-preview-file-label' : 'mt-2 truncate text-xs text-[#8fa4c0]'}>
          Datei: {fileLabel}
        </p>
      ) : null}
    </>
  );

  const shell =
    embedded && embeddedActive
      ? 'space-y-3 rounded-xl border border-white/10 bg-[#0f1e35]/70 p-3 shadow-inner shadow-black/20'
      : shellClass(variant, embedded);

  return (
    <div
      className={[shell, className].filter(Boolean).join(' ')}
      data-sdb-live-preview
      data-sdb-phase={phase}
    >
      {uploadIntro && phase === 'idle' ? (
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

      {embeddedActive ? (
        <>
          {processingBlock}
          {errorBlock}
          {resultBlock}
          <div className="space-y-3">{dropzoneBlock}</div>
        </>
      ) : (
        <>
          {dropzoneBlock}
          {processingBlock}
          {errorBlock}
          {resultBlock}
        </>
      )}
    </div>
  );
}
