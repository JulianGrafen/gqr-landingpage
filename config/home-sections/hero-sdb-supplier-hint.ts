/** SDB-Layoutquellen unter der Hero-Dropzone (Desktop: genau eine Zeile, keine Waisen). */
const HERO_SDB_SUPPLIER_BRANDS = ['Würth', 'Liqui Moly', 'BASF', 'Henkel', 'Sika', 'Weicon', 'Castrol'] as const;

/** Hinweis unter der Hero-SDB-Dropzone (Text-only, keine Markenlogos). */
export const HERO_SDB_SUPPLIER_HINT = {
  intro:
    'Liest Sicherheitsdatenblätter aller gängigen Hersteller & Großhändler zuverlässig aus, u. a. kompatibel mit Formaten von:',
  brands: HERO_SDB_SUPPLIER_BRANDS,
  brandsAriaLabel: `Beispiele für SDB-Layoutquellen (ohne Markenpartnerschaft): ${HERO_SDB_SUPPLIER_BRANDS.join(', ')}`,
} as const;
