'use client';

import { GhsPictogramBadge } from '@/components/sdb-preview/GhsPictogramBadge';
import { SdbUnlockCard } from '@/components/sdb-preview/SdbUnlockCard';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import type { SdbPreviewVariant } from '@/components/sdb-preview/sdb-preview-tokens';

type Props = {
  variant: SdbPreviewVariant;
  teaser: SdbPreviewTeaser;
};

export function Trgs555PreviewDocument({ variant, teaser }: Props) {
  const docClass =
    variant === 'static' ? 'sdb-live-preview-document' : 'relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#162340]/80';

  return (
    <div className={docClass}>
      <header className={variant === 'static' ? 'sdb-live-preview-document__head' : 'border-b border-white/10 px-5 py-4'}>
        <p className={variant === 'static' ? '' : 'text-xs font-bold uppercase tracking-wider text-[#ff6b35]'}>
          KI-gestützter Entwurf · TRGS 555
        </p>
        <h4 className={variant === 'static' ? 'sdb-live-preview-document__title' : 'mt-1 text-xl font-black text-[#f0f6ff]'}>
          {teaser.tradeName}
        </h4>
        <p className={variant === 'static' ? '' : 'text-sm text-[#8fa4c0]'}>{teaser.manufacturer}</p>
        {teaser.signalWord ? (
          <p className={variant === 'static' ? 'sdb-live-preview-document__signal' : 'mt-2 text-sm font-bold text-red-400'}>
            Signalwort: {teaser.signalWord}
          </p>
        ) : null}
        <div className={variant === 'static' ? 'sdb-live-preview-document__ghs' : 'mt-3 flex flex-wrap gap-2'}>
          {teaser.ghsPictograms.map((code) => (
            <GhsPictogramBadge key={code} code={code} variant={variant} />
          ))}
        </div>
      </header>

      <div className={variant === 'static' ? 'sdb-live-preview-document__sections' : 'space-y-0 px-5 py-4'}>
        {teaser.sections.map((section) => {
          const sectionWrap =
            variant === 'static'
              ? `sdb-live-preview-section${section.unlocked ? '' : ' sdb-live-preview-section--locked'}`
              : `relative border-t border-white/10 py-4 first:border-t-0${section.unlocked ? '' : ' select-none'}`;

          return (
            <section key={section.key} className={sectionWrap} aria-label={section.title}>
              <h5 className={variant === 'static' ? '' : 'text-sm font-bold text-[#f0f6ff]'}>{section.title}</h5>
              <div
                className={
                  section.unlocked
                    ? variant === 'static'
                      ? 'sdb-live-preview-section__body'
                      : 'mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#c8d4e6]'
                    : variant === 'static'
                      ? 'sdb-live-preview-section__body sdb-live-preview-section__body--blur'
                      : 'relative mt-2 overflow-hidden rounded-xl'
                }
              >
                {!section.unlocked && variant === 'next' ? (
                  <>
                    <p className="whitespace-pre-wrap blur-md opacity-80">{section.body}</p>
                    {section.key === 'emergency_qr' && teaser.qrPreviewUrl ? (
                      <img
                        src={teaser.qrPreviewUrl}
                        alt=""
                        className="mx-auto mt-2 blur-md"
                        width={120}
                        height={120}
                      />
                    ) : null}
                  </>
                ) : (
                  <>
                    <p className="whitespace-pre-wrap">{section.body}</p>
                    {section.key === 'emergency_qr' && !section.unlocked && teaser.qrPreviewUrl ? (
                      <img
                        src={teaser.qrPreviewUrl}
                        alt=""
                        className={variant === 'static' ? 'sdb-live-preview-qr-blur' : 'mx-auto mt-2 blur-md'}
                        width={120}
                        height={120}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <SdbUnlockCard variant={variant} previewToken={teaser.previewToken} />
    </div>
  );
}
