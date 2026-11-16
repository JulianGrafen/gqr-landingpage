import type { ReactNode } from 'react';
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

export const DEEPINFO_PAGE_EXTENSIONS: Partial<Record<DeepinfoSlug, DeepinfoPageExtension>> = {
  'gefahrstoffmanagement-software': {
    comparison: <SoftwareCategoryComparison />,
    sectionsBeforeComparison: <SoftwareAeoAnswers />,
    sectionsAfterComparison: <SoftwareLongtailSections />,
    extraFaqSchemaItems: SOFTWARE_AEO_ANSWERS.map(({ question, answer }) => ({ question, answer })),
    includeSoftwareApplicationSchema: true,
  },
};
