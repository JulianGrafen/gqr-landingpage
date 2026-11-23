import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

/** Typisches Produkt in der Branchentabelle — ohne GHS-Codes oder H-Sätze. */
export interface IndustryTypicalProductRow {
  product: string;
  gebinde: string;
  /** Gefahrenart in Worten, z. B. „entzündbar“, „ätzend“. */
  hazardKind: string;
  /** Konkrete Pflicht im Betrieb (Verzeichnis, BA, Unterweisung). */
  workplaceDuty: string;
}

export interface IndustryExcelCompareRow {
  topic: string;
  excelWorkflow: string;
  gqrWorkflow: string;
}

/** Vollständiger pSEO-Inhalt für /loesungen/[slug]/ (Tabellen, FAQs, AEO). */
export interface IndustryPseoContent {
  /** 45–60 Wörter, direkte Antwort auf Pflichten § 6, TRGS 555, TRGS 201. */
  aeoAnswer: string;
  typicalProducts: readonly IndustryTypicalProductRow[];
  /** Drei häufige Beanstandungen bei BG-Begehungen — ohne Lager- oder PSA-Anleitung. */
  inspectionDeficiencies: readonly [string, string, string];
  /** Zuständige BG für den Mängel-Abschnitt, z. B. „BGW“. */
  berufsgenossenschaft: string;
  /** Optional: eigene Überschrift statt „Häufige Mängel bei Begehungen der …“. */
  inspectionSectionTitle?: string;
  /** Optional: Tabellen-Überschrift (Default: Typische Gefahrstoffe …). */
  productsSectionTitle?: string;
  productsSectionIntro?: string;
  excelComparison: readonly IndustryExcelCompareRow[];
  faqItems: readonly [SeoFaqItem, SeoFaqItem, SeoFaqItem];
}