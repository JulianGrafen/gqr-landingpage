import type { IndustrySlug } from '@/config/industry-solutions';

/**
 * Zuordnung freier Branchen-Labels aus `entries.ts` zu den Branchen-Landingpages `/loesungen/{slug}/`.
 * Treffer über Wortstamm (lowercase, Teilstring), damit Varianten wie „Labor & Analytik“ greifen.
 */
export const INDUSTRY_SOLUTION_KEYWORDS: Record<IndustrySlug, readonly string[]> = {
  'kfz-werkstatt': ['kfz', 'fuhrpark'],
  schreinerei: ['schreiner', 'holz'],
  malerbetrieb: ['maler', 'lackier'],
  laborbetrieb: ['labor'],
  reinigungsunternehmen: ['gebäudereinigung', 'facility', 'reinigungsdienst'],
  friseursalon: ['friseur', 'friseursalon', 'kosmetik'],
  metallbau: ['metallbau', 'schweiß', 'schweiss'],
  landwirtschaft: ['landwirtschaft', 'hof', 'agrartechnik', 'pflanzenschutz'],
  zahnarztpraxis: ['zahnarzt', 'zahnarztpraxis', 'dental', 'arztpraxis'],
  elektrobetrieb: ['elektro', 'elektrobetrieb', 'elektriker', 'gebäudetechnik'],
  dachdecker: ['dachdecker', 'bedachung', 'dach', 'spengler'],
  tankstelle: ['tankstelle', 'kraftstoff', 'shop', 'waschanlage'],
  druckerei: ['druckerei', 'offset', 'siebdruck', 'buchbinderei'],
  baeckerei: ['bäckerei', 'baeckerei', 'backstube', 'konditorei'],
  'sifa-mehrere-mandanten': [
    'sifa',
    'fachkraft',
    'arbeitssicherheit',
    'mandant',
    'ingenieurbüro',
    'arbeitsschutz',
    'sicherheitsfachkraft',
  ],
  fliesenleger: ['fliesen', 'fliesenleger', 'naturstein', 'plattenleger'],
  'shk-betrieb': ['shk', 'sanitär', 'heizung', 'installateur', 'klima'],
  lackiererei: ['lackier', 'karosserie', 'lackiererei', 'autolackier'],
  tischlerei: ['tischlerei', 'tischler', 'möbelbau', 'innenausbau'],
  gastronomie: ['gastronomie', 'grossküche', 'großküche', 'restaurant', 'küche'],
  steinmetz: ['steinmetz', 'steinmetzerei', 'naturstein', 'grabstein'],
  'garten-landschaftsbau': ['galabau', 'landschaftsbau', 'gartenbau', 'grünanlagen', 'gartnerei'],
  pflegeeinrichtung: ['pflegeheim', 'pflegeeinrichtung', 'altenpflege', 'seniorenheim', 'krankenhaus'],
  geruestbau: ['gerüstbau', 'geruestbau', 'gerüst', 'geruest', 'arbeitsbühne'],
  textilreinigerei: ['textilreinigung', 'textilreinigerei', 'wäscherei', 'chemische reinigung', 'trockenreinigung'],
  kunststoffverarbeitung: [
    'kunststoffverarbeitung',
    'kunststoff',
    'spritzguss',
    'spritzgießen',
    'plastverarbeitung',
  ],
  tierarztpraxis: ['tierarzt', 'tierarztpraxis', 'veterinär', 'veterinaer', 'kleintierpraxis'],
};