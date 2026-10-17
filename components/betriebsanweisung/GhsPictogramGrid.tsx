import type { GhsPictogramCode } from '@/config/betriebsanweisung/types';
import { GHS_ASSETS } from '@/lib/ghs/ghs-assets';

type Props = {
  codes: GhsPictogramCode[];
  size?: 'sm' | 'md';
  variant?: 'light' | 'dark';
};

export function GhsPictogramGrid({ codes, size = 'md', variant = 'light' }: Props) {
  const dim = size === 'sm' ? 40 : 52;
  const figureClass =
    variant === 'dark'
      ? 'flex w-[4.5rem] flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-2'
      : 'flex w-[4.5rem] flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm';
  const captionClass =
    variant === 'dark' ? 'text-[10px] font-bold uppercase tracking-wide text-[#8fa4c0]' : 'text-[10px] font-bold uppercase tracking-wide text-slate-500';

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${variant === 'dark' ? 'justify-center' : 'justify-center sm:justify-start'}`}
      role="group"
      aria-label="GHS-Piktogramme"
    >
      {codes.map((code) => {
        const asset = GHS_ASSETS[code];
        return (
          <figure key={code} className={figureClass}>
            <img
              src={asset.src}
              alt={`${code} ${asset.label}`}
              width={dim}
              height={dim}
              loading="lazy"
            />
            <figcaption className={captionClass}>{code}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
