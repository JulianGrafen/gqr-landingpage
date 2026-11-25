'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from 'react';
import { SdbDropzoneInput, type SdbDropzoneInputHandle } from '@/components/sdb-preview/SdbDropzoneInput';
import { SdbExampleChips } from '@/components/sdb-preview/SdbExampleChips';
import { SdbProcessingProgressBar } from '@/components/sdb-preview/SdbProcessingProgressBar';
import { SdbProcessingTimeline } from '@/components/sdb-preview/SdbProcessingTimeline';
import { HeroBaLivePreview } from '@/components/sdb-preview/HeroBaPreviewDocument';
import { SdbPreviewCompactResult } from '@/components/sdb-preview/SdbPreviewCompactResult';
import { shellClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { SDB_DROPZONE_QUICK_EXAMPLE_ID } from '@/config/sdb-preview/dropzone-copy';
import type { SdbPreviewExampleId, SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { resolvePreviewSourceLabel } from '@/lib/sdb-preview/resolve-preview-source-label';
import {
  hasTransferablePreviewToken,
  useSdbPreview,
  type SdbPreviewController,
  type SdbPreviewPhase,
} from '@/lib/sdb-preview/useSdbPreview';
import { MobileLeadCapture } from '@/components/sdb-preview/MobileLeadCapture';

const DROPZONE_ANCHOR_ID = 'ba-sdb-dropzone';

export type SdbLivePreviewDropzoneProps = {
  variant?: SdbPreviewVariant;
  className?: string;
  /** Optionaler Text oberhalb der Dropzone (z. B. stoffspezifischer SDB-Hinweis). */
  uploadIntro?: string;
  /** Engere Einbettung in Sidebars (ohne doppelte Schatten). */
  embedded?: boolean;
  /** Keine GHS/CAS/H-Sätze in der Vorschau (öffentliche Betriebsanweisungs-LPs). */
  omitPublishedHazardData?: boolean;
  onPhaseChange?: (phase: SdbPreviewPhase) => void;
  /**
   * Ersetzt die generischen Beispiel-SDB-Chips (die eine Server-Extraktion auslösen) durch einen
   * seitenspezifischen Beispiel-Einstieg (z. B. Demo-Extraktion auf BA-Seiten).
   */
  exampleSlot?: ReactNode;
  /**
   * Ersetzt im Status „ready“ Ergebnis + Upload-Feld (z. B. Conversion-Card, wenn die Vorschau
   * selbst an anderer Stelle der Seite gerendert wird). Neuer Upload über `openFilePicker()`.
   */
  renderReadyState?: (teaser: SdbPreviewTeaser) => ReactNode;
  /** Optionale Teilmenge der 1-Klick-Beispiel-SDBs. */
  exampleIds?: readonly SdbPreviewExampleId[];
};

export type SdbLivePreviewDropzoneHandle = {
  openFilePicker: () => void;
  scrollToDropzone: () => void;
};

type ControlledDropzoneProps = SdbLivePreviewDropzoneProps & {
  /** Von außen gehaltener Vorschau-State (State-Lifting, z. B. BA-Seiten mit großer Hauptvorschau). */
  controller: SdbPreviewController;
};

function scrollToDropzoneAnchor(): void {
  document.getElementById(DROPZONE_ANCHOR_ID)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

/** Präsentationskomponente: rendert Upload, Fortschritt, Fehler und Ergebnis eines `SdbPreviewController`. */
export const SdbLivePreviewDropzoneView = forwardRef<SdbLivePreviewDropzoneHandle, ControlledDropzoneProps>(
  function SdbLivePreviewDropzoneView(
    {
      controller,
      variant = 'next',
      className = '',
      uploadIntro,
      embedded = false,
      omitPublishedHazardData = false,
      onPhaseChange,
      exampleSlot,
      renderReadyState,
      exampleIds,
    },
    ref,
  ) {
    const dropzoneInputRef = useRef<SdbDropzoneInputHandle>(null);
    const { phase, progress, teaser, error, source, fileLabel, uploadFile, runExample, reset, earlyTradeName } =
      controller;
    const sourceLabel = resolvePreviewSourceLabel(source);

    useImperativeHandle(
      ref,
      () => ({
        openFilePicker: () => dropzoneInputRef.current?.openFilePicker(),
        scrollToDropzone: scrollToDropzoneAnchor,
      }),
      [],
    );

    const busy = phase === 'processing';
    const embeddedActive = embedded && phase !== 'idle';
    const compactUpload = embeddedActive || phase === 'ready';
    const customReadyState = phase === 'ready' && teaser && renderReadyState ? renderReadyState(teaser) : null;
    const showExampleChips = !(embedded && (phase === 'processing' || phase === 'ready'));

    useEffect(() => {
      onPhaseChange?.(phase);
    }, [phase, onPhaseChange]);

    useEffect(() => {
      if (embedded && phase !== 'idle') scrollToDropzoneAnchor();
    }, [embedded, phase]);

    const processingBlock =
      phase === 'processing' ? (
        variant === 'static' ? (
          <SdbProcessingTimeline variant={variant} progress={progress} />
        ) : (
          <SdbProcessingProgressBar
            variant={variant}
            progress={progress}
            compact={embedded}
            earlyHint={earlyTradeName}
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
          <HeroBaLivePreview teaser={teaser} source={controller.source} draftToken={controller.draftToken} />
        ) : (
          <SdbPreviewCompactResult
            variant={variant}
            teaser={teaser}
            embedded={embedded}
            omitPublishedHazardData={omitPublishedHazardData}
            sourceLabel={sourceLabel}
            draftToken={controller.draftToken}
          />
        )
      ) : null;

    const dropzoneInput = (
      <SdbDropzoneInput
        ref={dropzoneInputRef}
        variant={variant}
        disabled={busy}
        compact={compactUpload || (variant === 'static' && phase !== 'idle')}
        compactLabel={phase === 'ready' ? 'Anderes SDB hochladen' : undefined}
        onFile={uploadFile}
        onQuickExample={exampleSlot ? undefined : () => void runExample(SDB_DROPZONE_QUICK_EXAMPLE_ID)}
      />
    );

    const dropzoneBlock = (
      <>
        {dropzoneInput}
        {showExampleChips ? (
          exampleSlot ?? (
            <SdbExampleChips variant={variant} disabled={busy} onSelect={runExample} exampleIds={exampleIds} />
          )
        ) : null}
        {fileLabel && phase !== 'idle' && phase !== 'ready' ? (
          <p className={variant === 'static' ? 'sdb-live-preview-file-label' : 'mt-2 truncate text-xs text-[#8fa4c0]'}>
            Datei: {fileLabel}
          </p>
        ) : null}
        {!embedded && phase !== 'processing' ? (
          <MobileLeadCapture
            draftToken={controller.draftToken}
            previewToken={teaser && hasTransferablePreviewToken(source) ? teaser.previewToken : null}
          />
        ) : null}
      </>
    );

    const shell =
      embedded && embeddedActive && !customReadyState
        ? 'space-y-3 rounded-xl border border-white/10 bg-[#0f1e35]/70 p-3 shadow-inner shadow-black/20'
        : shellClass(variant, embedded);

    return (
      <div className={[shell, className].filter(Boolean).join(' ')} data-sdb-live-preview data-sdb-phase={phase}>
        {uploadIntro && phase === 'idle' ? (
          <p className={variant === 'static' ? 'sdb-live-preview-intro' : 'mb-3 text-sm leading-relaxed text-[#8fa4c0]'}>
            {uploadIntro}
          </p>
        ) : null}

        {customReadyState ? (
          <>
            {customReadyState}
            {/* Bleibt gemountet, damit „Anderes SDB testen“ den Datei-Dialog öffnen kann. */}
            <div hidden>{dropzoneInput}</div>
          </>
        ) : variant === 'static' && phase !== 'idle' ? (
          <>
            {processingBlock}
            {errorBlock}
            {resultBlock}
            <div className="space-y-3">{dropzoneBlock}</div>
          </>
        ) : embeddedActive ? (
          <>
            {processingBlock}
            {errorBlock}
            {resultBlock}
            <div className="space-y-3">{dropzoneBlock}</div>
          </>
        ) : phase === 'ready' ? (
          <>
            {resultBlock}
            {dropzoneBlock}
          </>
        ) : (
          <>
            {dropzoneBlock}
            {processingBlock}
            {errorBlock}
          </>
        )}
      </div>
    );
  },
);

/** Eigenständige Dropzone mit internem State (Startseite, Lösungen, Silo-Seiten, statischer Mount). */
export const SdbLivePreviewDropzone = forwardRef<SdbLivePreviewDropzoneHandle, SdbLivePreviewDropzoneProps>(
  function SdbLivePreviewDropzone(props, ref) {
    const controller = useSdbPreview();
    return <SdbLivePreviewDropzoneView ref={ref} controller={controller} {...props} />;
  },
);
