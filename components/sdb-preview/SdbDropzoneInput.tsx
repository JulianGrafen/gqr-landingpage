'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { dropzoneClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

export type SdbDropzoneInputHandle = {
  openFilePicker: () => void;
};

type Props = {
  variant: SdbPreviewVariant;
  disabled?: boolean;
  compact?: boolean;
  onFile: (file: File) => void;
};

export const SdbDropzoneInput = forwardRef<SdbDropzoneInputHandle, Props>(function SdbDropzoneInput(
  { variant, disabled, compact = false, onFile },
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

  const state = disabled ? 'processing' : dragOver ? 'drag' : 'idle';

  if (compact && variant === 'next') {
    return (
      <div
        className={dropzoneClass(variant, state, true)}
        role="button"
        tabIndex={0}
        aria-disabled={disabled}
        onClick={pick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            pick();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="text-sm font-semibold text-[#f0f6ff]">Anderes SDB hochladen</span>
        <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-teal-300">PDF</span>
      </div>
    );
  }

  return (
    <div
      className={dropzoneClass(variant, state, false)}
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={pick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pick();
        }
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <span className={variant === 'static' ? 'sdb-live-preview-dropzone__icon' : 'text-3xl text-teal-300'} aria-hidden="true">
        PDF
      </span>
      <strong className={variant === 'static' ? '' : 'text-lg text-[#f0f6ff]'}>
        Sicherheitsdatenblatt hier ablegen
      </strong>
      <span className={variant === 'static' ? '' : 'text-sm text-[#8fa4c0]'}>
        PDF, max. 10 MB — ohne Login · KI-gestützter Entwurf (gemäß TRGS 555)
      </span>
    </div>
  );
});
