import { HOME_LIVE_DEMO_HREF } from '@/config/home-sections/hero';
import { withBrandSuffix } from '@/lib/seo/buildMetadata';

export const GEMINI_CRO_CAMPAIGN_DATE = '2026-11-26' as const;
export const GEMINI_CRO_GSC_PERIOD = '2026-10-27 bis 2026-11-23' as const;
export const GEMINI_CRO_SOURCE = 'gemini-cro' as const;

/** SERP-Titel ≤58 Zeichen (inkl. Marke); H1 bleibt ausführlicher. */
export const WISSEN_HUB_GEMINI_CRO = {
  title: withBrandSuffix('Wissen: § 6 Kataster, TRGS 555 und 510'),
  description:
    'Praxisleitfäden und Arbeitshilfen für KMU und externe SiFas: SDB-Pflichten, TRGS-510-Zusammenlagerung und digitales Gefahrstoffverzeichnis im Überblick.',
  h1: 'Praxiswissen und Arbeitshilfen für Ihr Gefahrstoffmanagement',
} as const;

export type WissenHubActionCard = {
  title: string;
  description: string;
  href: string;
};

export const WISSEN_HUB_ACTION_PANEL: readonly WissenHubActionCard[] = [
  {
    title: 'SDB-PDF auslesen',
    description: 'SDB-Dropzone ohne Login testen',
    href: HOME_LIVE_DEMO_HREF,
  },
  {
    title: 'Lagerklassen prüfen',
    description: 'TRGS-510-Zusammenlagerungs-Check öffnen',
    href: '/trgs-510-zusammenlagerungs-check/',
  },
  {
    title: 'Mehrere Betriebe betreuen',
    description: 'SiFa-Tarife ansehen',
    href: '/pricing?tab=sifa',
  },
] as const;

export const KFZ_WERKSTATT_BLOG_GEMINI_CRO = {
  title: 'Gefahrstoffverzeichnis in der Kfz-Werkstatt: typische Fehler und Praxis',
  description:
    'Bremsenreiniger, Öle, Lacke: häufige Lücken im Gefahrstoffverzeichnis von Kfz-Betrieben und wie Gefahrstoff-QR aus dem SDB-PDF einen Entwurf für das Kataster nach § 6 GefStoffV zur fachlichen Prüfung unterstützt.',
  h1: 'Gefahrstoffe in der Kfz-Werkstatt: häufige Lücken im Verzeichnis und wie Sie sie vermeiden',
  midCta: {
    body: 'Bremsenreiniger- oder Öl-SDB testen: PDF hochladen und Entwurf für Kataster und Betriebsanweisung prüfen',
    buttonLabel: 'Mit Beispiel-SDB oder eigenem PDF starten',
    href: HOME_LIVE_DEMO_HREF,
  },
  previousTitle: 'Gefahrstoffe in der Kfz-Werkstatt | Gefahrstoff-QR',
  previousDescription:
    'Weiterleitung zur Branchen-Lösung Kfz-Werkstatt (kein indexierbarer Artikelinhalt).',
} as const;

export const WISSEN_HUB_PREVIOUS_SEO = {
  title: 'Wissen: Blog & Gefahrstoff-Leitfäden',
  description:
    'Gefahrstoff-Wissen: Blog-Artikel, Deepinfo-Leitfäden zu GefStoffV, Sicherheitsdatenblatt, TRGS 510 und Gefahrstoffkataster Software — für SiFa und KMU.',
} as const;