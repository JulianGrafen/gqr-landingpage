import { OUTPUT_PREVIEW } from '@/config/home-sections/output-preview';
import { BA_SAMPLE_PDF_EMBED_SRC } from '@/components/ui/ba-sample-pdf-embed-src';

type Props = {
  /** Zusätzliche Klassen auf `.output-preview-pdf-embed` (z. B. `--spotlight`, `--pseo`). */
  embedClassName?: string;
  /** iframe title; Standard wie Startseite #ergebnis. */
  title?: string;
};

/** Eingebettete Muster-BA (A4-PDF) — gleiche Quelle wie `#ergebnis`. */
export function BaSamplePdfEmbed({
  embedClassName = 'output-preview-pdf-embed--spotlight',
  title = OUTPUT_PREVIEW.baSpotlight.pdfEmbed.title,
}: Props) {
  return (
    <div className={`output-preview-pdf-embed ${embedClassName}`.trim()}>
      <iframe
        src={BA_SAMPLE_PDF_EMBED_SRC}
        title={title}
        className="output-preview-pdf-embed__frame"
        loading="lazy"
      />
    </div>
  );
}