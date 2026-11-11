/**
 * Logo-Grid im Hero: externe Verzeichnisse & Presse (nur echte Logos).
 */

export const PORTAL_DER_WIRTSCHAFT_PRESS_URL =
  'https://www.portalderwirtschaft.de/it-new-media-software/419688/45-sekunden-statt-20-minuten-pro-sicherheitsdatenblatt-wie-gefahrstoff-qr-selbststaendigen-sicherheitsfachkraeften-tage-an-dokumentationsarbeit-erspart.html';

export const EXPERTENMARKT_PROFILE_URL = 'https://www.expertenmarkt.de/experte/gefahrstoff-qr-kall';

export const TRENDKRAFT_SIFA_PRESS_URL =
  'https://trendkraft.io/software/vom-zettelchaos-zur-digitalen-audit-sicherheit-wie-externe-sicherheitsfachkraefte-mit-gefahrstoff-qr-ihre-mandantenbetreuung-revolutionieren-40522';

export type HeroTrustLogo = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
  linkTitle?: string;
  /** Logo mit hellem Hintergrund (z. B. Presse-Logos auf PNG). */
  lightSurface?: boolean;
  /** Logo mit dunklem Hintergrund (z. B. Expertenmarkt). */
  darkSurface?: boolean;
  /** Ausgleich für PNGs mit viel Rand (gleiche optische Größe im Grid). */
  displayScale?: number;
};

export const HOME_HERO_TRUST_GRID = {
  /** Barrierefreiheit für das Logo-Grid (sichtbare Kicker-Zeile entfällt). */
  ariaLabel: 'Presse und Verzeichnisse',
  logos: [
    {
      id: 'portal-der-wirtschaft',
      src: '/images/trust/portal-der-wirtschaft.png',
      alt: 'Portal der Wirtschaft – Bericht über Gefahrstoff-QR',
      width: 220,
      height: 60,
      href: PORTAL_DER_WIRTSCHAFT_PRESS_URL,
      linkTitle: 'Pressebericht auf Portal der Wirtschaft lesen (öffnet in neuem Tab)',
      lightSurface: true,
      displayScale: 1.68,
    },
    {
      id: 'expertenmarkt',
      src: '/images/trust/expertenmarkt.png',
      alt: 'Gefahrstoff-QR auf Expertenmarkt.de',
      width: 220,
      height: 60,
      href: EXPERTENMARKT_PROFILE_URL,
      linkTitle: 'Expertenprofil auf Expertenmarkt.de öffnen (neuer Tab)',
      darkSurface: true,
      displayScale: 0.86,
    },
    {
      id: 'trendkraft',
      src: '/images/trust/trendkraft-on-dark.svg',
      alt: 'TRENDKRAFT – Pressemitteilung zu Gefahrstoff-QR',
      width: 400,
      height: 72,
      href: TRENDKRAFT_SIFA_PRESS_URL,
      linkTitle: 'Presseartikel auf TRENDKRAFT lesen (öffnet in neuem Tab)',
      darkSurface: true,
    },
  ] satisfies readonly HeroTrustLogo[],
} as const;
