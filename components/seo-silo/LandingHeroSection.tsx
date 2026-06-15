import type { SeoSiloHero } from '@/config/seo-silo/types';
import { LandingCtaLink } from '@/components/seo-silo/LandingCtaLink';

type LandingHeroSectionProps = SeoSiloHero & {
  id?: string;
};

export function LandingHeroSection({
  id = 'silo-hero',
  eyebrow,
  h1,
  lead,
  proofLine,
  primaryCta,
  secondaryCta,
  trustBullets,
}: LandingHeroSectionProps) {
  return (
    <header
      className="border-b border-white/[0.07] bg-gradient-to-b from-gqr-surface/90 to-gqr-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="gqr-container">
        <p className="gqr-kicker">{eyebrow}</p>
        <h1
          id={`${id}-title`}
          className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-gqr-text sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
        >
          {h1}
        </h1>
        <p className="gqr-section-sub mt-6 max-w-3xl">{lead}</p>
        {proofLine ? (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gqr-muted">{proofLine}</p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <LandingCtaLink cta={primaryCta} variant="primary" />
          {secondaryCta ? <LandingCtaLink cta={secondaryCta} variant="secondary" /> : null}
        </div>

        {trustBullets?.length ? (
          <ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gqr-muted"
            aria-label="Vertrauenshinweise"
          >
            {trustBullets.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="font-bold text-gqr-trust" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </header>
  );
}
