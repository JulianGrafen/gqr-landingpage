import type { SubstanceClusterId } from '@/config/betriebsanweisung/substance-clusters';
import { TURNKEY_AUDIT_SLUG } from '@/config/home-sections/turnkey-audit';
import { SIFA_MANDANT_BLOCK_SIZE, SIFA_MANDANT_INCLUDED } from '@/config/sifa-mandant-pricing';

/**
 * Conversion-Bausteine rund um die SDB-Dropzone der Betriebsanweisungs-Seiten.
 * Herstellernamen nur als beschreibender Text (§ 23 MarkenG), nie als Logo.
 */

const REACH_COMPATIBILITY_HINT =
  'Ausgelegt auf standardisierte EU-Sicherheitsdatenblätter nach Verordnung (EG) Nr. 1907/2006 (REACH).';

export const SUPPLIER_COMPATIBILITY_HINTS: Record<SubstanceClusterId, string> = {
  cleaning:
    'Liest Lieferanten-SDBs gängiger Hersteller, z. B. Kiehl, Buzil, Dr. Schnell, Tana, Ecolab oder Kärcher. Herstellernamen dienen nur der Beschreibung.',
  'automotive-industry':
    'Liest Lieferanten-SDBs gängiger Hersteller, z. B. Würth, Liqui Moly, Castrol, Normfest, Förch oder Fuchs. Herstellernamen dienen nur der Beschreibung.',
  'acids-alkalis': REACH_COMPATIBILITY_HINT,
  laboratory: REACH_COMPATIBILITY_HINT,
  general: REACH_COMPATIBILITY_HINT,
};

export const MOBILE_UPLOAD_FALLBACK = {
  label:
    'Auf dem Smartphone unterwegs? Kostenlosen Account anlegen und das SDB später am Rechner hochladen →',
  utmContent: 'mobile-fallback',
} as const;

/** Ziel eines CTAs: interne Seite oder Registrierung mit seitenspezifischen UTM-Parametern. */
export type IntentCtaTarget = { kind: 'path'; href: string } | { kind: 'register'; utmContent: string };

export interface IntentCard {
  id: string;
  audience: string;
  title: string;
  body: string;
  cta: { label: string; target: IntentCtaTarget };
}

/** Intent-Weiche oberhalb der FAQ (Schlüsselfertig-Service vs. Self-Serve für SiFas). */
export const INTENT_SWITCH = {
  headline: 'Zwei Wege zum fertigen Gefahrstoffkataster',
  turnkey: {
    id: 'schluesselfertig',
    audience: 'Für KMU mit mehr als 30 Stoffen',
    title: 'Keine Zeit, alle SDBs selbst zu suchen und hochzuladen?',
    body: 'Mit dem Schlüsselfertig-Service (2.900 € Festpreis, netto zzgl. MwSt.) erstellen wir Ihr Gefahrstoffverzeichnis nach § 6 GefStoffV inklusive KI-gestützter BA-Entwürfe (gemäß TRGS 555) und QR-Etiketten. Die fachliche Freigabe bleibt bei der SiFa / dem Arbeitgeber.',
    cta: { label: 'Schlüsselfertig-Service ansehen →', target: { kind: 'path', href: `/wissen/${TURNKEY_AUDIT_SLUG}/` } },
  },
  sifa: {
    id: 'sifa',
    audience: 'Für externe SiFas & Ingenieurbüros',
    title: 'Sie betreuen mehrere Betriebe als externe SiFa?',
    body: `Verwalten Sie Ihre Kundenbetriebe getrennt nach Mandant, Werk und Tätigkeit in einem Zugang. ${SIFA_MANDANT_INCLUDED} Mandanten sind inklusive, erweiterbar in ${SIFA_MANDANT_BLOCK_SIZE}er-Blöcken.`,
    cta: { label: 'Als SiFa kostenlos starten →', target: { kind: 'register', utmContent: 'sifa-box' } },
  },
} as const satisfies { headline: string; turnkey: IntentCard; sifa: IntentCard };
