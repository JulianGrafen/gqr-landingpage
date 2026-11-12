import { HOME_HERO_REGELWERK } from '@/config/home-sections/hero-trust-grid';

/** Regelwerk-Badges unter ROI-Rechner im Hero (#hero). */
export function HeroRegelwerkStrip() {
  const { title, ariaLabel, badges } = HOME_HERO_REGELWERK;

  return (
    <section className="sds-hero__regelwerk sds-hero__regelwerk--below-roi" aria-label={ariaLabel}>
      <h2 className="sds-hero__regelwerk-title">{title}</h2>
      <ul className="sds-hero__regelwerk-badges" role="list">
        {badges.map((badge) => (
          <li key={badge.id} className="sds-hero__regelwerk-badge">
            <span className="sds-hero__regelwerk-code">{badge.code}</span>
            <span className="sds-hero__regelwerk-label">{badge.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
