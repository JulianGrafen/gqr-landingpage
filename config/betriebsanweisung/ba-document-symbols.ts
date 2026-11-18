import type { ProtectiveEquipmentId } from '@/lib/sdb-preview/api-contract';

/**
 * ISO-7010-Zeichen der Live-BA-Vorschau — identische Assets wie im gqr-backend
 * (`src/assets/ba-symbols/*`, PDF-Export), als 128-px-PNG unter `public/images/ba-symbols/`.
 */
export interface BaDocumentSymbol {
  src: string;
  label: string;
}

const SYMBOL_BASE_PATH = '/images/ba-symbols';

export const PROTECTIVE_EQUIPMENT_SIGNS: Record<ProtectiveEquipmentId, BaDocumentSymbol> = {
  eye_protection: { src: `${SYMBOL_BASE_PATH}/M004.png`, label: 'M004 Augenschutz benutzen' },
  hand_protection: { src: `${SYMBOL_BASE_PATH}/M009.png`, label: 'M009 Handschutz benutzen' },
  respiratory_protection: { src: `${SYMBOL_BASE_PATH}/M017.png`, label: 'M017 Atemschutz benutzen' },
  protective_clothing: { src: `${SYMBOL_BASE_PATH}/M010.png`, label: 'M010 Schutzkleidung benutzen' },
};

export const EMERGENCY_WARNING_SIGN: BaDocumentSymbol = {
  src: `${SYMBOL_BASE_PATH}/W001.svg`,
  label: 'W001 Allgemeines Warnzeichen',
};

export const FIRST_AID_SIGN: BaDocumentSymbol = {
  src: `${SYMBOL_BASE_PATH}/E003.png`,
  label: 'E003 Erste Hilfe',
};
