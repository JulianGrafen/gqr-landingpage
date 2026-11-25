import { COMPANY } from '@/config/company';

/**
 * Trust- & Gründer-Block der Startseite (nach #preise), kombiniert mit „Datenhoheit & Datenschutz“.
 *
 * Testimonials/Logos: Nur echte, freigegebene Stimmen eintragen. Ist die Liste leer,
 * wird der Slot nicht gerendert (keine Platzhalter- oder Fake-Logos).
 */

export type TrustFact = {
  title: string;
  description: string;
};

export type TrustListing = {
  label: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  href: string;
};

export type SifaTestimonial = {
  quote: string;
  name: string;
  /** z. B. „Fachkraft für Arbeitssicherheit, Köln“ */
  role: string;
  /** Optionales Logo (nur mit schriftlicher Freigabe des Kunden). */
  logo?: { src: string; alt: string; width: number; height: number };
};

export const HOME_FOUNDER_TRUST = {
  sectionId: 'wer-steckt-dahinter',
  eyebrow: 'Wer steckt dahinter?',
  headline: 'Gebaut in NRW, Support direkt vom Gründer',
  dataTrust: {
    anchorId: 'daten-trust',
    headlineId: 'dataTrustHeadline',
    title: 'Datenhoheit & Datenschutz',
    facts: [
      {
        title: 'Kein KI-Training mit Kundendaten',
        description:
          'Hochgeladene PDFs und Katasterdaten werden ausschließlich zur Extraktion verarbeitet (Zero-Data-Retention bei Subprozessoren).',
      },
      {
        title: 'Serverstandort Frankfurt (AWS/Supabase EU)',
        description: 'Hosting in Deutschland inkl. vorab unterzeichnetem AVV nach Art. 28 DSGVO.',
      },
      {
        title: 'Jederzeitiger Export',
        description:
          'Vollständiger Export aller Katasterdaten als Excel/PDF und SDB-Archiv zu jedem Zeitpunkt, ohne Vendor-Lock-in.',
      },
      {
        title: 'Direkter Support ohne Callcenter',
        description: `Fragen landen direkt beim Gründer: ${COMPANY.contactEmail}`,
      },
    ] satisfies readonly TrustFact[],
  },
  founder: {
    name: 'Julian Gräfen',
    initials: 'JG',
    photo: {
      src: '/images/trust/julian-graefen-gruender.jpg',
      alt: 'Julian Gräfen, Gründer von Gefahrstoff-QR',
      width: 112,
      height: 112,
    },
    role: 'Gründer von Gefahrstoff-QR',
    location: `${COMPANY.address.city}, NRW`,
    bio: 'Ich entwickle Gefahrstoff-QR für Betriebe und externe SiFas, die ihr Gefahrstoffverzeichnis ohne Excel-Zettelwirtschaft führen wollen. Feedback aus der Praxis fließt direkt ins Produkt.',
    contactLabel: 'Direkt schreiben',
    contactHref: `mailto:${COMPANY.contactEmail}`,
  },
  listings: [
    {
      label: 'Gelistet bei Expertenmarkt',
      logoSrc: '/images/trust/expertenmarkt.png',
      logoAlt: 'Gefahrstoff-QR auf Expertenmarkt.de',
      logoWidth: 151,
      logoHeight: 24,
      href: 'https://www.expertenmarkt.de/experte/gefahrstoff-qr-kall',
    },
  ] satisfies readonly TrustListing[],
  testimonialsHeadline: 'Stimmen aus der Praxis',
  /** Leer lassen, bis echte SiFa-Stimmen mit Freigabe vorliegen (max. 3 werden angezeigt). */
  testimonials: [] as readonly SifaTestimonial[],
} as const;

export const HOME_FOUNDER_TRUST_MAX_TESTIMONIALS = 3;
