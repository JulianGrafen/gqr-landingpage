import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { OUTPUT_PREVIEW, type OutputPreviewCard } from '@/config/home-sections/output-preview';

/** Stilisiertes A4-Blatt der Betriebsanweisung (kein Screenshot, rein aus den Abschnittstiteln). */
function BaSheetPreview() {
  return (
    <div
      className="mx-auto aspect-[210/297] w-full max-w-[220px] rounded-md border-4 border-[#ff6b35] bg-white p-3 text-left shadow-lg"
      aria-hidden="true"
    >
      <p className="text-[9px] font-black uppercase tracking-wider text-slate-900">Betriebsanweisung</p>
      <p className="text-[7px] text-slate-500">gemäß TRGS 555 · Entwurf</p>
      <ul className="mt-2 list-none space-y-1.5 p-0">
        {OUTPUT_PREVIEW.baPreviewSections.map((section) => (
          <li key={section}>
            <p className="rounded-sm bg-[#ff6b35] px-1 text-[7px] font-bold text-white">{section}</p>
            <span className="mt-0.5 block h-1 w-full rounded bg-slate-200" />
            <span className="mt-0.5 block h-1 w-3/4 rounded bg-slate-200" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function OutputCard({ card }: { card: OutputPreviewCard }) {
  return (
    <li className={`flex flex-col ${styles.card}`}>
      <div className="mb-5 flex min-h-[180px] items-center justify-center overflow-hidden rounded-xl bg-[#0a1628]/60 p-3">
        {card.image ? (
          <img
            src={card.image.src}
            alt={card.image.alt}
            width={card.image.width}
            height={card.image.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-lg"
          />
        ) : (
          <BaSheetPreview />
        )}
      </div>
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
