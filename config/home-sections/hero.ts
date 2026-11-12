import { APP_LOGIN_URL, APP_REGISTER_URL } from '@/config/aeo-config';

/**
 * Hero und Kopfnavigation der Startseite (5-Sekunden-Test: Was, für wen, welcher Nutzen).
 * Copy-Regeln: keine Zeitversprechen, keine Konformitätsaussagen, KI-Ergebnis = Entwurf.
 */

/** Anker der interaktiven SDB-Dropzone (Low-Friction-Einstieg ohne Login). */
export const LIVE_DEMO_ANCHOR_ID = 'live-demo';
const LIVE_DEMO_HREF = `#${LIVE_DEMO_ANCHOR_ID}`;

export interface NavLink {
  label: string;
  href: string;
}

/** Leak Rule: nur Sprungmarken auf derselben Seite plus Login und Primär-CTA. */
export const HOME_NAVIGATION = {
  anchorLinks: [
    { label: 'Live-Test', href: LIVE_DEMO_HREF },
    { label: 'Für SiFas', href: '#fuer-sifas' },
    { label: 'Preise', href: '#preise' },
  ] satisfies NavLink[],
  login: { label: 'Login', href: APP_LOGIN_URL },
  primaryCta: { label: 'Kostenlos testen', href: APP_REGISTER_URL },
} as const;

export const HOME_HERO = {
  eyebrow: 'Die Excel-Alternative für SiFas & KMU',
  /** Weiche Trennstellen (\u00ad) für saubere Umbrüche der langen Komposita auf Mobilgeräten. */
  headline: 'Gefahrstoff\u00adkataster & BA-Entwurf',
  headlineAccent: 'ohne Abtippen.',
  subheadlineParagraphs: [
    'KI liest aus, Sie geben frei.',
    'Sparen Sie sich mehrere Stunden Arbeit pro Woche für Ihre Mandanten.',
  ],
  microcopy: 'Kein Verkaufsgespräch, testen Sie die Software in Ruhe',
  /** Linksspalte unter der Live-Demo: Nutzen (neben ROI-Rechner). */
  benefitBullets: [
    'Gefahrstoffe aus dem Sicherheitsdatenblatt anlegen statt abtippen',
    'TRGS-510-Zusammenlagerungscheck pro Lagerort',
    'Sicherheitsdatenblatt & Notfallinfos per QR-Code am Gebinde',
    'KI-gestützter Entwurf für Betriebsanweisungen (gemäß TRGS 555)',
  ],
  trustBadges: [
    { id: 'hosting', label: 'Hosted in Frankfurt' },
    { id: 'made-in-germany', label: 'Made in Germany' },
    { id: 'ssl', label: 'SSL-verschlüsselt' },
    { id: 'sifa-experts', label: 'Entwickelt mit Sicherheitsfachkräften' },
  ],
} as const;
