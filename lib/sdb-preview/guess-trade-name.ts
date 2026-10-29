/** Heuristik: Produktname aus Abschnitt-1-Text (clientseitig, vor API-Antwort). */
export function guessTradeNameFromSectionText(text: string): string | null {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return null;

  const patterns = [
    /(?:Handelsname|Produktbezeichnung|Produktname|Trade name|Product name)\s*[:：]\s*([^|·\n]{2,120})/i,
    /(?:Bezeichnung des Stoffs|Bezeichnung des Gemischs)\s*[^:]{0,40}[:：]\s*([^|·\n]{2,120})/i,
    /(?:Stoffname|Name des Produkts)\s*[:：]\s*([^|·\n]{2,120})/i,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(normalized);
    if (match?.[1]) {
      const candidate = match[1].replace(/\s{2,}/g, ' ').trim();
      if (candidate.length >= 2 && candidate.length <= 120) return candidate;
    }
  }

  return null;
}
