import { SecurityTrustBadgeList } from '@/components/home/SecurityTrustBadgeList';
import { HOME_HERO } from '@/config/home-sections/hero';
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
    <span className="sds-hero__trust-logos-img-slot">
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
        className="sds-hero__trust-logos-img"
        style={
          logo.displayScale && logo.displayScale !== 1
            ? { transform: `scale(${logo.displayScale})` }
            : undefined
        }
      />
    </span>
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

/** Sicherheits-Badges + Presse-/Verzeichnis-Logo-Grid unter dem Hero. */
export function HeroTrustLogoGrid() {
  const { ariaLabel, logos } = HOME_HERO_TRUST_GRID;

  return (
  <>
    <SecurityTrustBadgeList badges={HOME_HERO.trustBadges} className="sds-hero__trust sds-hero__trust--above-logos" />
    <div className="sds-hero__trust-logos" aria-label={ariaLabel}>
      <ul className="sds-hero__trust-logos-grid" role="list">
        {logos.map((logo) => (
          <li key={logo.id} className="sds-hero__trust-logos-cell">
            <TrustLogoCell logo={logo} />
          </li>
        ))}
      </ul>
    </div>
  </>
  );
}
