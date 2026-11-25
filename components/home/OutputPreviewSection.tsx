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
          <p className={`${styles.eyebrow} sm:text-base`}>{spotlight.kicker}</p>
          <h3
            id="output-preview-ba-title"
            className="text-2xl font-black leading-tight text-[#f0f6ff] sm:text-3xl lg:text-4xl"
          >
            {spotlight.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[#8fa4c0] sm:text-lg">{spotlight.lead}</p>
          <ul className="mt-5 list-none space-y-3 p-0 sm:space-y-3.5">
            {spotlight.points.map((point) => (
              <li
                key={point}
                className="flex gap-2.5 text-base leading-relaxed text-[#8fa4c0] sm:text-lg sm:leading-relaxed"
              >
                <span className={`${styles.checkmark} text-lg sm:text-xl`} aria-hidden="true">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <a
            className="btn-glass-outline btn-glass-outline--block mt-8 max-w-md text-base sm:text-lg"
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
