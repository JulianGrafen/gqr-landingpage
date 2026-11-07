import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

export type AlphabetGroup = {
  /** Anzeige- und Ankerbuchstabe, z. B. „A“ oder „0-9“. */
  letter: string;
  anchorId: string;
  entries: HazardousSubstanceSeoEntry[];
};

function groupLetter(substanceName: string): string {
  const first = substanceName
    .trim()
    .charAt(0)
    .toUpperCase()
    .replace('Ä', 'A')
    .replace('Ö', 'O')
    .replace('Ü', 'U');
  return /[A-Z]/.test(first) ? first : '0-9';
}

/** Gruppiert Stoffe alphabetisch (Ziffern zuerst) für die A-Z-Hub-Seite. */
export function groupEntriesAlphabetically(entries: readonly HazardousSubstanceSeoEntry[]): AlphabetGroup[] {
  const groups = new Map<string, HazardousSubstanceSeoEntry[]>();
  [...entries]
    .sort((a, b) => a.substanceName.localeCompare(b.substanceName, 'de'))
    .forEach((entry) => {
      const letter = groupLetter(entry.substanceName);
      groups.set(letter, [...(groups.get(letter) ?? []), entry]);
    });

  return [...groups.entries()]
    .sort(([a], [b]) => (a === '0-9' ? -1 : b === '0-9' ? 1 : a.localeCompare(b)))
    .map(([letter, groupEntries]) => ({
      letter,
      anchorId: `stoffe-${letter.toLowerCase()}`,
      entries: groupEntries,
    }));
}
