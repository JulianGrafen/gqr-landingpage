import {
  AEO_CONTENT_UPDATED,
  APP_REGISTER_URL,
  B2B_NOTICE,
  CONTACT_EMAIL,
  CORE_FEATURES,
  HUMAN_IN_THE_LOOP_NOTICE,
  KEY_URLS,
  PRODUCT_ENTITY,
  SOCIAL_PROFILES,
  TARGET_AUDIENCES,
  toAbsoluteSiteUrl,
} from '@/config/aeo-config';
import { EXCEL_COMPARISON } from '@/config/home-sections/excel-comparison';
import { getAllIndustries } from '@/config/industry-solutions';
import { formatPlanPrice, PRICING_PLANS } from '@/config/pricing-plans';

function markdownLink(label: string, path: string, description?: string): string {
  const link = `[${label}](${toAbsoluteSiteUrl(path)})`;
  return description ? `- ${link}: ${description}` : `- ${link}`;
}

function section(heading: string, lines: readonly string[]): string {
  return [`## ${heading}`, '', ...lines].join('\n');
}

/**
 * /llms.txt nach llmstxt.org: H1, Blockquote-Zusammenfassung, danach Abschnitte mit Links.
 * Alle Inhalte stammen aus der zentralen AEO-Konfiguration.
 */
export function buildLlmsTxt(): string {
  const priceSummary = PRICING_PLANS.map((plan) => `${plan.name} ${formatPlanPrice(plan)} (${plan.limits})`).join(', ');

  return [
    `# ${PRODUCT_ENTITY.name}`,
    '',
    `> ${PRODUCT_ENTITY.summary} ${HUMAN_IN_THE_LOOP_NOTICE}`,
    '',
    `Stand: ${AEO_CONTENT_UPDATED}. ${B2B_NOTICE}`,
    '',
    section(
      'Kernzielgruppen',
      TARGET_AUDIENCES.map((audience, index) => `${index + 1}. ${audience.label}: ${audience.description}`),
    ),
    '',
    section(
      'Kernfunktionen',
      CORE_FEATURES.map((feature) => `- ${feature.term}: ${feature.explanation}`),
    ),
    '',
    section('Differenzierung zu Excel', [
      `| ${EXCEL_COMPARISON.columnLabels.criterion} | ${EXCEL_COMPARISON.columnLabels.manualWorkflow} | ${EXCEL_COMPARISON.columnLabels.gefahrstoffQrWorkflow} |`,
      '| --- | --- | --- |',
      ...EXCEL_COMPARISON.rows.map(
        (row) => `| ${row.criterion} | ${row.manualWorkflow} | ${row.gefahrstoffQrWorkflow} |`,
      ),
    ]),
    '',
    section('Fakten', [
      `- Datenschutz: ${PRODUCT_ENTITY.hosting}, SSL-verschlüsselt, Zwei-Faktor-Authentifizierung`,
      `- Betrieb: browserbasiert, keine Installation; QR-Notfallansicht ohne App auf jedem Smartphone`,
      `- Preise (zzgl. MwSt., monatlich kündbar; Standard: Jahreszahlung zum reduzierten Monatspreis): ${priceSummary}`,
      '- Zahlung: Online-Buchung; im SiFa Multi-Mandant-Tarif auch per PDF-Rechnung und Überweisung',
      `- Start: Self-Service-Registrierung ohne Kreditkarte unter ${APP_REGISTER_URL}`,
    ]),
    '',
    section(
      'Wichtige URLs',
      KEY_URLS.map((url) => markdownLink(url.label, url.path, url.description)),
    ),
    '',
    section(
      'Branchenlösungen',
      getAllIndustries().map((industry) => markdownLink(industry.label, `/loesungen/${industry.slug}/`)),
    ),
    '',
    section('Optional', [
      ...SOCIAL_PROFILES.map((profile) => `- [${profile.label}](${profile.url})`),
      `- Kontakt: ${CONTACT_EMAIL}`,
    ]),
    '',
  ].join('\n');
}
