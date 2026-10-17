import type { GhsPictogramCode } from '@/config/betriebsanweisung/types';
import { GHS_ASSETS } from '@/lib/ghs/ghs-assets';

type Props = {
  codes: GhsPictogramCode[];
  size?: 'sm' | 'md';
};

export function GhsPictogramGrid({ codes, size = 'md' }: Props) {
  const dim = size === 'sm' ? 40 : 52;

  return (
    <ul className="flex flex-wrap gap-3" role="list">
      {codes.map((code) => {
        const asset = GHS_ASSETS[code];
        return (
          <li key={code}>
            <figure className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
              <img
                src={asset.src}
                alt={`${code} ${asset.label}`}
                width={dim}
                height={dim}
                loading="lazy"
              />
              <figcaption className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                {code}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
