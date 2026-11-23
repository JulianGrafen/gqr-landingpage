import {
  KMU_BASIS_SUBSTANCE_LIMIT,
  KMU_PRO_SUBSTANCE_LIMIT,
  PRICING_PLANS,
  type PricingPlan,
  type PricingPlanId,
} from '@/config/pricing-plans';
import {
  SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR,
  sifaExtensionBlockCount,
} from '@/config/sifa-mandant-pricing';
import type { RoiCalculatorInput } from '@/lib/roi-calculator/computeTimeSavings';

export interface SoftwareTariff {
  planId: PricingPlanId;
  yearlyPriceEur: number;
  monthlyEquivalentEur: number;
}

function requirePlan(id: PricingPlanId): PricingPlan {
  const plan = PRICING_PLANS.find((entry) => entry.id === id);
  if (!plan) {
    throw new Error(`Pricing plan missing: ${id}`);
  }
  return plan;
}

function yearlyTotalFromPlan(plan: PricingPlan): number {
  if (plan.yearlyTotalPriceEur !== null) return plan.yearlyTotalPriceEur;
  const monthly = plan.yearlyMonthlyPriceEur ?? plan.monthlyPriceEur;
  return monthly * 12;
}

function tariffFromPlan(id: PricingPlanId): SoftwareTariff {
  const plan = requirePlan(id);
  const monthlyEquivalentEur = plan.yearlyMonthlyPriceEur ?? plan.monthlyPriceEur;
  return {
    planId: plan.id,
    yearlyPriceEur: yearlyTotalFromPlan(plan),
    monthlyEquivalentEur,
  };
}

/**
 * Jahres-Abo zum wirksamen Einführungspreis (Jahreszahlung).
 * SiFa-Blöcke: Listenpreis 79 €/Monat, hier der Jahres-Äquivalenzpreis (gerundet 66 €/Monat).
 */
export function resolveSoftwareTariff(input: RoiCalculatorInput): SoftwareTariff {
  if (input.mode === 'sifa') {
    const plan = requirePlan('sifa-multi-mandant');
    const yearlyMonthly = plan.yearlyMonthlyPriceEur ?? plan.monthlyPriceEur;
    const extraBlocks = sifaExtensionBlockCount(input.clientCount);
    const extraBlockYearlyMonthly = Math.round(
      (SIFA_MANDANT_BLOCK_PRICE_MONTHLY_EUR * yearlyMonthly) / plan.monthlyPriceEur,
    );
    const yearlyPriceEur = yearlyTotalFromPlan(plan) + extraBlocks * extraBlockYearlyMonthly * 12;
    return {
      planId: plan.id,
      yearlyPriceEur,
      monthlyEquivalentEur: yearlyMonthly + extraBlocks * extraBlockYearlyMonthly,
    };
  }

  if (input.substancesPerScope <= KMU_BASIS_SUBSTANCE_LIMIT) {
    return tariffFromPlan('kmu-basis');
  }
  if (input.substancesPerScope <= KMU_PRO_SUBSTANCE_LIMIT) {
    return tariffFromPlan('kmu-pro');
  }
  return tariffFromPlan('industrie');
}
