import { HOME_HERO } from '@/config/home-sections/hero';
import { SecurityTrustBadgeList } from '@/components/home/SecurityTrustBadgeList';

/** Nutzen-Bullets + Sicherheits-Badges in der Hero-Linksspalte (neben ROI-Rechner). */
export function HeroInnerTrustSection() {
  return (
    <section className="sds-hero__trust-section" aria-labelledby="heroBenefitsTitle">
      <h2 id="heroBenefitsTitle" className="sr-only">
        Zentrale Vorteile
      </h2>
      <ul className="sds-hero__checks sds-hero__checks--stacked" aria-label="Zentrale Vorteile">
        {HOME_HERO.benefitBullets.map((bullet) => (
          <li key={bullet}>
            <span aria-hidden="true">✓</span>
            {bullet}
          </li>
        ))}
      </ul>
      <SecurityTrustBadgeList badges={HOME_HERO.trustBadges} className="sds-hero__trust" />
    </section>
  );
}
