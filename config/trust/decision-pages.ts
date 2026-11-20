/**
 * Registry des Decision-Layers: einzige Quelle für Links auf die Vertrauens- und Einkaufsseiten.
 * Konsumenten: Footer (config/site-footer.ts), Preis-Sektion (index.html via sync:home),
 * Querverweise auf den Trust-Seiten, /llms.txt.
 */
import type { DecisionPageId, DecisionPageLink } from '@/config/trust/types';
import { caseStudyPath, getPublishedCaseStudies } from '@/data/caseStudies';

export const KI_PIPELINE_PATH = '/so-funktioniert-die-ki/' as const;
export const SICHERHEIT_AVV_PATH = '/sicherheit-avv/' as const;

const STATIC_DECISION_PAGES: readonly DecisionPageLink[] = [
  {
    id: 'ki-pipeline',
    href: KI_PIPELINE_PATH,
    navLabel: 'So funktioniert die KI',
    teaserTitle: 'Wie die KI prüft',
    teaserText: 'Extraktion, Regelprüfung, Abgleich am Original-SDB, Versions-Diff. Freigabe bleibt bei der SiFa.',
    footerColumn: 'product',
  },
  {
    id: 'sicherheit-avv',
    href: SICHERHEIT_AVV_PATH,
    navLabel: 'Sicherheit & AVV',
    teaserTitle: 'Kauf auf Rechnung & AVV',
    teaserText: 'AVV direkt als PDF, Bestellung mit PO-Nummer, Lieferanten-Stammdaten zum Kopieren.',
    footerColumn: 'legal',
  },
];

/** Neueste veröffentlichte Fallstudie (Entwürfe werden nie verlinkt). */
function buildCaseStudyLink(): DecisionPageLink | null {
  const [latest] = getPublishedCaseStudies().sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  if (!latest) return null;
  return {
    id: 'praxisbeispiele',
    href: caseStudyPath(latest.slug),
    navLabel: 'Praxisbeispiel',
    teaserTitle: 'Praxisbeispiel',
    teaserText: latest.title,
    footerColumn: 'product',
  };
}

export function getDecisionPages(): DecisionPageLink[] {
  const caseStudyLink = buildCaseStudyLink();
  return caseStudyLink ? [...STATIC_DECISION_PAGES, caseStudyLink] : [...STATIC_DECISION_PAGES];
}

export function getDecisionPagesExcept(id: DecisionPageId): DecisionPageLink[] {
  return getDecisionPages().filter((page) => page.id !== id);
}

export function getDecisionPagesForFooterColumn(column: DecisionPageLink['footerColumn']): DecisionPageLink[] {
  return getDecisionPages().filter((page) => page.footerColumn === column);
}
