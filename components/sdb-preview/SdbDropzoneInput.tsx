'use client';

import { useRef, useState } from 'react';
import { dropzoneClass, type SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  disabled?: boolean;
  onFile: (file: File) => void;
};

export function SdbDropzoneInput({ variant, disabled, onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const pick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  const state = disabled ? 'processing' : dragOver ? 'drag' : 'idle';

  return (
    <div
      className={dropzoneClass(variant, state)}
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
}
