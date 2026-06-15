import { VorlageDownloadForm } from '@/components/lead-magnet/VorlageDownloadForm';
import type { SeoSiloHero } from '@/config/seo-silo/types';

type LandingHeroLeadMagnetProps = {
  hero: SeoSiloHero;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function LandingHeroLeadMagnet({ hero, image }: LandingHeroLeadMagnetProps) {
  return (
    <header
      className="border-b border-white/[0.07] bg-gradient-to-b from-gqr-surface/90 to-gqr-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="silo-hero-title"
    >
      <div className="gqr-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),minmax(0,380px)] lg:items-center">
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

            <VorlageDownloadForm className="mt-8" tone="dark" />

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

          {image ? (
            <div className="flex justify-center lg:justify-end">
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                className="max-h-72 w-auto max-w-full drop-shadow-lg"
                loading="eager"
                decoding="async"
                alt={image.alt}
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
