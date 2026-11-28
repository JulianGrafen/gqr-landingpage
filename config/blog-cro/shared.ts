/**
 * Artikelübergreifende CRO-Bausteine: Zielpfade mit `ref`-Parameter, belegbare Trust-Punkte
 * und Produkt-Screenshots. Preise kommen aus `config/pricing-plans.ts`, nie hartkodiert.
 */
import { PRICING_PLANS, formatPlanPrice } from '@/config/pricing-plans';
import type { ProductScreenshot } from './types';

const LIVE_DEMO_ANCHOR = 'live-demo';
const PRICING_PATH = '/pricing/';

/** Query vor dem Hash, damit `ref` als echter URL-Parameter ankommt: `/?ref=…#live-demo`. */
export function liveDemoHref(ref: string): string {
  return `/?ref=${encodeURIComponent(ref)}#${LIVE_DEMO_ANCHOR}`;
}

export function pricingHref(ref: string): string {
  return `${PRICING_PATH}?ref=${encodeURIComponent(ref)}`;
}

function entryPlanMonthlyPrice(): string {
  const entryPlan = PRICING_PLANS.find((plan) => plan.id === 'kmu-basis');
  if (!entryPlan) throw new Error('config/blog-cro: Tarif "kmu-basis" fehlt in PRICING_PLANS.');
  return formatPlanPrice(entryPlan, 'monthly');
}

/** Mikro-Trust unter Test-CTAs (EU-Hosting: config/trust/sicherheit-avv.ts). */
export const LIVE_TEST_TRUST_ITEMS = ['Unverbindlich', 'Kein Account nötig', 'Datenverarbeitung in der EU'] as const;

/** Trust-Zeile für Abschluss-Blöcke mit Pricing-Bezug. */
export const PRICING_TRUST_ITEMS = [
  `Ab ${entryPlanMonthlyPrice()}`,
  'Keine Einrichtungsgebühr',
  'Kauf auf Rechnung möglich',
  'Auch für mehrere Objekte & externe SiFas',
] as const;

/** Echte App-Ansichten; Maße entsprechen der WebP-Datei (verhindert Layout-Shift). */
export const PRODUCT_SCREENSHOTS = {
  directoryDesktop: {
    src: '/images/landing-kataster-dashboard.png',
    webpSrc: '/images/landing-kataster-dashboard.webp',
    alt: 'Gefahrstoffverzeichnis in Gefahrstoff-QR: Tabelle mit Lieferant, SDB-Revision, Signalwort und GHS-Piktogrammen, filterbar nach Standort',
    width: 1200,
    height: 765,
    orientation: 'landscape',
  },
  qrEmergencyMobile: {
    src: '/images/app-gefahrstoff-detail-mobile.jpg',
    webpSrc: '/images/app-gefahrstoff-detail-mobile.webp',
    alt: 'Mobile QR-Notfallansicht: Signalwort, GHS-Piktogramme, H-Sätze sowie Buttons für Notruf 112 und Giftnotruf',
    width: 1284,
    height: 2397,
    orientation: 'portrait',
  },
} as const satisfies Record<string, ProductScreenshot>;
