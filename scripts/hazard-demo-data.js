export const DEMO_SUBSTANCE_ID = "mock-123";

export const DEMO_SUBSTANCE = Object.freeze({
  id: DEMO_SUBSTANCE_ID,
  productName: "Industriereiniger RX-90",
  signalWord: "Gefahr",
  pictograms: ["Ätzwirkung (GHS05)", "Ausrufezeichen (GHS07)"],
  ufiCode: "A1B2-C3D4-E5F6-G7H8",
  waterHazardClass: "WGK 2 (deutlich wassergefährdend)",
  storageClass: "LGK 8A (Brennbare ätzende Stoffe)",
  hazardStatements: ["H314 Verursacht schwere Verätzungen der Haut."],
  precautionaryStatements: ["P280 Schutzhandschuhe/Augenschutz tragen."],
  firstAid: "Bei Augenkontakt sofort behutsam mit Wasser ausspülen.",
  supplier: "Mock Chemie GmbH, 53925 Kall",
});

export const SDB_EXTRACTION_FIELDS = Object.freeze([
  { key: "productName", label: "Produktname" },
  { key: "signalWord", label: "Signalwort", variant: "danger" },
  { key: "pictograms", label: "Piktogramme" },
  { key: "ufiCode", label: "UFI-Code" },
  { key: "waterHazardClass", label: "Wassergefährdungsklasse (WGK)" },
  { key: "storageClass", label: "Lagerklasse (TRGS 510)" },
  { key: "hazardStatements", label: "H-Sätze", variant: "danger" },
  { key: "precautionaryStatements", label: "P-Sätze" },
  { key: "firstAid", label: "Erste Hilfe" },
  { key: "supplier", label: "Hersteller/Lieferant" },
]);

export function formatFieldValue(value) {
  return Array.isArray(value) ? value.join(", ") : value;
}

export function getEmergencyPath(substanceId = DEMO_SUBSTANCE_ID) {
  return `/notfall/${substanceId}/`;
}
