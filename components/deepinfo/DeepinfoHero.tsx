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
      className="border-b border-white/[0.07] bg-gradient-to-b from-[#0f1e35]/90 to-[#0a1628] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="deepinfo-hero-title"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35] sm:text-sm">
          Deepinfo · {targetAudience}
        </p>
        <h1
          id="deepinfo-hero-title"
          className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-[#f0f6ff] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
        >
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#8fa4c0]">
          {subheadline}
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8fa4c0]/90">
          <span className="font-semibold text-[#c8d4e6]">Typisches Problem: </span>
          {painPoint}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="https://app.gefahrstoff-qr.de/register"
            className="gqr-cta-primary gqr-cta-primary--lg no-underline"
          >
            {ctaText}
          </Link>
          <Link
            href="#deepinfo-content"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-[#f0f6ff] no-underline transition hover:border-white/35 hover:bg-white/[0.06]"
          >
            Zum Fachartikel
          </Link>
        </div>
      </div>
    </header>
  );
}
