/**
 * Branchen-Cluster der Betriebsanweisungs-Seiten. Steuert stoffneutrale Muster-Vorschau,
 * Hersteller-Kompatibilitätshinweis und Beispiel-CTA.
 *
 * Erst wird der Slug geprüft, dann die typischen Branchen; die Reihenfolgen stehen unten.
 */

export const SUBSTANCE_CLUSTER_IDS = ['cleaning', 'automotive-industry', 'acids-alkalis', 'laboratory', 'general'] as const;

export type SubstanceClusterId = (typeof SUBSTANCE_CLUSTER_IDS)[number];

export interface SubstanceClusterMatcher {
  id: Exclude<SubstanceClusterId, 'general'>;
  /** Teilstrings im Slug (z. B. "brems" in "bremsenreiniger-trgs-555"). */
  slugTerms: readonly string[];
  /** Teilstrings in `typicalIndustries` (Groß-/Kleinschreibung egal). */
  industryTerms: readonly string[];
}

export const SUBSTANCE_CLUSTER_MATCHERS: Record<SubstanceClusterMatcher['id'], SubstanceClusterMatcher> = {
  'acids-alkalis': {
    id: 'acids-alkalis',
    slugTerms: ['saeure', 'saure', 'lauge', 'hydroxid', 'ammoniak'],
    industryTerms: [],
  },
  'automotive-industry': {
    id: 'automotive-industry',
    slugTerms: [
      'brems', 'scheiben', 'felgen', 'kontakt', 'kuehlschmier', 'adblue', 'oel', 'fett', 'kraftstoff',
      'diesel', 'benzin', 'frostschutz', 'rostloeser', 'silikon', 'gas', 'butan', 'propan', 'kohlen', 'entfetter',
      'ketten', 'kaltreiniger', 'maschinenreiniger', 'metallreiniger', 'industriereiniger', 'politur', 'schmier',
      'wd-40', 'kaeltemittel',
    ],
    industryTerms: ['kfz', 'werkstatt', 'metall', 'industrie', 'produktion', 'instandhaltung', 'maschinenbau', 'logistik'],
  },
  laboratory: {
    id: 'laboratory',
    slugTerms: ['methanol', 'ethanol', 'aceton', 'formaldehyd', 'chloroform', 'toluol', 'xylol', 'hexan'],
    industryTerms: ['labor', 'forschung', 'apotheke', 'klinik', 'praxis'],
  },
  cleaning: {
    id: 'cleaning',
    slugTerms: ['reiniger', 'desinfektion', 'spuelmittel', 'seife', 'pflege', 'polish', 'entkalker', 'kalkloeser'],
    industryTerms: ['reinigung', 'facility', 'hauswirtschaft', 'gastronomie', 'hotel'],
  },
};

/**
 * Bau- und Malerprodukte landen bewusst im neutralen Cluster, auch wenn ihre Branchen
 * Reinigung oder Werkstatt nennen (sonst passt der Hersteller-Hinweis nicht).
 */
export const GENERAL_CLUSTER_SLUG_TERMS: readonly string[] = [
  'farbe', 'lack', 'kleister', 'tiefgrund', 'kleber', 'putz', 'moertel', 'insektenspray', 'loesemittel',
];

/**
 * Prioritäten: Im Slug gewinnen spezifische Begriffe vor dem generischen "reiniger"
 * (Bremsenreiniger = Werkstatt). Bei Branchen gewinnen enge Begriffe vor dem breiten "Industrie".
 */
export const SLUG_MATCH_ORDER: readonly SubstanceClusterMatcher['id'][] = [
  'acids-alkalis',
  'automotive-industry',
  'laboratory',
  'cleaning',
];

export const INDUSTRY_MATCH_ORDER: readonly SubstanceClusterMatcher['id'][] = [
  'laboratory',
  'cleaning',
  'automotive-industry',
];
