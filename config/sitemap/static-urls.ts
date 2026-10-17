/** Bestehende Sitemap-URLs (ohne programmatic /betriebsanweisung/*). */
export type StaticSitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

export const STATIC_SITEMAP_ENTRIES: StaticSitemapEntry[] = [
  { loc: 'https://gefahrstoff-qr.de/', lastmod: '2026-06-06', changefreq: 'monthly', priority: 1.0 },
  { loc: 'https://gefahrstoff-qr.de/pricing/', lastmod: '2026-04-04', changefreq: 'monthly', priority: 0.8 },
  {
    loc: 'https://gefahrstoff-qr.de/gefahrstoffkataster-excel-vorlage/',
    lastmod: '2026-06-06',
    changefreq: 'monthly',
    priority: 0.85,
  },
  {
    loc: 'https://gefahrstoff-qr.de/gefahrstoffverzeichnis-excel-vorlage/',
    lastmod: '2026-06-07',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: 'https://gefahrstoff-qr.de/gefahrstoffkataster-software/',
    lastmod: '2026-06-13',
    changefreq: 'monthly',
    priority: 0.9,
  },
  { loc: 'https://gefahrstoff-qr.de/gefahrstoff-app/', lastmod: '2026-06-13', changefreq: 'monthly', priority: 0.9 },
  {
    loc: 'https://gefahrstoff-qr.de/trgs-510-zusammenlagerungs-check/',
    lastmod: '2026-06-11',
    changefreq: 'monthly',
    priority: 0.85,
  },
  { loc: 'https://gefahrstoff-qr.de/wissen/', lastmod: '2026-06-11', changefreq: 'weekly', priority: 0.9 },
  {
    loc: 'https://gefahrstoff-qr.de/wissen/gefahrstoffverzeichnis-arztpraxis-muster/',
    lastmod: '2026-06-11',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://gefahrstoff-qr.de/wissen/gefahrstoffkataster-was-muss-rein/',
    lastmod: '2026-06-11',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://gefahrstoff-qr.de/wissen/gefahrstoffverzeichnis-muster-kfz-werkstatt/',
    lastmod: '2026-06-11',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://gefahrstoff-qr.de/wissen/gefahrstoffmanagement-software/',
    lastmod: '2026-06-11',
    changefreq: 'monthly',
    priority: 0.85,
  },
  {
    loc: 'https://gefahrstoff-qr.de/wissen/gefahrstoffverzeichnis-online-erstellen/',
    lastmod: '2026-06-11',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://gefahrstoff-qr.de/wissen/gefahrstoffkataster-erstellen/',
    lastmod: '2026-06-13',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    loc: 'https://gefahrstoff-qr.de/wissen/gefahrstoffkataster-erstellen-lassen/',
    lastmod: '2026-06-11',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://gefahrstoff-qr.de/wissen/gefahrstoffkataster-software/',
    lastmod: '2026-06-11',
    changefreq: 'monthly',
    priority: 0.85,
  },
  { loc: 'https://gefahrstoff-qr.de/loesungen/kfz-werkstatt/', lastmod: '2026-05-03', changefreq: 'monthly', priority: 0.65 },
  { loc: 'https://gefahrstoff-qr.de/loesungen/schreinerei/', lastmod: '2026-05-03', changefreq: 'monthly', priority: 0.65 },
  { loc: 'https://gefahrstoff-qr.de/loesungen/malerbetrieb/', lastmod: '2026-05-03', changefreq: 'monthly', priority: 0.65 },
  { loc: 'https://gefahrstoff-qr.de/loesungen/laborbetrieb/', lastmod: '2026-05-03', changefreq: 'monthly', priority: 0.65 },
  {
    loc: 'https://gefahrstoff-qr.de/loesungen/reinigungsunternehmen/',
    lastmod: '2026-05-03',
    changefreq: 'monthly',
    priority: 0.65,
  },
  { loc: 'https://gefahrstoff-qr.de/blog/', lastmod: '2026-04-04', changefreq: 'weekly', priority: 0.8 },
  {
    loc: 'https://gefahrstoff-qr.de/blog/gefahrstoffverzeichnis-digital-software/',
    lastmod: '2026-04-06',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/haftungsfalle-papier-ordner-bg-pruefung/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/2-sekunden-check-ersthelfer-gefahrstoffe/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/sifa-digitale-gefahrstoffverzeichnisse-zeitersparnis/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/malerbetriebe-vergessene-gefahrstoffe/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/sicherheitsdatenblatt-abgelaufen-bussgeld/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  { loc: 'https://gefahrstoff-qr.de/blog/zettelchaos-auf-qr-code/', lastmod: '2026-04-04', changefreq: 'monthly', priority: 0.7 },
  {
    loc: 'https://gefahrstoff-qr.de/blog/excel-gefahrstoffliste-kostenfalle/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/mitarbeiter-akzeptanz-gefahrstoffhinweise/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/gewerbeaufsicht-pruefung-vorbereitung/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/digitale-gefahrstoffpflege-gesetzespflicht/',
    lastmod: '2026-04-04',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/maler-gefahrstoffverzeichnis-excel/',
    lastmod: '2026-04-27',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    loc: 'https://gefahrstoff-qr.de/blog/reinigung-gefahrstoffkataster-vorlage/',
    lastmod: '2026-04-27',
    changefreq: 'monthly',
    priority: 0.7,
  },
  { loc: 'https://gefahrstoff-qr.de/blog/kfz-gefahrstoff-excel/', lastmod: '2026-04-27', changefreq: 'monthly', priority: 0.7 },
  {
    loc: 'https://gefahrstoff-qr.de/blog/gefahrstoffkataster-in-excel-/',
    lastmod: '2026-06-06',
    changefreq: 'monthly',
    priority: 0.75,
  },
];
