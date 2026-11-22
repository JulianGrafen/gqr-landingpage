'use client';

import { SDB_UNLOCK_RESULT_COPY } from '@/config/sdb-preview/unlock-result-copy';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';
import { buildSuccessBadgeLabel, buildUnlockHeadline } from '@/lib/sdb-preview/build-unlock-headline';
import { handOffPreviewTokenToRegistration } from '@/lib/sdb-preview/preview-handoff';
import { useSdbUnlockHref } from '@/lib/sdb-preview/use-sdb-unlock-href';

type Props = {
  variant: SdbPreviewVariant;
  previewToken: string;
  productName: string;
  sourceLabel: string | null;
  /** `footer`: CTA unter einer kompakten Vorschau (Sidebar), ohne extra Kartenrahmen. */
  placement?: 'overlay' | 'footer';
};

export function SdbUnlockCard({
  variant,
  previewToken,
  productName,
  sourceLabel,
  placement = 'overlay',
}: Props) {
  const href = useSdbUnlockHref({ previewToken, fallbackHref: '#' });
  const handOff = () => handOffPreviewTokenToRegistration(previewToken);
  const isStatic = variant === 'static';
  const framed = placement === 'overlay';

  return (
    <div
      className={
        isStatic && framed
          ? 'sdb-live-preview-unlock'
          : framed
            ? 'w-full rounded-2xl border border-[#ff6b35]/35 bg-[#0f1e35]/95 p-4 text-center shadow-2xl'
            : 'text-center'
      }
    >
      <p className={isStatic ? 'sdb-live-preview-unlock__eyebrow' : 'text-[11px] font-semibold text-teal-300'}>
        {buildSuccessBadgeLabel(sourceLabel)}
      </p>
      <h3 className={isStatic ? 'sdb-live-preview-unlock__title' : 'mt-2 text-lg font-black leading-snug text-[#f0f6ff] sm:text-xl'}>
        {buildUnlockHeadline(productName)}
      </h3>
      <a
        className={
          isStatic
            ? 'btn-cta-orange sdb-live-preview-unlock__cta'
            : 'sdb-unlock-cta mt-3 inline-flex w-full justify-center no-underline'
        }
        href={href}
        onClick={handOff}
      >
        {SDB_UNLOCK_RESULT_COPY.cta}
      </a>
      <p className={isStatic ? 'sdb-live-preview-unlock__text' : 'mt-2 text-xs leading-snug text-[#8fa4c0]'}>
        {SDB_UNLOCK_RESULT_COPY.microTrust}
      </p>
    </div>
  );
}
