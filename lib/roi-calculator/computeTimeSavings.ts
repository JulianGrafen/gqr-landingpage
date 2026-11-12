export const ROI_MINUTES_MANUAL_PER_SUBSTANCE = 20;
export const ROI_MINUTES_DIGITAL_PER_SUBSTANCE = 3;
export const ROI_SIFA_HOURLY_RATE_EUR = 100;

export const ROI_SUBSTANCE_SLIDER = {
  min: 5,
  max: 150,
  step: 5,
  default: 20,
} as const;

export const ROI_CLIENT_SLIDER = {
  min: 2,
  max: 50,
  step: 1,
  default: 10,
} as const;

export type RoiCalculatorMode = 'kmu' | 'sifa';

export interface RoiCalculatorInput {
  mode: RoiCalculatorMode;
  substancesPerScope: number;
  clientCount: number;
}

export interface RoiTimeSavingsResult {
  totalSubstances: number;
  traditionalMinutes: number;
  digitalMinutes: number;
  savedMinutes: number;
  savedHours: number;
  traditionalHours: number;
  honorPotentialEur: number | null;
}

function roundToOneDecimal(hours: number): number {
  return Math.round(hours * 10) / 10;
}

/** Gesamtanzahl Stoffe je nach Betriebs- oder SiFa-Modus. */
export function resolveTotalSubstances(input: RoiCalculatorInput): number {
  if (input.mode === 'kmu') {
    return input.substancesPerScope;
  }
  return input.substancesPerScope * input.clientCount;
}

export function computeTimeSavings(input: RoiCalculatorInput): RoiTimeSavingsResult {
  const totalSubstances = resolveTotalSubstances(input);

  const traditionalMinutes = totalSubstances * ROI_MINUTES_MANUAL_PER_SUBSTANCE;
  const digitalMinutes = totalSubstances * ROI_MINUTES_DIGITAL_PER_SUBSTANCE;
  const savedMinutes = traditionalMinutes - digitalMinutes;

  const savedHours = roundToOneDecimal(savedMinutes / 60);
  const traditionalHours = roundToOneDecimal(traditionalMinutes / 60);

  const honorPotentialEur =
    input.mode === 'sifa' ? Math.round(savedHours * ROI_SIFA_HOURLY_RATE_EUR) : null;

  return {
    totalSubstances,
    traditionalMinutes,
    digitalMinutes,
    savedMinutes,
    savedHours,
    traditionalHours,
    honorPotentialEur,
  };
}

export function formatGermanDecimal(value: number, fractionDigits = 1): string {
  return value.toFixed(fractionDigits).replace('.', ',');
}

export function formatEuroWholeAmount(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}
