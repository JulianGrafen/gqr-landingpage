import { APP_LOGIN_URL, APP_REGISTER_URL } from '@/config/aeo-config';
import { SITE_NAV_PRICING_LINK } from '@/config/site-nav';
import { TARIF_VORSCHAU_SDB_UPLOAD_LIMIT } from '@/config/pricing-plans';
import { formatPricingAmountEur, SIFA_MULTI_MANDANT_PRICE } from '@/lib/pricing-config';

/**
 * Hero und Kopfnavigation der Startseite (5-Sekunden-Test: Was, für wen, welcher Nutzen).
 * Copy-Regeln: keine Zeitversprechen, keine Konformitätsaussagen, KI-Ergebnis = Entwurf.
 */

/** Anker der interaktiven SDB-Dropzone (Low-Friction-Einstieg ohne Login). */
export const LIVE_DEMO_ANCHOR_ID = 'live-demo';
const LIVE_DEMO_HREF = `#${LIVE_DEMO_ANCHOR_ID}`;

/** Absoluter Link zur Startseiten-Dropzone (pSEO / SiFa-LP). */
export const HOME_LIVE_DEMO_HREF = `/#${LIVE_DEMO_ANCHOR_ID}` as const;

export interface NavLink {
  label: string;
  href: string;
}

/** Leak Rule: nur Sprungmarken auf derselben Seite plus Login und Primär-CTA. */
export const HOME_NAVIGATION = {
  anchorLinks: [
    { label: 'Live-Test', href: LIVE_DEMO_HREF },
    { label: 'Für SiFas', href: '#fuer-sifas' },
    { label: SITE_NAV_PRICING_LINK.label, href: SITE_NAV_PRICING_LINK.href },
  ] satisfies NavLink[],
  login: { label: 'Login', href: APP_LOGIN_URL },
  primaryCta: { label: 'Kostenlos testen', href: APP_REGISTER_URL },
} as const;

/** Textblock des Heros (Startseite und statische Branchen-Landingpages teilen dieselbe Struktur). */
export interface HeroCopy {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadlineParagraphs: readonly string[];
  /** Optionale Sekundärlinks unter der Subheadline (Primär-CTA bleibt die SDB-Dropzone darunter). */
  secondaryLinks?: readonly NavLink[];
  /** Kompakte Ergebnis-Bullets direkt unter der Subheadline (je eine Zeile). */
  outcomeBullets?: readonly string[];
  /** Kaufweg neben der Dropzone: Registrierung plus Text-Link für externe SiFas. */
  ctaRow?: HeroCtaRow;
}

export interface HeroCtaRow {
  primary: NavLink;
  secondary: NavLink;
}

/** Kompositum in der Hero-H1: darf nicht mit Bindestrich mitten im Wort umbrechen. */
export const HOME_HERO_H1_UNBROKEN_COMPOUND = 'Gefahrstoffmanagement';

/** Sprungmarke in den SiFa-Tab der Preissektion (ausgewertet in `usePricingUrlState`). */
const PRICING_SIFA_TAB_HREF = '#preise?tab=sifa';

const SIFA_PRICE_FROM_LABEL = `ab ${formatPricingAmountEur(SIFA_MULTI_MANDANT_PRICE.yearlyMonthlyEur)}/Monat`;

export const HOME_HERO = {
  eyebrow: 'Die Excel-Alternative für SiFas & KMU',
  headline: `${HOME_HERO_H1_UNBROKEN_COMPOUND} Software`,
  headlineAccent: 'für KMU & SiFas',
  subheadlineParagraphs: [
    'SDB-PDF reinziehen: Gefahrstoffverzeichnis und TRGS-555-Betriebsanweisung entstehen als KI-gestützter Entwurf direkt im Browser.',
    'Sie prüfen und geben frei: im eigenen Betrieb oder für Ihre Mandanten.',
  ],
  outcomeBullets: [
    'Kataster & TRGS-555-BA-Entwurf direkt aus dem SDB',
    'Inkl. TRGS-510-Zusammenlagerung & QR-Code-Etiketten',
    `Mandantenfähig für externe SiFas (${SIFA_PRICE_FROM_LABEL})`,
  ],
  ctaRow: {
    primary: { label: `Kostenlos mit ${TARIF_VORSCHAU_SDB_UPLOAD_LIMIT} SDBs starten`, href: APP_REGISTER_URL },
    secondary: { label: 'Externe SiFa? Multi-Mandant ansehen →', href: PRICING_SIFA_TAB_HREF },
  },
  microcopy: 'Kein Verkaufsgespräch, testen Sie die Software in Ruhe',
  /** Linksspalte unter der Live-Demo: Nutzen (neben ROI-Rechner). */
  benefitBullets: [
    'Gefahrstoffe aus dem Sicherheitsdatenblatt anlegen statt abtippen',
    'TRGS-510-Zusammenlagerungscheck pro Lagerort',
    'Sicherheitsdatenblatt & Notfallinfos per QR-Code am Gebinde',
    'KI-gestützter Entwurf für Betriebsanweisungen (gemäß TRGS 555)',
  ],
  trustBadges: [
    { id: 'hosting', label: 'DSGVO & Hosting in Frankfurt' },
    { id: 'avv', label: 'AVV inklusive' },
    { id: 'regelwerk', label: 'TRGS 555, 510 & 400' },
    { id: 'no-credit-card', label: 'Keine Kreditkarte nötig' },
  ],
} as const;
