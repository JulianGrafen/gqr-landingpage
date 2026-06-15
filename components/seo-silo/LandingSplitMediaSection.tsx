import type { SeoSiloCta } from '@/config/seo-silo/types';
import { LandingCtaLink } from '@/components/seo-silo/LandingCtaLink';

type LandingSplitMediaSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
  media: {
    src: string;
    alt: string;
    width: number;
    height: number;
    webpSrc?: string;
  };
  reverse?: boolean;
  cta?: SeoSiloCta;
  /** Portrait = Smartphone-Mock; Landscape = breite Demo */
  mediaVariant?: 'portrait' | 'landscape';
};

export function LandingSplitMediaSection({
  id,
  eyebrow,
  title,
  lead,
  bullets,
  media,
  reverse = false,
  cta,
  mediaVariant = 'landscape',
}: LandingSplitMediaSectionProps) {
  const isPortrait = mediaVariant === 'portrait';

  const mediaBlock = (
    <div
      className={
        isPortrait
          ? 'mx-auto flex max-w-[280px] justify-center lg:mx-0 lg:max-w-none lg:justify-end'
          : 'overflow-hidden rounded-2xl border border-white/[0.08] bg-gqr-surface/80 shadow-xl shadow-black/30'
      }
    >
      {isPortrait ? (
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gqr-bg shadow-2xl shadow-black/40">
          <picture>
            {media.webpSrc ? (
              <source srcSet={media.webpSrc} type="image/webp" />
            ) : null}
            <img
              src={media.src}
              width={media.width}
              height={media.height}
              className="h-auto w-[260px] max-w-full object-cover object-top sm:w-[280px]"
              loading="lazy"
              decoding="async"
              alt={media.alt}
            />
          </picture>
        </div>
      ) : (
        <picture>
          {media.webpSrc ? <source srcSet={media.webpSrc} type="image/webp" /> : null}
          <img
            src={media.src}
            width={media.width}
            height={media.height}
            className="w-full object-cover object-center"
            loading="lazy"
            decoding="async"
            alt={media.alt}
          />
        </picture>
      )}
    </div>
  );

  const copyBlock = (
    <div>
      <p className="gqr-kicker">{eyebrow}</p>
      <h2 id={`${id}-title`} className="gqr-section-title mt-3">
        {title}
      </h2>
      <p className="gqr-section-sub mt-4">{lead}</p>
      <ul className="mt-6 space-y-3" role="list">
        {bullets.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-gqr-muted">
            <span className="mt-0.5 font-bold text-gqr-trust" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      {cta ? (
        <div className="mt-8">
          <LandingCtaLink cta={cta} variant="primary" />
        </div>
      ) : null}
    </div>
  );

  return (
    <section
      className="border-b border-white/[0.07] py-14 lg:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="gqr-container">
        <div
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {mediaBlock}
          {copyBlock}
        </div>
      </div>
    </section>
  );
}
