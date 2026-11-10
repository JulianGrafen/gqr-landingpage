import { HOME_HERO_TRUST_GRID, type HeroTrustLogo } from '@/config/home-sections/hero-trust-grid';

function TrustLogoCell({ logo }: { logo: HeroTrustLogo }) {
  const itemClass = [
    'sds-hero__trust-logos-item',
    logo.lightSurface ? 'sds-hero__trust-logos-item--light' : '',
    logo.darkSurface ? 'sds-hero__trust-logos-item--dark' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const image = (
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      loading="lazy"
      decoding="async"
      className="sds-hero__trust-logos-img"
    />
  );

  if (logo.href) {
    return (
      <a
        className={itemClass}
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        title={logo.linkTitle ?? 'Externen Link öffnen (neuer Tab)'}
      >
        {image}
      </a>
    );
  }

  return <p className={`${itemClass} sds-hero__trust-logos-item--static`}>{image}</p>;
}

/** Dezentes Logo-Grid direkt unter Copy & Live-Demo im Hero. */
export function HeroTrustLogoGrid() {
  const { kicker, logos } = HOME_HERO_TRUST_GRID;

  return (
    <div className="sds-hero__trust-logos" aria-labelledby="heroTrustGridLabel">
      <p id="heroTrustGridLabel" className="sds-hero__trust-logos-kicker">
        {kicker}
      </p>
      <ul className="sds-hero__trust-logos-grid" role="list">
        {logos.map((logo) => (
          <li key={logo.id} className="sds-hero__trust-logos-cell">
            <TrustLogoCell logo={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
