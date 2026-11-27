import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import { HOME_LIVE_DEMO_HREF } from '@/config/home-sections/hero';
import { PRICING_PAGE_SIFA_TAB_HREF } from '@/config/home-sections/pricing-audience';
import { HOME_MARKETING_CONTEXT_LINKS } from '@/config/seo/home-marketing-context-links';
import type { GeminiCroInternalLink } from '@/config/seo/gemini-cro-2026-11-24';

export const GEMINI_CRO_CAMPAIGN_DATE = '2026-11-27' as const;
export const GEMINI_CRO_GSC_PERIOD = '2026-10-28 bis 2026-11-24' as const;
export const GEMINI_CRO_SOURCE = 'gemini-cro' as const;

export type GeminiCroProseLink = GeminiCroInternalLink;

export type GeminiCroHeroPrimaryCta = {
  label: string;
  href: typeof HOME_LIVE_DEMO_HREF;
};

export type GeminiCroDualMidCta = {
  primaryLabel: string;
  primaryHref: typeof HOME_LIVE_DEMO_HREF;
  secondaryLabel: string;
  secondaryHref: typeof PRICING_PAGE_SIFA_TAB_HREF;
};

/**
 * CRO-Overrides einzelner Betriebsanweisungs-Slugs (Title-Kandidaten, H1, CTAs, interne Links).
 * SERP-Descriptions bleiben in der Default-Kaskade (serp-snippet.ts).
 */
export type GeminiCroBetriebsanweisungPageOverride = {
  /** Kandidatenliste; `fitTitle` wählt den ersten Eintrag ≤58 Zeichen. */
  titleCandidates: readonly string[];
  h1: string;
  heroPrimaryCta?: GeminiCroHeroPrimaryCta;
  complianceNotice?: string;
  earlyProseLinks?: readonly GeminiCroProseLink[];
  lowerThirdProseLinks?: readonly GeminiCroProseLink[];
  homeContextLink?: GeminiCroProseLink;
  dualMidCta?: GeminiCroDualMidCta;
};

export const GEMINI_CRO_BA_OVERRIDES_2026_11_27: Partial<
  Record<HazardousSubstanceSlug, GeminiCroBetriebsanweisungPageOverride>
> = {
  'kaeltemittel-trgs-555': {
    titleCandidates: [
      'Betriebsanweisung Kältemittel (TRGS 555) | PDF-Vorlage & SDB-Upload',
      'Betriebsanweisung Kältemittel (TRGS 555) | PDF-Vorlage SDB',
      'Betriebsanweisung Kältemittel (TRGS 555) | PDF & SDB-Upload',
    ],
    h1: 'Betriebsanweisung Kältemittel nach TRGS 555: Muster-Vorlage & SDB-Upload',
    heroPrimaryCta: {
      label: 'Eigenes Kältemittel-SDB hochladen und BA-Entwurf ansehen',
      href: HOME_LIVE_DEMO_HREF,
    },
    lowerThirdProseLinks: [
      {
        href: '/trgs-510-zusammenlagerungs-check/',
        label: 'Lagerung mit Ölen und Reinigern nach TRGS 510 prüfen',
      },
      {
        href: '/loesungen/shk-betrieb/',
        label: 'Gefahrstoffmanagement im SHK- und Kältebetrieb',
      },
      HOME_MARKETING_CONTEXT_LINKS.gefahrstoffverzeichnisSoftware,
    ],
  },
  'felgenreiniger-trgs-555': {
    titleCandidates: [
      'Betriebsanweisung Felgenreiniger (TRGS 555) | Kfz-Vorlage & SDB-Check',
      'Betriebsanweisung Felgenreiniger (TRGS 555) | Kfz-Vorlage SDB',
      'Betriebsanweisung Felgenreiniger TRGS 555: Kfz-Vorlage SDB',
    ],
    h1: 'Betriebsanweisung Felgenreiniger (TRGS 555): Vorlage für Kfz-Werkstätten',
    heroPrimaryCta: {
      label: 'Felgenreiniger-SDB als PDF testen (ohne Login)',
      href: HOME_LIVE_DEMO_HREF,
    },
    earlyProseLinks: [
      {
        href: '/loesungen/kfz-werkstatt/',
        label: 'Gefahrstoffmanagement für Kfz-Werkstätten',
      },
      {
        href: PRICING_PAGE_SIFA_TAB_HREF,
        label: 'Mehrere Kfz-Mandanten als SiFa verwalten',
      },
    ],
  },
  'chloroform-trgs-555': {
    titleCandidates: [
      'Betriebsanweisung Chloroform (TRGS 555) | Vorlage & SDB-Upload',
      'Betriebsanweisung Chloroform (TRGS 555) | Vorlage SDB',
    ],
    h1: 'Betriebsanweisung Chloroform nach TRGS 555: Muster & SDB-Entwurf',
    complianceNotice:
      'Die KI unterstützt mit einem strukturierten Entwurf aus dem SDB. Fachkundige Prüfung und Freigabe bleiben bei SiFa und Arbeitgeber.',
    homeContextLink: HOME_MARKETING_CONTEXT_LINKS.gefahrstoffmanagementSoftware,
    dualMidCta: {
      primaryLabel: 'SDB-PDF für Chloroform im Browser testen',
      primaryHref: HOME_LIVE_DEMO_HREF,
      secondaryLabel: 'Externe SiFa? Mandanten-Tarif ansehen',
      secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
    },
  },
  'furfurylalkohol-trgs-555': {
    titleCandidates: [
      'Betriebsanweisung Furfurylalkohol (TRGS 555) | Vorlage & SDB-Upload',
      'Betriebsanweisung Furfurylalkohol (TRGS 555) | Vorlage SDB',
    ],
    h1: 'Betriebsanweisung Furfurylalkohol nach TRGS 555: Muster & SDB-Entwurf',
    complianceNotice:
      'Die KI unterstützt mit einem strukturierten Entwurf aus dem SDB. Fachkundige Prüfung und Freigabe bleiben bei SiFa und Arbeitgeber.',
    homeContextLink: HOME_MARKETING_CONTEXT_LINKS.gefahrstoffdatenbankSoftware,
    dualMidCta: {
      primaryLabel: 'SDB-PDF für Furfurylalkohol im Browser testen',
      primaryHref: HOME_LIVE_DEMO_HREF,
      secondaryLabel: 'Externe SiFa? Mandanten-Tarif ansehen',
      secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
    },
  },
  'dispersionsfarbe-trgs-555': {
    titleCandidates: [
      'Betriebsanweisung Dispersionsfarbe (TRGS 555) | Vorlage & SDB-Upload',
      'Betriebsanweisung Dispersionsfarbe (TRGS 555) | Vorlage SDB',
      'Betriebsanweisung Dispersionsfarbe TRGS 555: Vorlage SDB',
    ],
    h1: 'Betriebsanweisung Dispersionsfarbe nach TRGS 555: Muster & SDB-Entwurf',
    homeContextLink: HOME_MARKETING_CONTEXT_LINKS.gefahrstoffverzeichnisSoftware,
    dualMidCta: {
      primaryLabel: 'SDB-PDF für Dispersionsfarbe im Browser testen',
      primaryHref: HOME_LIVE_DEMO_HREF,
      secondaryLabel: 'Externe SiFa? Mandanten-Tarif ansehen',
      secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
    },
  },
};