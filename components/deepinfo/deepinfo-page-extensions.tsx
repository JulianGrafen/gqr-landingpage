import type { ReactNode } from 'react';
import { StrikingDistanceMidPageCta } from '@/components/marketing/StrikingDistanceMidPageCta';
import { PRICING_PAGE_SIFA_TAB_HREF } from '@/config/home-sections/pricing-audience';
import { SoftwareAeoAnswers, SoftwareLongtailSections } from '@/components/deepinfo/SoftwareAnswerSections';
import { SoftwareCategoryComparison } from '@/components/deepinfo/SoftwareCategoryComparison';
import { SOFTWARE_AEO_ANSWERS } from '@/config/wissen/software-category-comparison';
import type { DeepinfoSlug } from '@/lib/wissen/deepinfo-loader';
import type { DeepinfoFaqItem } from '@/lib/wissen/types';

/**
 * Seitenspezifische Erweiterungen der generischen Deepinfo-Vorlage (Single Responsibility:
 * die Vorlage bleibt generisch, Sonderinhalte einzelner Wissensseiten stehen hier).
 */
export interface DeepinfoPageExtension {
  /** Ersetzt den Standard-Vergleich Excel vs. Gefahrstoff-QR. */
  comparison: ReactNode;
  /** Zusätzliche Inhalte nach dem MDX-Text, vor dem Vergleich. */
  sectionsBeforeComparison: ReactNode;
  sectionsAfterComparison: ReactNode;
  /** Sichtbare Frage-Antwort-Blöcke, die zusätzlich ins FAQPage-Schema gehören. */
  extraFaqSchemaItems: readonly DeepinfoFaqItem[];
  /** SoftwareApplication-JSON-LD ausgeben (Seiten des Clusters "Gefahrstoffmanagement Software"). */
  includeSoftwareApplicationSchema: boolean;
}

const WISSEN_KFZ_MID_CTA = {
  headline: 'Gefahrstoffverzeichnis Kfz-Werkstatt digital aufsetzen',
  body: 'Statt nur ein Muster auszufüllen: SDB-PDF hochladen, Entwurf für Verzeichnis und Betriebsanweisungen prüfen und QR-Codes an Schrank und Hebebühne planen. Kostenloser Einstieg ohne Verkaufsgespräch.',
  primaryLabel: 'Livetest auf der Startseite öffnen',
  secondaryLabel: 'Zur Kfz-Werkstatt-Lösung',
  secondaryHref: '/loesungen/kfz-werkstatt/',
} as const;

const UNTERWEISUNG_MID_CTA = {
  headline: 'Betriebsanweisung und Unterweisung aus dem SDB vorbereiten',
  body: 'Laden Sie ein Sicherheitsdatenblatt in den Livetest und prüfen Sie den KI-gestützten Entwurf (TRGS 555) als Grundlage für Unterweisung und Verzeichnis. Die fachliche Freigabe bleibt beim Arbeitgeber.',
  primaryLabel: 'Zur Dropzone auf der Startseite',
  secondaryLabel: 'SiFa Multi-Mandant Preise',
  secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
} as const;

const SUBSTITUTIONS_MID_CTA = {
  headline: 'Substitutionsprüfung mit belastbaren SDB-Daten vorbereiten',
  body: 'Laden Sie ein Sicherheitsdatenblatt in den Livetest und prüfen Sie den KI-gestützten Entwurf als Grundlage für Ihre dokumentierte Abwägung. Die fachliche Freigabe bleibt beim Arbeitgeber.',
  primaryLabel: 'Zur Dropzone auf der Startseite',
  secondaryLabel: 'SiFa Multi-Mandant Preise',
  secondaryHref: PRICING_PAGE_SIFA_TAB_HREF,
} as const;

export const DEEPINFO_PAGE_EXTENSIONS: Partial<Record<DeepinfoSlug, Partial<DeepinfoPageExtension>>> = {
  'gefahrstoffunterweisung-vorlage': {
    sectionsAfterComparison: <StrikingDistanceMidPageCta copy={UNTERWEISUNG_MID_CTA} variant="wissen" />,
  },
  'substitutionspruefung-vorlage': {
    sectionsAfterComparison: <StrikingDistanceMidPageCta copy={SUBSTITUTIONS_MID_CTA} variant="wissen" />,
  },
  'gefahrstoffverzeichnis-muster-kfz-werkstatt': {
    sectionsBeforeComparison: (
      <StrikingDistanceMidPageCta copy={WISSEN_KFZ_MID_CTA} variant="wissen" />
    ),
  },
  'gefahrstoffmanagement-software': {
    comparison: <SoftwareCategoryComparison />,
    sectionsBeforeComparison: <SoftwareAeoAnswers />,
    sectionsAfterComparison: <SoftwareLongtailSections />,
    extraFaqSchemaItems: SOFTWARE_AEO_ANSWERS.map(({ question, answer }) => ({ question, answer })),
    includeSoftwareApplicationSchema: true,
  },
};
