import { GHS_ASSETS, normalizeGhsCode } from '@/lib/ghs/ghs-assets';

type Props = { code: string; variant: 'next' | 'static' };

export function GhsPictogramBadge({ code, variant }: Props) {
  const normalized = normalizeGhsCode(code) ?? code.toUpperCase();
  const asset = GHS_ASSETS[normalized as keyof typeof GHS_ASSETS];

  const cardClass =
    variant === 'static'
      ? 'sdb-live-preview-ghs'
      : 'flex w-[4.5rem] flex-shrink-0 flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-2';

  if (!asset) {
    return (
      <span className={cardClass} title={code}>
        {normalized}
      </span>
    );
  }

  return (
    <figure className={cardClass}>
      <img src={asset.src} alt={`${normalized} ${asset.label}`} width={48} height={48} loading="lazy" />
      <figcaption className="text-[10px] font-bold uppercase tracking-wide text-[#8fa4c0]">{normalized}</figcaption>
    </figure>
  );
}
