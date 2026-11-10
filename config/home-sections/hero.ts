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
  primaryCta: { label: 'SDB live testen', href: LIVE_DEMO_HREF },
} as const;

export const HOME_HERO = {
  eyebrow: 'Für externe SiFas, Ingenieurbüros & KMU · Orientiert an § 6 GefStoffV, TRGS 555 & TRGS 510',
  /** Weiche Trennstellen (\u00ad) für saubere Umbrüche der langen Komposita auf Mobilgeräten. */
  headline: 'Vom Sicherheits\u00addatenblatt zum Gefahrstoff\u00adverzeichnis und BA-Entwurf.',
  headlineAccent: 'Ohne Abtippen.',
  subheadline:
    'SDB-PDF hochladen: Die KI liest Pflichtfelder nach § 6 GefStoffV, H- und P-Sätze, GHS-Piktogramme und die Lagerklasse nach TRGS 510 aus, jeweils mit Fundstelle im SDB. Sie erhalten einen KI-gestützten Entwurf (gemäß TRGS 555) zur fachlichen Freigabe durch die SiFa / den Arbeitgeber.',
  primaryCta: { label: 'Beispiel-SDB live auslesen', href: LIVE_DEMO_HREF },
  secondaryCta: { label: 'Kostenlos registrieren', href: APP_REGISTER_URL },
  microcopy: 'Live-Test ohne Login · TarifVorschau gratis · ohne Verkaufsgespräch',
  /** Einzige Trust-Leiste der Seite, direkt unter der Dropzone. */
  trustSignals: [
    'Browserbasiert, keine Installation',
    'Keine Kreditkarte',
    'Serverstandort Frankfurt (inkl. AVV nach Art. 28 DSGVO)',
  ],
} as const;
