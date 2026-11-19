/**
 * Zentrale Anbieter-Stammdaten (Impressum, Lieferanten-Stammdaten-Box, AVV-Anforderung, JSON-LD).
 * Einzige Quelle für Firmenangaben — nirgendwo sonst hartkodieren.
 *
 * TODO(company): Werte vor jeder Änderung der Rechtsform / Anschrift mit /impressum/index.html
 * und den Rechnungsvorlagen abgleichen (Stand: Impressum 2026-11).
 */

export interface CompanyPostalAddress {
  street: string;
  postalCode: string;
  city: string;
  countryCode: 'DE';
  countryName: string;
}

export interface CompanyMasterData {
  /** Marken-/Produktname */
  brandName: string;
  /** Inhaber bzw. eingetragener Firmenname (Rechnungsempfänger-Stammdaten beim Kunden). */
  legalName: string;
  legalForm: string;
  address: CompanyPostalAddress;
  /** Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG (ohne Leerzeichen, wie im Kreditorenstamm). */
  vatId: string;
  /** Allgemeine Kontakt- und Rechnungsadresse. */
  contactEmail: string;
  /** Persönlicher Ansprechpartner für AVV, Angebote und Einkaufsrückfragen. */
  procurementEmail: string;
}

export const COMPANY: CompanyMasterData = {
  brandName: 'Gefahrstoff-QR',
  legalName: 'Julian Gräfen',
  legalForm: 'Einzelunternehmer',
  address: {
    street: 'Pfarrer-Reinartz-Str. 11',
    postalCode: '53925',
    city: 'Kall',
    countryCode: 'DE',
    countryName: 'Deutschland',
  },
  vatId: 'DE369543245',
  contactEmail: 'info@gefahrstoff-qr.de',
  // TODO(company): Bestätigen, ob Rechnungsrückfragen an info@ oder julian@ gehen sollen.
  procurementEmail: 'julian@gefahrstoff-qr.de',
};

/** Einzeilige Postanschrift, z. B. für Kopierfelder. */
export function formatCompanyAddressLine(address: CompanyPostalAddress = COMPANY.address): string {
  return `${address.street}, ${address.postalCode} ${address.city}, ${address.countryName}`;
}

/** mailto-Link mit sauber kodiertem Betreff. */
export function buildCompanyMailto(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
