import type { StrikingDistanceMidPageCtaCopy } from '@/components/marketing/StrikingDistanceMidPageCta';
import type { HeroCtaRow } from '@/config/home-sections/hero';
import { PRICING_PAGE_SIFA_TAB_HREF } from '@/config/home-sections/pricing-audience';

/** Gleicher Wert wie `LIVE_DEMO_ANCHOR_ID` in hero.ts (kein Import wegen Zyklus mit HOME_HERO). */
const LIVE_DEMO_ANCHOR_ID = 'live-demo' as const;

export const CEO_GEMINI_CTA_SOURCE = 'ceo-gemini-cta' as const;
export const CEO_GEMINI_CTA_CAMPAIGN_DATE = '2026-11-27' as const;
export const CEO_GEMINI_CTA_GSC_PERIOD = '2026-10-28 bis 2026-11-24' as const;

const LIVE_DEMO_HASH = `#${LIVE_DEMO_ANCHOR_ID}` as const;
const HOME_LIVE_DEMO_PATH = '/#live-demo' as const;

/** Startseite: Kaufzeile im Hero neben der Dropzone. */
export const CEO_GEMINI_HOME_HERO_CTA_ROW: HeroCtaRow = {
  primary: {
    label: 'Eigenes SDB-PDF in der Dropzone testen',
    href: LIVE_DEMO_HASH,
  },
  secondary: {
    label: 'Externe SiFa? Mandanten-Tarif ansehen',
    href: PRICING_PAGE_SIFA_TAB_HREF,
  },
};

/** Startseite: Band direkt nach dem Hero (organischer Einstieg). */
export const CEO_GEMINI_HOME_POST_HERO_CTA: StrikingDistanceMidPageCtaCopy = {
  headline: 'Zuerst SDB-Entwurf prüfen, dann Tarif wählen',
  body:
    'Laden Sie ein Lieferanten-PDF in die Dropzone. Sie sehen einen KI-gestützten Entwurf für Kataster und Betriebsanweisung zur fachlichen Freigabe durch SiFa oder Arbeitgeber.',
  primaryLabel: 'Zur SDB-Dropzone scrollen',
  primaryHref: LIVE_DEMO_HASH,
  secondaryLabel: 'SiFa-Preise ansehen',
  secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
};

/** Kfz-Werkstatt: Hero-Kaufzeile (statische LP). */
export const CEO_GEMINI_KFZ_HERO_CTA_ROW: HeroCtaRow = {
  primary: {
    label: 'Werkstatt-SDB in der Dropzone testen',
    href: LIVE_DEMO_HASH,
  },
  secondary: {
    label: 'Mehrere Betriebe als SiFa betreuen?',
    href: PRICING_PAGE_SIFA_TAB_HREF,
  },
};

/** Kfz-Werkstatt: Band nach dem Hero vor den Branchenabschnitten. */
export const CEO_GEMINI_KFZ_POST_HERO_CTA: StrikingDistanceMidPageCtaCopy = {
  headline: 'Bremsenreiniger- oder Öl-SDB direkt testen',
  body:
    'PDF hochladen oder Beispiel wählen: Entwurf für §-6-Verzeichnis und TRGS-555-Betriebsanweisung als Vorprüfung zur fachlichen Freigabe.',
  primaryLabel: 'Zur Dropzone im Hero',
  primaryHref: LIVE_DEMO_HASH,
  secondaryLabel: 'SiFa-Tarife für Werkstatt-Mandanten',
  secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
};

/** /pricing/: Hinweis vor Tab-Umschalter und Kauf. */
export const CEO_GEMINI_PRICING_PRE_PURCHASE_CTA: StrikingDistanceMidPageCtaCopy = {
  headline: 'Vor dem Tarif: SDB-Entwurf im Browser ansehen',
  body:
    'Ohne Abo starten: Lieferanten-PDF auf der Startseite hochladen und prüfen, ob Extraktion und TRGS-555-Entwurf zu Ihrem Prozess passen.',
  primaryLabel: 'SDB-Live-Test auf der Startseite',
  primaryHref: HOME_LIVE_DEMO_PATH,
  secondaryLabel: 'SiFa-Tab direkt öffnen',
  secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
};

/** TRGS-510-Check: Band unter der Einleitung, vor dem Tool. */
export const CEO_GEMINI_TRGS510_PRE_TOOL_CTA: StrikingDistanceMidPageCtaCopy = {
  headline: 'Lagerklassen-Check ergänzen: SDB-PDF testen',
  body:
    'Nach der Matrix-Prüfung lohnt ein Blick auf Ihre Lieferanten-PDFs: Gefahrstoff-QR liest Lagerklassen und Pflichtangaben für das Verzeichnis als Entwurf aus.',
  primaryLabel: 'SDB-Live-Test öffnen',
  primaryHref: HOME_LIVE_DEMO_PATH,
  secondaryLabel: 'Externe SiFa? Preise ansehen',
  secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
};