'use client';

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { dropzoneClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { SDB_DROPZONE_COPY } from '@/config/sdb-preview/dropzone-copy';
import { SDB_MOBILE_FLOW_COPY } from '@/config/sdb-preview/mobile-flow-copy';

export type SdbDropzoneInputHandle = {
  openFilePicker: () => void;
};

type Props = {
  variant: SdbPreviewVariant;
  disabled?: boolean;
  compact?: boolean;
  /** Beschriftung der kompakten Zeile (nach erstem Upload). */
  compactLabel?: string;
  onFile: (file: File) => void;
  /** 1-Klick-Beispiel in der Dropzone (Landing; nicht bei exampleSlot / kompakter Zeile). */
  onQuickExample?: () => void;
};

function stopDropzoneActivation(event: MouseEvent<HTMLButtonElement>): void {
  event.preventDefault();
  event.stopPropagation();
}

export const SdbDropzoneInput = forwardRef<SdbDropzoneInputHandle, Props>(function SdbDropzoneInput(
  { variant, disabled, compact = false, compactLabel = 'Anderes SDB hochladen', onFile, onQuickExample },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const pick = () => {
    if (!disabled) inputRef.current?.click();
  };

  useImperativeHandle(ref, () => ({ openFilePicker: pick }), [disabled]);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  const onKeyActivate = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      pick();
    }
  };

  const state = disabled ? 'processing' : dragOver ? 'drag' : 'idle';
  const surfaceInteraction = {
    role: 'button' as const,
    tabIndex: 0,
    'aria-disabled': disabled,
    onClick: pick,
    onKeyDown: onKeyActivate,
    onDragEnter: (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!disabled) setDragOver(true);
    },
    onDragOver: (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!disabled) setDragOver(true);
    },
    onDragLeave: () => setDragOver(false),
    onDrop: (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
      if (!disabled) handleFiles(event.dataTransfer.files);
    },
  };

  if (compact) {
    return (
      <div className={dropzoneClass(variant, state, true)} {...surfaceInteraction}>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          disabled={disabled}
          onChange={(event) => handleFiles(event.target.files)}
        />
        <span
          className={
            variant === 'static'
              ? 'sdb-live-preview-dropzone__compact-label'
              : 'text-sm font-semibold text-[#f0f6ff]'
          }
        >
          {compactLabel}
        </span>
        <span
          className={
            variant === 'static'
              ? 'sdb-live-preview-dropzone__compact-type'
              : 'shrink-0 text-xs font-bold uppercase tracking-wide text-teal-300'
          }
        >
          {SDB_DROPZONE_COPY.pdfBadgeLabel}
        </span>
      </div>
    );
  }

  return (
    <>
      {onQuickExample ? (
        <button
          type="button"
          className={`${variant === 'static' ? 'btn-cta-orange' : 'gqr-cta-primary gqr-cta-primary--md'} mb-3 w-full justify-center whitespace-normal text-center md:hidden`}
          disabled={disabled}
          onClick={onQuickExample}
        >
          {SDB_MOBILE_FLOW_COPY.quickExamplePrimary}
        </button>
      ) : null}
    <div className={dropzoneClass(variant, state, false)} {...surfaceInteraction}>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        disabled={disabled}
        onChange={(event) => handleFiles(event.target.files)}
      />
      <span className="sdb-live-preview-dropzone__icon" aria-hidden="true">
        {SDB_DROPZONE_COPY.pdfBadgeLabel}
      </span>
      <strong className="sdb-live-preview-dropzone__title">{SDB_DROPZONE_COPY.title}</strong>
      <span className="sdb-live-preview-dropzone__hint">
        {SDB_DROPZONE_COPY.hint}
        <br />
        {SDB_DROPZONE_COPY.hintLegal}
      </span>
      <button
        type="button"
        className="sdb-live-preview-dropzone__pick"
        disabled={disabled}
        onClick={(event) => {
          stopDropzoneActivation(event);
          pick();
        }}
      >
        {SDB_DROPZONE_COPY.pickPdfLabel}
      </button>
      {onQuickExample ? (
        <button
          type="button"
          className="sdb-live-preview-dropzone__example max-md:!hidden"
          disabled={disabled}
          onClick={(event) => {
            stopDropzoneActivation(event);
            onQuickExample();
          }}
        >
          {SDB_DROPZONE_COPY.quickExampleLink}
        </button>
      ) : null}
    </div>
    </>
  );
});
