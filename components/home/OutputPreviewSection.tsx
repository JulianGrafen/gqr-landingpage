import { HOME_SECTION_STYLES as styles } from '@/components/home/home-section-styles';
import { BaPreviewTiltFrame } from '@/components/ui/BaPreviewTiltFrame';
import { OUTPUT_PREVIEW } from '@/config/home-sections/output-preview';

function BetriebsanweisungSpotlightCard() {
  const spotlight = OUTPUT_PREVIEW.baSpotlight;
  const embedSrc = `${spotlight.pdfEmbed.href}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=Fit`;

  return (
    <article
      id={spotlight.sectionAnchorId}
      className="output-preview-ba-spotlight"
      aria-labelledby="output-preview-ba-title"
    >
      <div className="output-preview-ba-spotlight__inner">
        <div className="output-preview-ba-spotlight__copy">
          <p className={styles.eyebrow}>{spotlight.kicker}</p>
          <h3 id="output-preview-ba-title" className="text-xl font-bold text-[#f0f6ff] sm:text-2xl">
            {spotlight.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#8fa4c0]">{spotlight.lead}</p>
          <ul className="mt-4 list-none space-y-2 p-0">
            {spotlight.points.map((point) => (
              <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#8fa4c0]">
                <span className={styles.checkmark} aria-hidden="true">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <a
            className="btn-glass-outline btn-glass-outline--block mt-6 max-w-sm"
            href={spotlight.downloadCta.href}
            download={spotlight.downloadCta.download}
          >
            {spotlight.downloadCta.label}
          </a>
        </div>
        <div className="output-preview-ba-spotlight__media">
          <BaPreviewTiltFrame className="output-preview-ba-tilt">
            <div className="output-preview-pdf-embed output-preview-pdf-embed--spotlight">
              <iframe
                src={embedSrc}
                title={spotlight.pdfEmbed.title}
                className="output-preview-pdf-embed__frame"
                loading="lazy"
              />
            </div>
          </BaPreviewTiltFrame>
        </div>
      </div>
    </article>
  );
}

/** Muster-Betriebsanweisung im Abschnitt #ergebnis. */
export function OutputPreviewSection() {
  return (
    <section id={OUTPUT_PREVIEW.sectionId} className={styles.sectionRaised} aria-label="Ergebnisse in der App">
      <div className={styles.container}>
        <BetriebsanweisungSpotlightCard />
      </div>
    </section>
  );
}
