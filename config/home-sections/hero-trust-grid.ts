/**
 * Logo-Grid im Hero: externe Verzeichnisse & Presse (nur echte Logos).
 */

export const PORTAL_DER_WIRTSCHAFT_PRESS_URL =
  'https://www.portalderwirtschaft.de/it-new-media-software/419688/45-sekunden-statt-20-minuten-pro-sicherheitsdatenblatt-wie-gefahrstoff-qr-selbststaendigen-sicherheitsfachkraeften-tage-an-dokumentationsarbeit-erspart.html';

export const EXPERTENMARKT_PROFILE_URL = 'https://www.expertenmarkt.de/experte/gefahrstoff-qr-kall';

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
};

export const HOME_HERO_TRUST_GRID = {
  kicker: 'Bekannt aus',
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
    },
  ] satisfies readonly HeroTrustLogo[],
} as const;
