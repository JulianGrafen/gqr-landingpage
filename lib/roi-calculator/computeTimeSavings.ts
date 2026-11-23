export const ROI_MINUTES_MANUAL_PER_SUBSTANCE = 20;
export const ROI_MINUTES_DIGITAL_PER_SUBSTANCE = 3;
export const ROI_SIFA_HOURLY_RATE_EUR = 100;
/** Interner Stundensatz KMU (SiFa/Arbeitsschutz, untere Mitte 60 bis 80 €). */
export const ROI_KMU_HOURLY_RATE_EUR = 65;
/** ROI-Zeile nur ab diesem Verhältnis Ersparnis / Jahrespreis. */
export const ROI_MIN_DISPLAY_FACTOR = 1.5;

export const ROI_SUBSTANCE_SLIDER = {
  min: 5,
  max: 150,
  step: 5,
  kmuDefault: 35,
  sifaDefault: 25,
} as const;

export const ROI_CLIENT_SLIDER = {
  min: 2,
  max: 50,
  step: 1,
  default: 15,
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
  hourlyRateEur: number;
  monetarySavingsEur: number;
  honorPotentialEur: number | null;
}

export function roundToOneDecimal(hours: number): number {
  return Math.round(hours * 10) / 10;
}

export function resolveHourlyRateEur(mode: RoiCalculatorMode): number {
  return mode === 'sifa' ? ROI_SIFA_HOURLY_RATE_EUR : ROI_KMU_HOURLY_RATE_EUR;
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
  const hourlyRateEur = resolveHourlyRateEur(input.mode);
  const monetarySavingsEur = Math.round(savedHours * hourlyRateEur);

  return {
    totalSubstances,
    traditionalMinutes,
    digitalMinutes,
    savedMinutes,
    savedHours,
    traditionalHours,
    hourlyRateEur,
    monetarySavingsEur,
    honorPotentialEur: input.mode === 'sifa' ? monetarySavingsEur : null,
  };
}

export function formatGermanDecimal(value: number, fractionDigits = 1): string {
  return value.toFixed(fractionDigits).replace('.', ',');
}

export function formatGermanInteger(value: number): string {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(value);
}

export function formatEuroWholeAmount(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}
