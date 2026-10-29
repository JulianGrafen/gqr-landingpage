import Link from 'next/link';

/** Getrimmte Wortmarke (ohne transparenten 500×500-Rand). */
export const GQR_BRAND_LOGO_SRC = '/logo-wordmark.png';

type Props = {
  className?: string;
  /** Header above the fold */
  priority?: boolean;
};

export function GqrBrandLogo({ className = '', priority = false }: Props) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center no-underline ${className}`.trim()}
      aria-label="Gefahrstoff-QR Startseite"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- PNG-Wortmarke, identisch zur statischen Startseite */}
      <img
        src={GQR_BRAND_LOGO_SRC}
        alt="Gefahrstoff-QR"
        width={431}
        height={108}
        className="gqr-brand-logo"
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </Link>
  );
}
