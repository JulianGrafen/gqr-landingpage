/**
 * SEO-Silo: Typen für 4 konvertierende Landingpages + strukturierte Daten.
 * Inhalte pro Seite werden später in pages/*.ts ergänzt — hier nur das Datenmodell.
 */

/** Suchintention pro Silo-URL */
export type SeoSiloIntent =
  | 'excel-intercept'
  | 'software-buy'
  | 'mobile-app'
  | 'how-to-guide';

/** FAQ-Eintrag (UI + FAQPage JSON-LD) */
export interface SeoSiloFaqItem {
  question: string;
  answer: string;
}

/** Feature-Kachel im Feature-Grid */
export interface SeoSiloFeature {
  id: string;
  title: string;
  description: string;
  /** Optional: Lucide icon name oder Emoji — Komponente mappt später */
  icon?: string;
}

/** Schritt in How-To / Ratgeber-Landingpages */
export interface SeoSiloStep {
  id: string;
  number: number;
  title: string;
  description: string;
  regulatoryRef?: string;
  gqrHint?: string;
}

/** Hero-Bereich */
export interface SeoSiloHero {
  eyebrow: string;
  h1: string;
  lead: string;
  /** Rationaler Berater-Ton: Haftung, Kosten, Regulatorik */
  proofLine?: string;
  primaryCta: SeoSiloCta;
  secondaryCta?: SeoSiloCta;
  trustBullets?: string[];
}

export interface SeoSiloCta {
  label: string;
  href: string;
  /** external = app.gefahrstoff-qr.de */
  external?: boolean;
}

/** Abschluss-CTA-Betriebsanweisungnd vor Footer */
export interface SeoSiloClosingCta {
  headline: string;
  subline: string;
  primaryCta: SeoSiloCta;
  disclaimer?: string;
}

/** Breadcrumb für Silo + Wissen-Artikel */
export interface SeoSiloBreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Vollständige Seiten-Konfiguration (Copy kommt seitenweise).
 * Wird von LandingPageWrapper konsumiert.
 */
export interface SeoSiloPageConfig {
  slug: string;
  path: string;
  intent: SeoSiloIntent;
  seo: {
    title: string;
    description: string;
    ogImageAlt: string;
    canonicalPath: string;
  };
  breadcrumb: SeoSiloBreadcrumbItem[];
  hero: SeoSiloHero;
  features?: {
    sectionTitle: string;
    sectionSubline?: string;
    items: SeoSiloFeature[];
  };
  faq: SeoSiloFaqItem[];
  closingCta: SeoSiloClosingCta;
}

/** Betriebsanweisungsis-SoftwareApplication — page-spezifische Ergänzungen via merge */
export interface SoftwareApplicationSchemaConfig {
  name: string;
  applicationCategory: string;
  operatingSystem: string[];
  description: string;
  url: string;
  offers: {
    price: string;
    priceCurrency: string;
    description: string;
  };
  featureList?: string[];
  audience?: {
    audienceType: string;
    geographicArea: string;
  };
}

/** JSON-LD Payload für eine Silo-Seite */
export interface SeoSiloSchemaBundle {
  faqPage: {
    '@context': 'https://schema.org';
    '@type': 'FAQPage';
    mainEntity: Array<{
      '@type': 'Question';
      name: string;
      acceptedAnswer: {
        '@type': 'Answer';
        text: string;
      };
    }>;
  };
  softwareApplication: {
    '@context': 'https://schema.org';
    '@type': 'SoftwareApplication';
    name: string;
    applicationCategory: string;
    operatingSystem: string;
    description: string;
    url: string;
    offers: {
      '@type': 'Offer';
      price: string;
      priceCurrency: string;
      description: string;
    };
    featureList?: string;
    audience?: {
      '@type': 'Audience';
      audienceType: string;
      geographicArea: {
        '@type': 'AdministrativeArea';
        name: string;
      };
    };
  };
}

/** Silo-Registry: 4 Ziel-URLs (Metadaten, keine Volltexte) */
export interface SeoSiloRegistryEntry {
  slug: string;
  path: string;
  intent: SeoSiloIntent;
  primaryKeyword: string;
  secondaryKeywords: string[];
  regulatoryHooks: string[];
  painPoints: string[];
  gqrSolutionAngles: string[];
}
