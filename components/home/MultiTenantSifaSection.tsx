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
            {MULTI_TENANT_SIFA.headlineLead}
            <br />
            {MULTI_TENANT_SIFA.headlineRest}
          </h2>
          <p className={styles.lead}>{MULTI_TENANT_SIFA.intro}</p>
        </header>

        <div className={styles.sifaAccordion} role="list">
          {MULTI_TENANT_SIFA.sellingPoints.map((point, index) => (
            <details
              key={point.title}
              className={styles.sifaAccordionItem}
              role="listitem"
              open={index === 0}
            >
              <summary className={styles.sifaAccordionSummary}>
                <span className={`${styles.checkmark} shrink-0`} aria-hidden="true">
                  ✓
                </span>
                <span>{point.title}</span>
              </summary>
              <div className={styles.sifaAccordionBody}>
                <p className="m-0">{point.description}</p>
              </div>
            </details>
          ))}
        </div>

        <div className={styles.ctaGroup}>
          <a className={`${styles.primaryCta} sds-hero__cta`} href={MULTI_TENANT_SIFA.primaryCta.href}>
            {MULTI_TENANT_SIFA.primaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
