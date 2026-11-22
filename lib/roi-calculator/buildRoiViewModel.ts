import {
  computeTimeSavings,
  formatGermanDecimal,
  formatGermanInteger,
  formatEuroWholeAmount,
  ROI_MIN_DISPLAY_FACTOR,
  type RoiCalculatorInput,
} from '@/lib/roi-calculator/computeTimeSavings';
import { formatRoiDuration, type RoiDurationDisplay } from '@/lib/roi-calculator/formatDuration';
import { resolveSoftwareTariff } from '@/lib/roi-calculator/resolveSoftwareTariff';
import { hourlyRateHint, ROI_COPY, softwareRoiLine, totalSubstancesLabel } from '@/lib/roi-calculator/roi-copy';

export interface RoiViewModel {
  totalSubstances: number;
  totalSubstancesText: string;
  traditional: RoiDurationDisplay;
  digital: RoiDurationDisplay;
  saved: RoiDurationDisplay;
  savedHoursLabel: string;
  costLabel: string;
  costEurFormatted: string;
  costHint: string;
  roiLine: string | null;
}

export function buildRoiViewModel(input: RoiCalculatorInput): RoiViewModel {
  const savings = computeTimeSavings(input);
  const tariff = resolveSoftwareTariff(input);
  const roiFactor =
    tariff.yearlyPriceEur > 0 ? savings.monetarySavingsEur / tariff.yearlyPriceEur : 0;

  return {
    totalSubstances: savings.totalSubstances,
    totalSubstancesText: totalSubstancesLabel(formatGermanInteger(savings.totalSubstances)),
    traditional: formatRoiDuration(savings.traditionalMinutes),
    digital: formatRoiDuration(savings.digitalMinutes),
    saved: formatRoiDuration(savings.savedMinutes),
    savedHoursLabel: formatGermanDecimal(savings.savedHours),
    costLabel: input.mode === 'sifa' ? ROI_COPY.sifaCostLabel : ROI_COPY.kmuCostLabel,
    costEurFormatted: formatEuroWholeAmount(savings.monetarySavingsEur),
    costHint: hourlyRateHint(savings.hourlyRateEur),
    roiLine:
      roiFactor >= ROI_MIN_DISPLAY_FACTOR
        ? softwareRoiLine(formatGermanInteger(tariff.yearlyPriceEur), formatGermanDecimal(roiFactor))
        : null,
  };
}
