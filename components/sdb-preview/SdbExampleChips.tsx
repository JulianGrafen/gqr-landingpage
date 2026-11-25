'use client';

import { useId } from 'react';
import { FileText } from 'lucide-react';
import { SDB_DROPZONE_COPY } from '@/config/sdb-preview/dropzone-copy';
import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';
import type { SdbPreviewExampleId } from '@/lib/sdb-preview/api-contract';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  disabled?: boolean;
  onSelect: (id: SdbPreviewExampleId) => void;
  /** Teilmenge der Beispiele (z. B. nur Werkstatt-Stoffe). */
  exampleIds?: readonly SdbPreviewExampleId[];
};

type ExampleChipClassNames = {
  wrap: string;
  label: string;
  grid: string;
  button: string;
  icon: string;
};

/** `static`: statische LP (style.css), `next`: Next.js-Seiten (Tailwind, gleiche Optik). */
const CLASS_NAMES_BY_VARIANT: Record<SdbPreviewVariant, ExampleChipClassNames> = {
  static: {
    wrap: 'sdb-live-preview-examples',
    label: 'sdb-live-preview-examples__label',
    grid: 'sdb-live-preview-examples__row',
    button: 'sdb-live-preview-examples__btn',
    icon: 'sdb-live-preview-examples__icon',
  },
  next: {
    wrap: 'mt-4',
    label: 'mb-2 text-sm font-semibold text-[#c8d4e6]',
    grid: 'grid grid-cols-2 gap-2',
    button:
      'group flex items-start gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2.5 text-left text-sm font-semibold text-[#c8d4e6] transition hover:border-[#ff6b35]/60 hover:bg-[#ff6b35]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35]/60 disabled:cursor-not-allowed disabled:opacity-50',
    icon: 'mt-0.5 h-4 w-4 shrink-0 text-[#8fa4c0] transition group-hover:text-[#ff6b35]',
  },
};

export function SdbExampleChips({ variant, disabled, onSelect, exampleIds }: Props) {
  const examples = exampleIds?.length
    ? SDB_PREVIEW_EXAMPLES.filter((ex) => exampleIds.includes(ex.id))
    : SDB_PREVIEW_EXAMPLES;
  const classNames = CLASS_NAMES_BY_VARIANT[variant];
  const labelId = useId();

  return (
    <div className={classNames.wrap} role="group" aria-labelledby={labelId}>
      <p id={labelId} className={classNames.label}>
        {SDB_DROPZONE_COPY.examplesLabel}
      </p>
      <div className={classNames.grid}>
        {examples.map((ex) => (
          <button
            key={ex.id}
            type="button"
            className={classNames.button}
            disabled={disabled}
            onClick={() => onSelect(ex.id)}
          >
            <FileText className={classNames.icon} strokeWidth={2} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block">{ex.label}</span>
              {variant === 'next' ? (
                <span className="mt-0.5 block text-xs font-normal text-[#8fa4c0]">{ex.description}</span>
              ) : null}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
