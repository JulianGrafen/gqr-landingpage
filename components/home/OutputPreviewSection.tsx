import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { OUTPUT_PREVIEW, type OutputPreviewCard } from '@/config/home-sections/output-preview';

function OutputCard({ card }: { card: OutputPreviewCard }) {
  return (
    <li className={`flex flex-col ${styles.card}`}>
      {card.image ? (
        <div className="mb-5 flex min-h-[180px] items-center justify-center overflow-hidden rounded-xl bg-[#0a1628]/60 p-3">
          <img
            src={card.image.src}
            alt={card.image.alt}
            width={card.image.width}
            height={card.image.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-lg"
          />
        </div>
      ) : null}
      <p className={styles.eyebrow}>{card.kicker}</p>
      <h3 className={styles.cardTitle}>{card.title}</h3>
      <ul className="mt-3 list-none space-y-2 p-0">
        {card.points.map((point) => (
          <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#8fa4c0]">
            <span className={styles.checkmark} aria-hidden="true">
              ✓
            </span>
            {point}
          </li>
        ))}
      </ul>
      {card.downloadCta ? (
        <div className="mt-auto pt-6">
          <a
            className="btn-glass-outline btn-glass-outline--block"
            href={card.downloadCta.href}
            download={card.downloadCta.download}
          >
            {card.downloadCta.label}
          </a>
        </div>
      ) : null}
    </li>
  );
}

/** Output-Vorschau der drei Kernergebnisse (ohne SDB-Mapping-Tabelle). */
export function OutputPreviewSection() {
  return (
    <section id={OUTPUT_PREVIEW.sectionId} className={styles.sectionRaised} aria-label="Ergebnisse in der App">
      <div className={styles.container}>
        <ul className="grid list-none gap-6 p-0 lg:grid-cols-3">
          {OUTPUT_PREVIEW.cards.map((card) => (
            <OutputCard key={card.id} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
}
