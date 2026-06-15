import type { SeoSiloHero } from '@/config/seo-silo/types';
import { LandingCtaLink } from '@/components/seo-silo/LandingCtaLink';

type LandingHeroWithMediaProps = {
  hero: SeoSiloHero;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    webpSrc?: string;
  };
  /** Portrait optimiert für Smartphone-Screenshots */
  imageVariant?: 'landscape' | 'portrait';
};

export function LandingHeroWithMedia({
  hero,
  image,
  imageVariant = 'landscape',
}: LandingHeroWithMediaProps) {
  const isPortrait = imageVariant === 'portrait';

  return (
    <header
      className="border-b border-white/[0.07] bg-gradient-to-b from-gqr-surface/90 to-gqr-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="silo-hero-title"
    >
      <div className="gqr-container">
        <div
          className={`grid gap-10 lg:items-center ${
            isPortrait
              ? 'lg:grid-cols-[minmax(0,1fr),minmax(0,300px)]'
              : 'lg:grid-cols-[minmax(0,1fr),minmax(0,480px)]'
          }`}
        >
          <div>
            <p className="gqr-kicker">{hero.eyebrow}</p>
            <h1
              id="silo-hero-title"
              className="mt-3 text-3xl font-black leading-tight tracking-tight text-gqr-text sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
            >
              {hero.h1}
            </h1>
            <p className="gqr-section-sub mt-6 max-w-2xl">{hero.lead}</p>
            {hero.proofLine ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gqr-muted">{hero.proofLine}</p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LandingCtaLink cta={hero.primaryCta} variant="primary" />
              {hero.secondaryCta ? (
                <LandingCtaLink cta={hero.secondaryCta} variant="secondary" />
              ) : null}
            </div>

            {hero.trustBullets?.length ? (
              <ul
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gqr-muted"
                aria-label="Vertrauenshinweise"
              >
                {hero.trustBullets.map((item) => (
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

          <div
            className={
              isPortrait
                ? 'mx-auto flex max-w-[280px] justify-center lg:mx-0 lg:justify-end'
                : 'overflow-hidden rounded-2xl border border-white/[0.08] bg-gqr-surface/80 shadow-xl shadow-black/30'
            }
          >
            {isPortrait ? (
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gqr-bg shadow-2xl shadow-black/40">
                <picture>
                  {image.webpSrc ? (
                    <source srcSet={image.webpSrc} type="image/webp" />
                  ) : null}
                  <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    className="h-auto w-[260px] max-w-full object-cover object-top sm:w-[280px]"
                    loading="eager"
                    decoding="async"
                    alt={image.alt}
                  />
                </picture>
              </div>
            ) : (
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                className="w-full object-cover object-top"
                loading="eager"
                decoding="async"
                alt={image.alt}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
