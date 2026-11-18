'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  COMPLETED_EXTRACTION_PROGRESS,
  COMPLETION_SNAP_MS,
  INITIAL_EXTRACTION_PROGRESS,
  computeExtractionProgress,
  type ExtractionProgressSnapshot,
} from '@/lib/sdb-preview/extraction-progress';

const TICK_INTERVAL_MS = 120;

export type StartExtractionProgressOptions = {
  /**
   * Zeitraffer für kurze Läufe (z. B. Demo-Extraktion): 2.5 = 1 s Echtzeit entspricht 2,5 s Kurve.
   * Standard 1 = reale API-Dauer.
   */
  timeScale?: number;
};

export interface ExtractionProgressControls {
  progress: ExtractionProgressSnapshot;
  start: (options?: StartExtractionProgressOptions) => void;
  /** Snap auf vollen Balken; resolved nach `COMPLETION_SNAP_MS`. */
  complete: () => Promise<void>;
  /** Stoppt den Ticker und setzt auf 0 % zurück (Fehler / Reset). */
  stop: () => void;
}

/** Zeitgesteuerter Fortschritt auf Basis von `computeExtractionProgress`. */
export function useExtractionProgress(): ExtractionProgressControls {
  const [progress, setProgress] = useState<ExtractionProgressSnapshot>(INITIAL_EXTRACTION_PROGRESS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTicker = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(
    ({ timeScale = 1 }: StartExtractionProgressOptions = {}) => {
      clearTicker();
      const startedAt = performance.now();
      setProgress(INITIAL_EXTRACTION_PROGRESS);
      intervalRef.current = setInterval(() => {
        setProgress(computeExtractionProgress((performance.now() - startedAt) * timeScale));
      }, TICK_INTERVAL_MS);
    },
    [clearTicker],
  );

  const complete = useCallback(async () => {
    clearTicker();
    setProgress(COMPLETED_EXTRACTION_PROGRESS);
    await new Promise<void>((resolve) => setTimeout(resolve, COMPLETION_SNAP_MS));
  }, [clearTicker]);

  const stop = useCallback(() => {
    clearTicker();
    setProgress(INITIAL_EXTRACTION_PROGRESS);
  }, [clearTicker]);

  useEffect(() => clearTicker, [clearTicker]);

  return { progress, start, complete, stop };
}
