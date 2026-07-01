import matrixData from '@/config/trgs510/trgs_510_matrix.json';
import { STORAGE_CLASSES } from '@/config/trgs510/storage-classes';
import type {
  StorageClass,
  StorageClassId,
  Trgs510CheckResult,
  Trgs510Matrix,
  Trgs510ResultCode,
  Trgs510RuleExplanation,
} from './types';

const TRGS_SOURCE = 'TRGS 510 Abschnitt 13.3, Tabelle 12';

const STORAGE_CLASSES_BY_ID = new Map<StorageClassId, StorageClass>(
  STORAGE_CLASSES.map((storageClass) => [storageClass.id, storageClass]),
);

const TRGS_MATRIX = matrixData as Trgs510Matrix;

const RULE_EXPLANATIONS: Record<Trgs510ResultCode, Trgs510RuleExplanation> = {
  '+': {
    code: '+',
    status: 'allowed',
    severity: 'green',
    label: 'Zusammenlagerung erlaubt',
    shortText: 'Die gewählten Lagerklassen dürfen nach Tabelle 12 zusammengelagert werden.',
    detail:
      'Die TRGS-510-Zusammenlagerungstabelle kennzeichnet diese Kombination mit „+“. Prüfen Sie zusätzlich produktspezifische Angaben im Sicherheitsdatenblatt, insbesondere Abschnitt 7 und 10.',
    sourceReference: TRGS_SOURCE,
  },
  '-': {
    code: '-',
    status: 'forbidden',
    severity: 'red',
    label: 'Zusammenlagerungsverbot',
    shortText: 'Für diese Kombination ist Separatlagerung erforderlich.',
    detail:
      'Die TRGS-510-Zusammenlagerungstabelle kennzeichnet diese Kombination mit „-“. Separatlagerung bedeutet getrennte Lagerabschnitte mit mindestens 90 Minuten Feuerwiderstandsdauer.',
    sourceReference: TRGS_SOURCE,
  },
  '1': {
    code: '1',
    status: 'restricted',
    severity: 'yellow',
    label: 'Spezifische Vorschriften beachten',
    shortText: 'Zusammenlagerung nur unter Beachtung spezifischer gesetzlicher Vorschriften.',
    detail:
      'Für LGK 1 und 4.1 A ist die 2. SprengV relevant, für LGK 5.1 C GefStoffV Anhang I Nr. 5 sowie TRGS 511, für LGK 5.2 DGUV Vorschrift 13 und für LGK 7 AtG, StrlSchG und StrlSchV.',
    sourceReference: `${TRGS_SOURCE}, Erläuterung Nr. 1`,
  },
  '2': {
    code: '2',
    status: 'restricted',
    severity: 'yellow',
    label: 'Getrenntlagerung in Räumen möglich',
    shortText: 'Getrenntlagerung kann statt Separatlagerung zulässig sein.',
    detail:
      'Zulässig bei maximal 50 gefüllten Druckgasbehältern, darunter höchstens 25 mit akut toxischen, entzündbaren oder oxidierenden Gasen, wenn eine mindestens 2 m hohe Wand aus nichtbrennbaren Baustoffen und 5 m Abstand zu brennbaren Lagergütern eingehalten werden.',
    sourceReference: `${TRGS_SOURCE}, Erläuterung Nr. 2`,
  },
  '3': {
    code: '3',
    status: 'restricted',
    severity: 'yellow',
    label: 'Gase nur unter Mengen- und Abstandsvorgaben',
    shortText: 'Verschiedene Druckgasbehälter dürfen nur unter definierten Bedingungen gemeinsam lagern.',
    detail:
      'Die TRGS 510 erlaubt bestimmte Kombinationen entzündbarer, oxidierender, akut toxischer und inerter Gase nur innerhalb definierter Mengen. Zwischen entzündbaren und oxidierenden Gasen ist mindestens 2 m Abstand einzuhalten.',
    sourceReference: `${TRGS_SOURCE}, Erläuterung Nr. 3`,
  },
  '4': {
    code: '4',
    status: 'restricted',
    severity: 'yellow',
    label: 'Bedingungen nach Tabelle 13 prüfen',
    shortText: 'Zusammenlagerung ist abhängig von Gesamtmenge und Brandschutzmaßnahmen.',
    detail:
      'Nach Tabelle 13 gelten bis 1 t keine Einschränkungen. Bei größeren Mengen sind in Gebäuden automatische Feuerlöschanlagen oder Brandmeldeanlagen mit nicht automatischer Feuerlöschanlage und anerkannter Werkfeuerwehr erforderlich.',
    sourceReference: `${TRGS_SOURCE}, Erläuterung Nr. 4 und Tabelle 13`,
  },
  '5': {
    code: '5',
    status: 'restricted',
    severity: 'yellow',
    label: 'Brandlasten im Lagerabschnitt vermeiden',
    shortText: 'Brennbare Materialien dürfen nicht zusätzlich im selben Lagerabschnitt stehen.',
    detail:
      'Materialien wie Papier, Textilien, Holz, Holzwolle, Kartonagen, Folien oder brennbare Verpackungsfüllstoffe dürfen nicht gelagert werden, sofern sie nicht für Lagerung und Transport eine Einheit mit den ortsbeweglichen Behältern bilden.',
    sourceReference: `${TRGS_SOURCE}, Erläuterung Nr. 5`,
  },
  '6': {
    code: '6',
    status: 'restricted',
    severity: 'yellow',
    label: 'Gefährdungserhöhung ausschließen',
    shortText: 'Zusammenlagerung nur, wenn keine wesentliche Gefährdungserhöhung eintritt.',
    detail:
      'Gefahrstoffe mit Matrixcode 6 dürfen mit anderen so gekennzeichneten Lagerklassen und Materialien nur zusammen gelagert werden, wenn dadurch keine wesentliche Gefährdungserhöhung entsteht. Getrenntlagerung kann diese Gefährdungserhöhung vermeiden.',
    sourceReference: `${TRGS_SOURCE}, Erläuterung Nr. 6`,
  },
  '7': {
    code: '7',
    status: 'restricted',
    severity: 'yellow',
    label: 'Brennbare Lagergüter nur unter Zusatzbedingungen',
    shortText: 'Zusammenlagerung mit brennbaren Lagergütern ist nur mit Brandschutzauflagen zulässig.',
    detail:
      'Zusammenlagerung mit brennbaren Lagergütern darf nur unter den Bedingungen nach Tabelle 13 und zusätzlich unter Beachtung der Brandlast-Regel aus Erläuterung Nr. 5 erfolgen.',
    sourceReference: `${TRGS_SOURCE}, Erläuterung Nr. 7`,
  },
  '8': {
    code: '8',
    status: 'restricted',
    severity: 'yellow',
    label: 'Bedingungen nach Tabelle 14 prüfen',
    shortText: 'Zusammenlagerung ist abhängig von Menge, Brandmeldung und Löschkonzept.',
    detail:
      'Nach Tabelle 14 gelten bis 10 t keine Einschränkungen. Bei höheren Mengen sind je nach Lagerort Brandmeldeanlage, stündliche Kontrolle, kurze Feuerwehr-Eintreffzeit oder automatische Feuerlöschanlage erforderlich.',
    sourceReference: `${TRGS_SOURCE}, Erläuterung Nr. 8 und Tabelle 14`,
  },
};

export function getStorageClasses(): StorageClass[] {
  return STORAGE_CLASSES;
}

export function getStorageClassById(id: StorageClassId): StorageClass {
  const storageClass = STORAGE_CLASSES_BY_ID.get(id);
  if (!storageClass) {
    throw new Error(`Unbekannte Lagerklasse: ${id}`);
  }
  return storageClass;
}

export function checkStorageCompatibility(
  firstClassId: StorageClassId,
  secondClassId: StorageClassId,
): Trgs510CheckResult {
  const code = TRGS_MATRIX[firstClassId]?.[secondClassId];
  if (!code) {
    throw new Error(`Keine TRGS-510-Matrixregel für ${firstClassId} / ${secondClassId}`);
  }

  return {
    ...RULE_EXPLANATIONS[code],
    firstClass: getStorageClassById(firstClassId),
    secondClass: getStorageClassById(secondClassId),
  };
}

export function isStorageClassId(value: string): value is StorageClassId {
  return STORAGE_CLASSES_BY_ID.has(value as StorageClassId);
}
