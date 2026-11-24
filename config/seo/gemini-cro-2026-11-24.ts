import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';

export const GEMINI_CRO_CAMPAIGN_DATE = '2026-11-24' as const;
export const GEMINI_CRO_GSC_PERIOD = '2025-10-25 bis 2026-11-21' as const;
export const GEMINI_CRO_SOURCE = 'gemini-cro' as const;

export type GeminiCroInternalLink = {
  href: `/${string}/`;
  label: string;
};

export type GeminiCroBetriebsanweisungOverride = {
  title: string;
  description: string;
  internalLink: GeminiCroInternalLink;
};

/** Reinigungs-Cluster: seitenspezifische SERP-Texte und Verlinkung auf den Kataster-Blog. */
export const GEMINI_CRO_BA_OVERRIDES: Partial<
  Record<HazardousSubstanceSlug, GeminiCroBetriebsanweisungOverride>
> = {
  'bodenreiniger-trgs-555': {
    title: 'Betriebsanweisung Bodenreiniger (TRGS 555): Muster & PDF',
    description:
      'TRGS-555-Muster für Bodenreiniger. Eigenes SDB hochladen, Entwurf zur fachlichen Prüfung. Ohne Login testen.',
    internalLink: {
      href: '/blog/reinigung-gefahrstoffkataster-vorlage/',
      label: 'Gefahrstoffkataster Vorlage für die Reinigung',
    },
  },
  'fensterreiniger-trgs-555': {
    title: 'Betriebsanweisung Fensterreiniger (TRGS 555): Muster & PDF',
    description:
      'TRGS-555-Muster für Fensterreiniger. Eigenes SDB hochladen, Entwurf zur fachlichen Prüfung. Ohne Login testen.',
    internalLink: {
      href: '/blog/reinigung-gefahrstoffkataster-vorlage/',
      label: 'Gefahrstoffkataster Vorlage für die Reinigung',
    },
  },
  'fassadenreiniger-trgs-555': {
    title: 'Betriebsanweisung Fassadenreiniger TRGS 555: Muster & PDF',
    description:
      'TRGS-555-Muster für Fassadenreiniger. Eigenes SDB hochladen, Entwurf zur fachlichen Prüfung. Ohne Login testen.',
    internalLink: {
      href: '/blog/reinigung-gefahrstoffkataster-vorlage/',
      label: 'Gefahrstoffkataster Vorlage für die Reinigung',
    },
  },
};

export const REINIGUNG_BLOG_GEMINI_CRO = {
  title: 'Gefahrstoffkataster Reinigung: Vorlage, Muster & PDF',
  description:
    'Gefahrstoffkataster für Gebäudereinigung: Reiniger-SDB hochladen, Entwurf für Kataster und TRGS-555-Betriebsanweisung zur fachlichen Prüfung. Ohne Login testen.',
  liveDemoCtaLabel: 'Reiniger-SDB live auslesen, ohne Login',
} as const;

export const REINIGUNG_CLUSTER_BA_LINKS = [
  {
    href: '/betriebsanweisung/bodenreiniger-trgs-555/',
    label: 'Betriebsanweisung Bodenreiniger (TRGS 555)',
  },
  {
    href: '/betriebsanweisung/fensterreiniger-trgs-555/',
    label: 'Betriebsanweisung Fensterreiniger (TRGS 555)',
  },
  {
    href: '/betriebsanweisung/fassadenreiniger-trgs-555/',
    label: 'Betriebsanweisung Fassadenreiniger (TRGS 555)',
  },
] as const satisfies readonly GeminiCroInternalLink[];