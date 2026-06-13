import { ComparisonTable } from '@/components/expert-blog/ComparisonTable';
import {
  DEFAULT_COMPARISON_TITLES,
  DEFAULT_MANUAL_VS_GQR_ROWS,
} from '@/config/wissen/default-comparison';
import type { DeepinfoComparisonConfig } from '@/lib/wissen/types';

type ManualVsGqrComparisonProps = {
  targetAudience: string;
  comparison?: DeepinfoComparisonConfig;
};

export function ManualVsGqrComparison({
  targetAudience,
  comparison,
}: ManualVsGqrComparisonProps) {
  const rows = (comparison?.rows ?? DEFAULT_MANUAL_VS_GQR_ROWS).map((row) => ({
    criterion: row.criterion,
    excel: row.manual,
    extraction: row.gqr,
  }));

  const leftTitle = comparison?.leftColumnTitle ?? DEFAULT_COMPARISON_TITLES.leftColumnTitle;
  const rightTitle = comparison?.rightColumnTitle ?? DEFAULT_COMPARISON_TITLES.rightColumnTitle;

  return (
    <section className="gqr-post-section" aria-labelledby="deepinfo-comparison-heading">
      <p className="gqr-kicker">Vergleich</p>
      <h2 id="deepinfo-comparison-heading" className="gqr-post-section-title">
        Manuell vs. digital: Was sich im Betrieb ändert
      </h2>
      <p className="gqr-post-section-sub">
        Für {targetAudience} zeigt sich der Unterschied besonders bei Aktualität, Nachweisen und
        Zeitaufwand.
      </p>
      <ComparisonTable
        leftColumnTitle={leftTitle}
        rightColumnTitle={rightTitle}
        rows={rows}
        caption="Vergleich Excel oder Papier mit Gefahrstoff-QR"
        tone="dark"
      />
    </section>
  );
}
