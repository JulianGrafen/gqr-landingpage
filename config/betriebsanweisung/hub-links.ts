/**
 * Kontextuelle Hub-Links der Betriebsanweisungs-Seiten (Hub & Spoke): Jede Stoffseite verlinkt das
 * Haupt-Cluster "Gefahrstoffmanagement Software" mit beschreibendem Ankertext.
 */
export const BA_HUB_LINKS = {
  softwareGuide: {
    href: '/wissen/gefahrstoffmanagement-software/',
    anchorText: 'Gefahrstoffmanagement Software im Vergleich',
  },
  home: {
    anchorText: 'Gefahrstoff-QR, die Gefahrstoffmanagement Software für KMU und externe SiFas',
  },
} as const;
