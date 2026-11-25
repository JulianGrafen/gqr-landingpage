/**
 * SERP-Snippets (Title + Meta-/OG-Description) aller Betriebsanweisungs-Stoffseiten.
 *
 * - Eine Quelle für alle `/betriebsanweisung/[slug]/`-Seiten (keine Einzel-Overrides).
 * - Kein Haftungs-Disclaimer im Snippet: Der Hinweis „KI-gestützter Entwurf (gemäß TRGS 555)“
 *   steht sichtbar in der BA-Vorschau auf der Seite selbst.
 * - Keine Gedankenstriche (Em-/En-Dash); Kandidaten absteigend nach Länge für lange Stoffnamen.
 */

export const BA_SERP_TITLE_CANDIDATES: readonly ((substanceName: string) => string)[] = [
  (name) => `Betriebsanweisung ${name} (TRGS 555): Muster & PDF`,
  (name) => `Betriebsanweisung ${name} (TRGS 555): Muster`,
  (name) => `Betriebsanweisung ${name} (TRGS 555)`,
  (name) => `Betriebsanweisung ${name}`,
];

export const BA_SERP_DESCRIPTION_CANDIDATES: readonly ((substanceName: string) => string)[] = [
  (name) =>
    `TRGS-555-Betriebsanweisung für ${name} mit H-Sätzen, PSA & Lagerklasse. Eigenes SDB-PDF reinziehen und fertige BA inkl. QR-Code ohne Login testen.`,
  (name) =>
    `TRGS-555-Betriebsanweisung für ${name} mit H-Sätzen, PSA & Lagerklasse. Eigenes SDB-PDF reinziehen, BA inkl. QR-Code ohne Login testen.`,
  (name) => `Betriebsanweisung ${name} nach TRGS 555 mit H-Sätzen & PSA. Eigenes SDB-PDF reinziehen, BA inkl. QR-Code ohne Login testen.`,
  (name) => `Betriebsanweisung ${name} nach TRGS 555. SDB-PDF reinziehen, BA inkl. QR-Code ohne Login testen.`,
];

export const BA_OG_IMAGE_ALT = (substanceName: string) => `Muster-Betriebsanweisung ${substanceName} nach TRGS 555`;
