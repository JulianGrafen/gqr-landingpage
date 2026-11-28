import type { OutputPreviewCopy } from '@/config/blog-cro/types';
import { GHS_ASSETS } from '@/lib/ghs/ghs-assets';

type SdbOutputPreviewCardProps = {
  copy: OutputPreviewCopy;
};

/**
 * Statische Vorschau „was nach dem SDB-Upload entsteht“ (Show, don't tell).
 * Werte sind ein Beispiel aus der Config, keine Live-Daten.
 */
export function SdbOutputPreviewCard({ copy }: SdbOutputPreviewCardProps) {
  const pictogram = GHS_ASSETS[copy.pictogramCode];

  return (
    <figure className="sdb-output-preview" aria-label={`${copy.eyebrow}: ${copy.productName}`}>
      <div className="sdb-output-preview__entry">
        <div className="sdb-output-preview__head">
          <img
            className="sdb-output-preview__pictogram"
            src={pictogram.src}
            alt={`${copy.pictogramCode}: ${pictogram.label}`}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="sdb-output-preview__eyebrow">{copy.eyebrow}</p>
            <p className="sdb-output-preview__product">{copy.productName}</p>
          </div>
        </div>
        <dl className="sdb-output-preview__fields">
          {copy.fields.map((field) => (
            <div key={field.label} className="sdb-output-preview__field">
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="sdb-output-preview__badges" aria-label="Zusätzlich erzeugt">
        {copy.draftBadges.map((badge) => (
          <li key={badge}>{badge}</li>
        ))}
      </ul>
      <figcaption className="sdb-output-preview__note">{copy.reviewNote}</figcaption>
    </figure>
  );
}
