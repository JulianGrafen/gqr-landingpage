/**
 * Referenzen (SiFa- und Betriebskunden) für Startseite und SiFa-Preis-Tab.
 *
 * So trägst du eine Referenz ein:
 * 1. Neues Objekt in CUSTOMER_REFERENCES anlegen (nur mit schriftlicher Freigabe).
 * 2. Pflicht: `name` (Person) und `buro` (Firma oder Büro).
 * 3. Optional: `rolle`, `fotoSrc` (Datei unter `/public`, z. B. `/images/references/…`),
 *    `zitat` (Freitext, kein Platzhalter), `url` (Mandanten- oder Profil-Link).
 * 4. Ist das Array leer, wird auf der Seite kein Referenz-Block gerendert.
 */

export type CustomerReference = {
  name: string;
  buro: string;
  rolle?: string;
  fotoSrc?: string;
  zitat?: string;
  url?: string;
};

export const CUSTOMER_REFERENCES: readonly CustomerReference[] = [];