import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { MULTI_TENANT_SIFA } from '@/config/home-sections/multi-tenant-sifa';

const HEADLINE_ID = 'multiTenantSifaHeadline';

/** Conversion-Sektion für externe SiFas und Arbeitsschutz-Büros (Multi-Mandant). */
export function MultiTenantSifaSection() {
  return (
    <section id={MULTI_TENANT_SIFA.sectionId} className={styles.sectionRaised} aria-labelledby={HEADLINE_ID}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{MULTI_TENANT_SIFA.eyebrow}</p>
          <h2 id={HEADLINE_ID} className={styles.headline}>
            {MULTI_TENANT_SIFA.headline}
          </h2>
          <p className={styles.lead}>{MULTI_TENANT_SIFA.intro}</p>
        </header>

        <ul className="grid list-none gap-6 p-0 sm:grid-cols-2">
          {MULTI_TENANT_SIFA.sellingPoints.map((point) => (
            <li key={point.title} className={styles.card}>
              <h3 className={`flex gap-2 ${styles.cardTitle}`}>
                <span className={styles.checkmark} aria-hidden="true">
                  ✓
                </span>
                {point.title}
              </h3>
              <p className={styles.cardText}>{point.description}</p>
            </li>
          ))}
        </ul>

        <div className={styles.ctaGroup}>
          <a className={`${styles.primaryCta} sds-hero__cta`} href={MULTI_TENANT_SIFA.primaryCta.href}>
            {MULTI_TENANT_SIFA.primaryCta.label}
          </a>
          <a className={`${styles.secondaryLink} sds-hero__cta`} href={MULTI_TENANT_SIFA.secondaryCta.href}>
            {MULTI_TENANT_SIFA.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
