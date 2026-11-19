/**
 * Decision-Layer (Vertrauens- und Einkaufsseiten): Datenmodell.
 * Copy liegt seitenweise in config/trust/*.ts, Darstellung in components/trust/*.
 */
import type { SeoSiloCta, SeoSiloFaqItem } from '@/config/seo-silo/types';

/** Gemeinsamer Seitenkopf: SEO, Breadcrumb, Hero mit AEO-Antwortblock. */
export interface TrustPageConfig {
  path: `/${string}/`;
  seo: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  /** Letzter Breadcrumb-Eintrag (Startseite wird automatisch vorangestellt). */
  breadcrumbLabel: string;
  /** Zwischenstufe im Breadcrumb, z. B. Hub „Praxisbeispiele“. */
  breadcrumbParent?: { label: string; href: string };
  hero: {
    eyebrow: string;
    h1: string;
    /** Direkte Antwort (~50 Wörter) für Featured Snippets / LLM-Zitate. */
    answer: string;
  };
  faq: readonly SeoSiloFaqItem[];
  closingCta: DecisionCta;
  /** ISO-Datum (YYYY-MM-DD) für Article JSON-LD. */
  datePublished: string;
  dateModified: string;
}

/** Abschluss-Box mit primärer und optionaler sekundärer Handlung. */
export interface DecisionCta {
  headline: string;
  body: string;
  primary: SeoSiloCta;
  secondary?: SeoSiloCta;
  note?: string;
}

/** Faktentabelle: erste Spalte = Zeilenkopf, danach Wertespalten. */
export interface FactTableRow {
  label: string;
  values: readonly string[];
}

export interface FactTable {
  caption: string;
  columnLabels: readonly [string, ...string[]];
  rows: readonly FactTableRow[];
}

/** Checklisten-Eintrag (✓ = zugesagt, ✕ = ausdrücklich ausgeschlossen). */
export interface ChecklistItem {
  title: string;
  description: string;
}

export type ChecklistTone = 'included' | 'excluded';

/** Stufe im KI-Prozessdiagramm. */
export interface PipelineStage {
  id: string;
  label: string;
  title: string;
  description: string;
  /** Kurze Fachbegriffe als Tags (z. B. „H-/P-/EUH-Sätze“). */
  tags: readonly string[];
}

/** Seite im Decision-Layer (Registry für Footer, Preis-Sektion, Querverlinkung, llms.txt). */
export type DecisionPageId = 'ki-pipeline' | 'sicherheit-avv' | 'praxisbeispiele';

export interface DecisionPageLink {
  id: DecisionPageId;
  href: `/${string}/`;
  /** Kurzlabel für Footer / Navigation. */
  navLabel: string;
  /** Teaser-Titel für Kacheln (Preis-Sektion, Querverweise). */
  teaserTitle: string;
  teaserText: string;
  footerColumn: 'product' | 'legal';
}
