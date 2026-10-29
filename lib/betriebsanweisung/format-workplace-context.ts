/**
 * Grammatik für Branchen-Kontext in pSEO-Fließtexten (1, 2, 3+ Branchen).
 */
export function formatWorkplaceContextPhrase(industries: readonly string[]): string {
  const list = industries.filter(Boolean).slice(0, 3);
  if (list.length === 0) {
    return 'im gewerblichen und industriellen Betriebsalltag';
  }
  if (list.length === 1) {
    return `im Bereich ${list[0]}`;
  }
  if (list.length === 2) {
    return `im Bereich ${list[0]} oder ${list[1]}`;
  }
  return `im Bereich ${list[0]}, ${list[1]} oder ${list[2]}`;
}

export function buildWorkplaceConditionsParagraph(
  substanceName: string,
  industries: readonly string[],
): string {
  const context = formatWorkplaceContextPhrase(industries);
  return `Ob beim Einsatz ${context}: Die konkreten Arbeitsbedingungen vor Ort bestimmen zusammen mit dem Sicherheitsdatenblatt Ihres Lieferanten, welche Schutzmaßnahmen für ${substanceName} festgelegt werden müssen.`;
}
