/**
 * Mapping CaseStudy (data/caseStudies.ts) → gemeinsame Decision-Layer-Seitenstruktur.
 * Seriengleiche Texte (Sektionstitel, CTA) für alle Praxisbeispiele stehen nur hier.
 */
import { APP_REGISTER_URL } from '@/config/aeo-config';
import type { SeoSiloStep } from '@/config/seo-silo/types';
import { SICHERHEIT_AVV_PATH } from '@/config/trust/decision-pages';
import type { FactTable, TrustPageConfig } from '@/config/trust/types';
import { caseStudyPath, type CaseStudy, type CompanySizeBand } from '@/data/caseStudies';

const COMPANY_SIZE_LABEL: Record<CompanySizeBand, string> = {
  '1-9': '1–9 Beschäftigte',
  '10-49': '10–49 Beschäftigte',
  '50-249': '50–249 Beschäftigte',
  '250+': 'ab 250 Beschäftigte',
};

export const CASE_STUDY_SECTIONS = {
  challenge: { id: 'ausgangslage', eyebrow: 'Ausgangslage', title: 'Wo der Betrieb stand' },
  solution: { id: 'umsetzung', title: 'Umsetzung', subline: 'Die Schritte in der Reihenfolge, in der sie im Projekt umgesetzt wurden.' },
  metrics: { id: 'vorher-nachher', eyebrow: 'Ergebnis', title: 'Vorher und nachher' },
  quote: { id: 'stimme', eyebrow: 'Aus dem Betrieb', title: 'Einschätzung' },
} as const;

export function isCaseStudyIndexable(caseStudy: CaseStudy): boolean {
  return caseStudy.status === 'published';
}

export function buildCaseStudyPageConfig(caseStudy: CaseStudy): TrustPageConfig {
  return {
    path: caseStudyPath(caseStudy.slug),
    seo: {
      title: `Praxisbeispiel: ${caseStudy.title}`,
      description: caseStudy.seoDescription,
      ogImageAlt: `Praxisbeispiel Gefahrstoff-QR: ${caseStudy.title}`,
    },
    breadcrumbLabel: caseStudy.title,
    // TODO(praxisbeispiele-hub): breadcrumbParent { label: 'Praxisbeispiele', href: '/praxisbeispiele/' }
    // ergänzen, sobald es mehr als eine veröffentlichte Fallstudie und eine Übersichtsseite gibt.
    hero: {
      eyebrow: `Praxisbeispiel · ${caseStudy.industry}`,
      h1: caseStudy.title,
      answer: caseStudy.summary,
    },
    faq: [],
    closingCta: {
      headline: 'Den gleichen Weg mit Ihrem Bestand gehen',
      body: 'Starten Sie mit Ihren vorhandenen Sicherheitsdatenblättern. Die Excel-Liste können Sie parallel weiterführen, bis das Kataster freigegeben ist.',
      primary: { label: 'Kostenlos starten', href: APP_REGISTER_URL, external: true },
      secondary: { label: 'Kauf auf Rechnung & AVV', href: SICHERHEIT_AVV_PATH },
      note: 'Ausschließlich für Unternehmen (§ 14 BGB).',
    },
    datePublished: caseStudy.datePublished,
    dateModified: caseStudy.dateModified,
  };
}

export function buildCaseStudyFacts(caseStudy: CaseStudy): { label: string; value: string }[] {
  return [
    { label: 'Branche', value: caseStudy.industry },
    { label: 'Betriebsgröße', value: COMPANY_SIZE_LABEL[caseStudy.companySize] },
    { label: 'Betrieb', value: caseStudy.companyLabel },
    { label: 'Projektdauer', value: caseStudy.projectDuration },
  ];
}

export function buildCaseStudySteps(caseStudy: CaseStudy): SeoSiloStep[] {
  return caseStudy.solutionSteps.map((step, index) => ({
    id: step.id,
    number: index + 1,
    title: step.title,
    description: step.description,
    regulatoryRef: step.regulatoryRef,
  }));
}

export function buildCaseStudyMetricsTable(caseStudy: CaseStudy): FactTable {
  return {
    caption: `Vorher-Nachher-Vergleich: ${caseStudy.title}`,
    columnLabels: ['Bereich', 'Vorher', 'Nachher'],
    rows: caseStudy.beforeAfterMetrics.map((metric) => ({
      label: metric.label,
      values: [metric.before, metric.after],
    })),
  };
}
