import { ComparisonTable } from '@/components/expert-blog/ComparisonTable';
import { ExpertHeading } from '@/components/expert-blog/ExpertHeading';
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
    <section
      className="mt-14 border-t border-slate-200 pt-14"
      aria-labelledby="deepinfo-comparison-heading"
    >
      <ExpertHeading
        id="deepinfo-comparison-heading"
        eyebrow="Vergleich"
        title="Manuell vs. digital: Was sich im Betrieb ändert"
        subtitle={`Für ${targetAudience} zeigt sich der Unterschied besonders bei Aktualität, Nachweisen und Zeitaufwand.`}
      />
      <div className="mt-8">
        <ComparisonTable
          leftColumnTitle={leftTitle}
          rightColumnTitle={rightTitle}
          rows={rows}
          caption="Vergleich Excel oder Papier mit Gefahrstoff-QR"
        />
      </div>
    </section>
  );
}
