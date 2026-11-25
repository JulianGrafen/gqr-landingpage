/**
 * Permanente Weiterleitungen für GitHub Pages (kein serverseitiges 301 möglich).
 *
 * Jede Quelle wird als Stub-HTML mit `<meta http-equiv="refresh" content="0">`, Canonical aufs Ziel,
 * `noindex` und sofortigem `location.replace` erzeugt. Google wertet ein 0-Sekunden-Meta-Refresh
 * wie einen permanenten Redirect. Generator: `npm run generate:static-redirects`.
 */

export type StaticRedirect = {
  /** Datei relativ zum Repo-Root, die als Stub überschrieben wird. */
  sourceFile: string;
  /** Ziel-Pfad (mit führendem Slash, optional mit `#anker`). */
  target: `/${string}`;
  /** Sichtbarer Linktext und Title des Stubs. */
  label: string;
};

const BLOG_INDEX = '/blog/' as const;
const KFZ_SOLUTION = '/loesungen/kfz-werkstatt/' as const;

/** Alte Umlaut-URL der SiFa-Landingpage (Ziel: ASCII-Slug). */
export const SIFA_SELBSTSTAENDIG_LEGACY_DIR = 'gefahrstoff-software-sicherheitsfachkraft-selbstständig';
export const SIFA_SELBSTSTAENDIG_DIR = 'gefahrstoff-software-sicherheitsfachkraft-selbststaendig';

export const STATIC_REDIRECTS: readonly StaticRedirect[] = [
  { sourceFile: 'pricing/index.html', target: '/#preise', label: 'Preise & Tarife' },

  // Fremdinhalte eines früheren Projekts (Digitaler Produktpass), thematisch ohne Bezug zu Gefahrstoff-QR.
  { sourceFile: 'blog/ratgeber/index.html', target: BLOG_INDEX, label: 'Gefahrstoff-Blog' },
  {
    sourceFile: 'blog/ratgeber/digitaler-produktpass-kosten-nutzen-kmu/index.html',
    target: BLOG_INDEX,
    label: 'Gefahrstoff-Blog',
  },
  {
    sourceFile: 'blog/ratgeber/dpp-pflicht-2027-unternehmen-checkliste/index.html',
    target: BLOG_INDEX,
    label: 'Gefahrstoff-Blog',
  },
  {
    sourceFile: 'blog/ratgeber/espr-verordnung-zusammenfassung-fuer-entscheider/index.html',
    target: BLOG_INDEX,
    label: 'Gefahrstoff-Blog',
  },
  {
    sourceFile: 'blog/ratgeber/ki-automatisierung-produktpass-erstellung/index.html',
    target: BLOG_INDEX,
    label: 'Gefahrstoff-Blog',
  },
  {
    sourceFile: 'blog/ratgeber/was-ist-der-digitale-produktpass-espr/index.html',
    target: BLOG_INDEX,
    label: 'Gefahrstoff-Blog',
  },
  { sourceFile: 'blog/2026-01-03-willkommen.html', target: BLOG_INDEX, label: 'Gefahrstoff-Blog' },
  { sourceFile: 'blog/2026-01-03-trbs-2121-glossar.html', target: BLOG_INDEX, label: 'Gefahrstoff-Blog' },
  { sourceFile: 'blog/2026-01-03-trbs2121-dokumentation.html', target: BLOG_INDEX, label: 'Gefahrstoff-Blog' },
  {
    sourceFile: 'blog/2026-01-11-sturm-frost-starkregen-sonderpruefung.html',
    target: BLOG_INDEX,
    label: 'Gefahrstoff-Blog',
  },

  // Kfz: Blog-Artikel in die Branchen-Landingpage konsolidiert (beide URL-Formen).
  { sourceFile: 'blog/kfz-werkstatt-gefahrstoff-blog.html', target: KFZ_SOLUTION, label: 'Gefahrstoffe in der Kfz-Werkstatt' },
  {
    sourceFile: 'blog/kfz-werkstatt-gefahrstoff-blog/index.html',
    target: KFZ_SOLUTION,
    label: 'Gefahrstoffe in der Kfz-Werkstatt',
  },

  // SiFa-Landingpage: Umlaut-URL → ASCII-URL.
  {
    sourceFile: `${SIFA_SELBSTSTAENDIG_LEGACY_DIR}/index.html`,
    target: `/${SIFA_SELBSTSTAENDIG_DIR}/`,
    label: 'Gefahrstoff-Software für selbstständige Sicherheitsfachkräfte',
  },
];
