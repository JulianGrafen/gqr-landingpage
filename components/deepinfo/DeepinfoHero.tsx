import Link from 'next/link';

type DeepinfoHeroProps = {
  title: string;
  subheadline: string;
  targetAudience: string;
  painPoint: string;
  ctaText: string;
};

export function DeepinfoHero({
  title,
  subheadline,
  targetAudience,
  painPoint,
  ctaText,
}: DeepinfoHeroProps) {
  return (
    <header
      className="border-b border-white/[0.07] bg-gradient-to-b from-gqr-surface/90 to-gqr-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="deepinfo-hero-title"
    >
      <div className="mx-auto max-w-[1160px]">
        <p className="gqr-kicker">Fachleitfaden · {targetAudience}</p>
        <h1
          id="deepinfo-hero-title"
          className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-gqr-text sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
        >
          {title}
        </h1>
        <p className="gqr-section-sub mt-6 max-w-3xl">{subheadline}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gqr-muted">
          <span className="font-semibold text-gqr-soft">Typisches Problem: </span>
          {painPoint}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="https://app.gefahrstoff-qr.de/register"
            className="gqr-cta-primary gqr-cta-primary--lg no-underline"
          >
            {ctaText}
          </Link>
          <a href="#deepinfo-content" className="gqr-btn-secondary">
            Zum Fachartikel
          </a>
        </div>
      </div>
    </header>
  );
}
