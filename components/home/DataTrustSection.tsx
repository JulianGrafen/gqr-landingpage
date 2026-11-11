import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { HOME_DATA_TRUST } from '@/config/home-sections/data-trust';

const HEADLINE_ID = 'dataTrustHeadline';

/** 3-Spalten-Trust-Box: KI-Verarbeitung, Hosting, Export / Datenhoheit. */
export function DataTrustSection() {
  return (
    <section
      id={HOME_DATA_TRUST.sectionId}
      className={styles.sectionRaised}
      aria-labelledby={HEADLINE_ID}
    >
      <div className={styles.container}>
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className={styles.eyebrow}>{HOME_DATA_TRUST.eyebrow}</p>
          <h2 id={HEADLINE_ID} className={styles.headline}>
            {HOME_DATA_TRUST.headline}
          </h2>
        </header>

        <ul className="grid list-none gap-6 p-0 lg:grid-cols-3 lg:items-stretch">
          {HOME_DATA_TRUST.pillars.map((pillar) => (
            <li key={pillar.title} className={`${styles.card} ${styles.trustCard}`}>
              <h3 className={styles.trustCardTitle}>
                <span className={styles.trustCardTitleMark} aria-hidden="true">
                  ✓
                </span>
                <span className={styles.trustCardTitleText}>{pillar.title}</span>
              </h3>
              <p className={styles.trustCardBody}>{pillar.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
