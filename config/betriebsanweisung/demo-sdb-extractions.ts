import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import type { SubstanceClusterId } from '@/config/betriebsanweisung/substance-clusters';
import type { PrefillLike } from '@/lib/sdb-preview/map-teaser';

/**
 * Demo-Extraktionen für den 1-Klick-Test ohne eigenes PDF („Mit Beispiel-SDB live testen“).
 *
 * Leitplanke (README): Diese Datei wird AUSSCHLIESSLICH per dynamischem `import()` nach Nutzerklick
 * geladen (eigener Client-Chunk) und erscheint damit nie im statischen HTML / SSR der Landingpage.
 * Werte sind als „Beispiel-SDB“ gekennzeichnet und ersetzen nicht das SDB des eigenen Lieferanten.
 *
 * Feldnamen spiegeln gqr-backend `SdbPrefillData` (wie `config/sdb-preview-examples.ts`).
 * Neue Slugs: Block in `DEMO_EXTRACTIONS_BY_SLUG` ergänzen; ohne Eintrag greift der Cluster-Fallback.
 */

export type DemoSdbPrefill = Omit<PrefillLike, 'previewToken'>;

export interface DemoSdbExtraction {
  /** Bezeichnung der Demo-Quelle im Badge, z. B. „Beispiel-SDB Salzsäure 37 %“. */
  sourceLabel: string;
  prefill: DemoSdbPrefill;
}

const DEMO_MANUFACTURER = 'Muster-Chemiehandel GmbH (Beispiel-SDB)';

const SALZSAEURE_DEMO: DemoSdbExtraction = {
  sourceLabel: 'Beispiel-SDB Salzsäure 37 %',
  prefill: {
    name: 'Salzsäure 37 %',
    manufacturer: DEMO_MANUFACTURER,
    cas_number: '7647-01-0',
    signal_word: 'Gefahr',
    ghs_pictograms: ['GHS05', 'GHS07'],
    h_statements: [
      'H290 Kann gegenüber Metallen korrosiv sein.',
      'H314 Verursacht schwere Verätzungen der Haut und schwere Augenschäden.',
      'H335 Kann die Atemwege reizen.',
    ].join('\n'),
    p_statements: [
      'P280 Schutzhandschuhe/Schutzkleidung/Augenschutz/Gesichtsschutz tragen.',
      'P303+P361+P353 BEI BERÜHRUNG MIT DER HAUT (oder dem Haar): Alle kontaminierten Kleidungsstücke sofort ausziehen. Haut mit Wasser abwaschen.',
      'P305+P351+P338 BEI KONTAKT MIT DEN AUGEN: Einige Minuten lang behutsam mit Wasser spülen.',
      'P261 Einatmen von Dampf/Aerosol vermeiden.',
    ].join('\n'),
    ba_schutzmassnahmen: 'Nur unter Absaugung umfüllen. Atemschutz bei Überschreitung des Arbeitsplatzgrenzwerts.',
    psa_gloves: 'Butylkautschuk, EN 374',
  },
};

export const DEMO_EXTRACTIONS_BY_SLUG: Partial<Record<HazardousSubstanceSlug, DemoSdbExtraction>> = {
  'salzsaeure-trgs-555': SALZSAEURE_DEMO,
};

/** Fallback je Cluster, falls für den Slug keine eigene Demo hinterlegt ist. */
const DEMO_EXTRACTIONS_BY_CLUSTER: Record<SubstanceClusterId, DemoSdbExtraction> = {
  'acids-alkalis': SALZSAEURE_DEMO,
  cleaning: {
    sourceLabel: 'Beispiel-SDB Sanitärreiniger',
    prefill: {
      name: 'Sanitärreiniger sauer (Beispiel)',
      manufacturer: DEMO_MANUFACTURER,
      signal_word: 'Achtung',
      ghs_pictograms: ['GHS07'],
      h_statements: 'H319 Verursacht schwere Augenreizung.',
      p_statements: [
        'P280 Schutzhandschuhe/Augenschutz tragen.',
        'P305+P351+P338 BEI KONTAKT MIT DEN AUGEN: Einige Minuten lang behutsam mit Wasser spülen.',
      ].join('\n'),
    },
  },
  'automotive-industry': {
    sourceLabel: 'Beispiel-SDB Bremsenreiniger',
    prefill: {
      name: 'Bremsenreiniger (Beispiel)',
      manufacturer: DEMO_MANUFACTURER,
      signal_word: 'Gefahr',
      ghs_pictograms: ['GHS02', 'GHS07'],
      h_statements: 'H225 Flüssigkeit und Dampf leicht entzündbar.\nH319 Verursacht schwere Augenreizung.',
      p_statements: [
        'P210 Von Hitze, heißen Oberflächen, Funken, offenen Flammen sowie anderen Zündquellenarten fernhalten.',
        'P280 Schutzhandschuhe/Schutzkleidung/Augenschutz tragen.',
      ].join('\n'),
    },
  },
  laboratory: {
    sourceLabel: 'Beispiel-SDB Aceton',
    prefill: {
      name: 'Aceton (Beispiel)',
      manufacturer: DEMO_MANUFACTURER,
      cas_number: '67-64-1',
      signal_word: 'Gefahr',
      ghs_pictograms: ['GHS02', 'GHS07'],
      h_statements:
        'H225 Flüssigkeit und Dampf leicht entzündbar.\nH319 Verursacht schwere Augenreizung.\nH336 Kann Schläfrigkeit und Benommenheit verursachen.',
      p_statements: [
        'P210 Von Hitze, heißen Oberflächen, Funken, offenen Flammen sowie anderen Zündquellenarten fernhalten.',
        'P280 Schutzhandschuhe/Augenschutz tragen.',
      ].join('\n'),
    },
  },
  general: {
    sourceLabel: 'Beispiel-SDB Universalverdünnung',
    prefill: {
      name: 'Universalverdünnung (Beispiel)',
      manufacturer: DEMO_MANUFACTURER,
      signal_word: 'Gefahr',
      ghs_pictograms: ['GHS02', 'GHS07'],
      h_statements:
        'H225 Flüssigkeit und Dampf leicht entzündbar.\nH336 Kann Schläfrigkeit und Benommenheit verursachen.',
      p_statements: [
        'P210 Von Hitze, heißen Oberflächen, Funken, offenen Flammen sowie anderen Zündquellenarten fernhalten.',
        'P280 Schutzhandschuhe/Augenschutz tragen.',
      ].join('\n'),
    },
  },
};

export function resolveDemoSdbExtraction(slug: string, cluster: SubstanceClusterId): DemoSdbExtraction {
  return DEMO_EXTRACTIONS_BY_SLUG[slug as HazardousSubstanceSlug] ?? DEMO_EXTRACTIONS_BY_CLUSTER[cluster];
}
