import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { CORE_FEATURES, type CoreFeatureCard } from '@/config/home-sections/core-features';

function FeatureCard({ card }: { card: CoreFeatureCard }) {
  return (
    <li className={`${styles.card} flex h-full flex-col`}>
      <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
        {card.eyebrow}
        {card.badge ? (
          <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-2 py-0.5 text-[0.65rem] normal-case tracking-normal text-teal-300">
            {card.badge}
          </span>
        ) : null}
      </p>
      <h3 className={styles.cardTitle}>{card.title}</h3>
      <p className={styles.cardText}>{card.description}</p>
      <ul className="mt-4 list-none space-y-2 p-0">
        {card.points.map((point) => (
          <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#c5d0e2]">
            <span className={styles.checkmark} aria-hidden="true">
              ✓
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Kernfunktionen (AEO:CORE_FEATURES): 4 Karten + kompakter Batch-Upload-Hinweis. */
export function CoreFeaturesSection() {
  const { importHint } = CORE_FEATURES;

  return (
    <section id={CORE_FEATURES.sectionId} className={styles.sectionRaised} aria-labelledby={CORE_FEATURES.headlineId}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{CORE_FEATURES.eyebrow}</p>
          <h2 id={CORE_FEATURES.headlineId} className={styles.headline}>
            {CORE_FEATURES.headline}
          </h2>
          <p className={styles.lead}>{CORE_FEATURES.lead}</p>
        </header>

        <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_FEATURES.cards.map((card) => (
            <FeatureCard key={card.eyebrow} card={card} />
          ))}
        </ul>

        <aside
          className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0f1e35]/40 px-6 py-5 text-center sm:flex-row sm:text-left"
          aria-label={importHint.title}
        >
          <p className="m-0 flex-1 text-sm leading-relaxed text-[#8fa4c0]">
            <strong className="text-[#f0f6ff]">{importHint.title}:</strong> {importHint.text}
          </p>
          <a className={`${styles.secondaryLink} shrink-0 text-sm font-semibold`} href={importHint.link.href}>
            {importHint.link.label}
          </a>
        </aside>
      </div>
    </section>
  );
}
