const GHS_ASSETS: Record<string, { label: string; src: string }> = {
  GHS02: { label: 'Entzündbar', src: '/images/ghs/ghs02.svg' },
  GHS05: { label: 'Ätzwirkung', src: '/images/ghs/ghs05.svg' },
  GHS07: { label: 'Ausrufezeichen', src: '/images/ghs/ghs07.svg' },
  GHS08: { label: 'Gesundheitsgefahr', src: '/images/ghs/ghs08.svg' },
};

function normalizeCode(raw: string): string {
  const match = raw.match(/GHS\d{2}/i);
  return match ? match[0].toUpperCase() : raw;
}

type Props = { code: string; variant: 'next' | 'static' };

export function GhsPictogramBadge({ code, variant }: Props) {
  const normalized = normalizeCode(code);
  const asset = GHS_ASSETS[normalized];

  const cardClass =
    variant === 'static'
      ? 'sdb-live-preview-ghs'
      : 'flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-2';

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
