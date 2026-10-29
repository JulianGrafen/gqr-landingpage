import Link from 'next/link';

/** Wortmarke aus `/logo.png` (Root-Landing + GitHub Pages). */
export const GQR_BRAND_LOGO_SRC = '/logo.png';

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
        width={500}
        height={500}
        className="gqr-brand-logo"
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </Link>
  );
}
