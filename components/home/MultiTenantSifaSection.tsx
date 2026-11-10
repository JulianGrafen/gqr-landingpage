import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { MULTI_TENANT_SIFA } from '@/config/home-sections/multi-tenant-sifa';
import { formatEuroAmount } from '@/config/sifa-mandant-pricing';

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

        <aside
          className={`${styles.card} mx-auto mt-10 max-w-3xl text-center sm:text-left`}
          aria-labelledby="multiTenantSifaPricingHeadline"
        >
          <h3 id="multiTenantSifaPricingHeadline" className={styles.cardTitle}>
            {MULTI_TENANT_SIFA.pricingCallout.headline}
          </h3>
          {MULTI_TENANT_SIFA.pricingCallout.paragraphs.map((paragraph) => (
            <p key={paragraph} className={`${styles.cardText} mt-3`}>
              {paragraph}
            </p>
          ))}
          <ul className="mt-4 list-none space-y-2 p-0 text-sm leading-relaxed text-[#c5d0e2]">
            {MULTI_TENANT_SIFA.pricingCallout.examples.map((example) => (
              <li key={example.mandanten}>
                <span className="font-semibold text-[#f0f6ff]">
                  {example.mandanten} betreute Firmen
                </span>
                : {formatEuroAmount(example.totalMonthlyEur)}/Monat (ca.{' '}
                {formatEuroAmount(example.perMandantEur)} pro Betrieb){' '}
                <span className="text-[#8fa4c0]">· {example.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-[#8fa4c0]">
            {MULTI_TENANT_SIFA.pricingCallout.footnote}
          </p>
          <p className="mt-4">
            <a className={styles.secondaryLink} href={MULTI_TENANT_SIFA.pricingCallout.preiseHref}>
              Alle Pakete im Überblick
            </a>
          </p>
        </aside>

        <div className={styles.ctaGroup}>
          <a className={`${styles.primaryCta} sds-hero__cta`} href={MULTI_TENANT_SIFA.primaryCta.href}>
            {MULTI_TENANT_SIFA.primaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
