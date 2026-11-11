import { APP_REGISTER_URL, HUMAN_IN_THE_LOOP_NOTICE, PRODUCT_ENTITY } from '@/config/aeo-config';
import {
  formatEuro,
  formatPlanPrice,
  PRICING_PLANS,
  PRICING_UPDATED_LABEL,
  yearlyMonthlyPrice,
  yearlyTotalPrice,
  type PricingPlan,
} from '@/config/pricing-plans';

function describePrice(plan: PricingPlan): string {
  if (plan.monthlyPriceEur === 0) return formatEuro(0);
  const monthlyWhenYearly = yearlyMonthlyPrice(plan);
  const yearlyTotal = yearlyTotalPrice(plan);
  return `${formatPlanPrice(plan, 'monthly')} (bei Jahreszahlung ${formatEuro(monthlyWhenYearly)}/Monat, ${formatEuro(yearlyTotal)}/Jahr)`;
}

function renderPlan(plan: PricingPlan): string {
  const heading = plan.isRecommended ? `## ${plan.name} (empfohlen)` : `## ${plan.name}`;
  const lines = [
    heading,
    `- Preis: ${describePrice(plan)}`,
    `- Limits: ${plan.limits}`,
    `- Leistungen: ${plan.features.join(', ')}`,
  ];
  return lines.join('\n');
}

/** /pricing.md: maschinenlesbare Preisübersicht aus config/pricing-plans.ts. */
export function buildPricingMarkdown(): string {
  return [
    `# Preise: ${PRODUCT_ENTITY.name}`,
    '',
    `Stand: ${PRICING_UPDATED_LABEL}. Alle Preise zzgl. MwSt. Monatliche Abrechnung, monatlich kündbar. Standard-Ansicht: jährliche Vorauszahlung zum reduzierten Monatspreis (49 / 99 / 159 €; Industrie 399 €). Angebot ausschließlich für Unternehmen, Gewerbetreibende und freiberufliche Sicherheitsfachkräfte (§ 14 BGB).`,
    `Registrierung ohne Kreditkarte: ${APP_REGISTER_URL}`,
    '',
    `Hinweis: KI-Funktionen liefern Entwürfe. ${HUMAN_IN_THE_LOOP_NOTICE}`,
    '',
    ...PRICING_PLANS.flatMap((plan) => [renderPlan(plan), '']),
    '## In allen bezahlten Paketen',
    '- Aktive QR-Notfallansicht am Arbeitsplatz',
    `- ${PRODUCT_ENTITY.hosting}, SSL-Verschlüsselung`,
    '- Browserbasiert, keine Installation',
    '',
  ].join('\n');
}
