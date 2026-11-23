import { formatGermanDecimal, roundToOneDecimal } from '@/lib/roi-calculator/computeTimeSavings';

export type RoiDurationUnit = 'h' | 'min';

export interface RoiDurationDisplay {
  value: string;
  unit: RoiDurationUnit;
}

/** Stunden mit einer Nachkommastelle; `min` nur unter 60 Minuten. */
export function formatRoiDuration(minutes: number): RoiDurationDisplay {
  if (minutes < 60) {
    return { value: String(Math.round(minutes)), unit: 'min' };
  }
  return { value: formatGermanDecimal(roundToOneDecimal(minutes / 60)), unit: 'h' };
}
