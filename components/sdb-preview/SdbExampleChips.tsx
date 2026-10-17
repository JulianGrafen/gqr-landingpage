'use client';

import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';
import type { SdbPreviewExampleId } from '@/lib/sdb-preview/api-contract';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  disabled?: boolean;
  onSelect: (id: SdbPreviewExampleId) => void;
};

export function SdbExampleChips({ variant, disabled, onSelect }: Props) {
  const wrapClass =
    variant === 'static'
      ? 'sdb-live-preview-examples'
      : 'mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap';

  const btnClass =
    variant === 'static'
      ? 'sdb-live-preview-examples__btn'
      : 'rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-left text-sm font-semibold text-[#c8d4e6] transition hover:border-teal-400/40 hover:bg-teal-400/10 disabled:opacity-50';

  return (
    <div className={wrapClass} aria-label="Beispiel-SDBs mit 1 Klick testen">
      <p className={variant === 'static' ? 'sdb-live-preview-examples__label' : 'w-full text-xs font-bold uppercase tracking-wider text-[#ff6b35]'}>
        Beispiel-SDBs mit 1 Klick testen
      </p>
      <div className={variant === 'static' ? 'sdb-live-preview-examples__row' : 'flex flex-wrap gap-2'}>
        {SDB_PREVIEW_EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            type="button"
            className={btnClass}
            disabled={disabled}
            onClick={() => onSelect(ex.id)}
          >
            <span>{ex.label}</span>
            {variant === 'next' ? (
              <span className="mt-0.5 block text-xs font-normal text-[#8fa4c0]">{ex.description}</span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
