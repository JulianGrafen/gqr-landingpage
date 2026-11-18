/**
 * Fortschrittsmodell der SDB-Extraktion (rein, ohne React).
 *
 * Die Kurve folgt der realen Request-Dauer der KI-Extraktion (typisch 4–9 s):
 * - zwei lineare Phasen mit festen Zeitfenstern,
 * - danach eine asymptotische Phase, die sich `COMPOSING_ASYMPTOTE_PERCENT` nur annähert,
 *   bis die Response da ist (kein Hängenbleiben, kein vorzeitiges Volllaufen),
 * - Vollausschlag ausschließlich nach erfolgreicher Response (`COMPLETED_EXTRACTION_PROGRESS`).
 */

export type ExtractionProgressStageId = 'reading' | 'extracting' | 'composing' | 'complete';

export interface ExtractionProgressStage {
  id: ExtractionProgressStageId;
  label: string;
  startPercent: number;
  /** Bei der asymptotischen Phase der Grenzwert, der nie erreicht wird. */
  endPercent: number;
  startMs: number;
  /** `null` = offenes Ende (asymptotisch bis zur Response). */
  endMs: number | null;
}

export const COMPOSING_ASYMPTOTE_PERCENT = 88;

/** Zeitkonstante der asymptotischen Phase: nach 1τ ≈ 63 % des Restwegs bis 88 %. */
export const COMPOSING_TIME_CONSTANT_MS = 3500;

/** Dauer, für die der volle Balken sichtbar bleibt, bevor die Vorschau umschaltet. */
export const COMPLETION_SNAP_MS = 300;

/** Arbeitsphasen in Reihenfolge (ohne Abschluss), z. B. für Schrittlisten. */
export const EXTRACTION_WORK_STAGES: readonly ExtractionProgressStage[] = [
  {
    id: 'reading',
    label: 'PDF-Dokument wird gelesen & geprüft …',
    startPercent: 0,
    endPercent: 25,
    startMs: 0,
    endMs: 1500,
  },
  {
    id: 'extracting',
    label: 'Abschnitt 2 & 3 (GHS, H-/P-Sätze, Inhaltsstoffe) werden extrahiert …',
    startPercent: 25,
    endPercent: 60,
    startMs: 1500,
    endMs: 4500,
  },
  {
    id: 'composing',
    label: 'Schutzmaßnahmen (Abschnitt 8) & TRGS-555-Layout werden aufgebaut …',
    startPercent: 60,
    endPercent: COMPOSING_ASYMPTOTE_PERCENT,
    startMs: 4500,
    endMs: null,
  },
];

export const EXTRACTION_COMPLETE_LABEL = 'Fertig! Vorschau wird aktualisiert …';

export interface ExtractionProgressSnapshot {
  stageId: ExtractionProgressStageId;
  /** Ganzzahl 0–100. */
  percent: number;
  label: string;
}

export const INITIAL_EXTRACTION_PROGRESS: ExtractionProgressSnapshot = {
  stageId: 'reading',
  percent: 0,
  label: EXTRACTION_WORK_STAGES[0].label,
};

export const COMPLETED_EXTRACTION_PROGRESS: ExtractionProgressSnapshot = {
  stageId: 'complete',
  percent: 100,
  label: EXTRACTION_COMPLETE_LABEL,
};

function progressWithinStage(stage: ExtractionProgressStage, elapsedMs: number): number {
  const elapsedInStage = elapsedMs - stage.startMs;
  const span = stage.endPercent - stage.startPercent;

  if (stage.endMs === null) {
    const approach = 1 - Math.exp(-elapsedInStage / COMPOSING_TIME_CONSTANT_MS);
    return stage.startPercent + span * approach;
  }

  const ratio = elapsedInStage / (stage.endMs - stage.startMs);
  return stage.startPercent + span * Math.min(1, Math.max(0, ratio));
}

/**
 * Fortschritt für eine verstrichene (ggf. skalierte) Zeit seit Start der Extraktion.
 * Erreicht nie den Vollausschlag; der kommt nur über `COMPLETED_EXTRACTION_PROGRESS`.
 */
export function computeExtractionProgress(elapsedMs: number): ExtractionProgressSnapshot {
  const safeElapsed = Math.max(0, elapsedMs);
  const stage =
    EXTRACTION_WORK_STAGES.find((candidate) => candidate.endMs === null || safeElapsed < candidate.endMs) ??
    EXTRACTION_WORK_STAGES[EXTRACTION_WORK_STAGES.length - 1];

  // floor statt round: der Wert bleibt sicher unter dem Asymptotenwert.
  const percent = Math.floor(progressWithinStage(stage, safeElapsed));
  return { stageId: stage.id, percent, label: stage.label };
}

/** Index der aktiven Arbeitsphase (Abschluss = letzter Index), für Schrittlisten. */
export function extractionStageIndex(stageId: ExtractionProgressStageId): number {
  if (stageId === 'complete') return EXTRACTION_WORK_STAGES.length - 1;
  return EXTRACTION_WORK_STAGES.findIndex((stage) => stage.id === stageId);
}
