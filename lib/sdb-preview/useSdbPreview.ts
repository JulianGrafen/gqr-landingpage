'use client';

import { useCallback, useRef, useState } from 'react';
import type {
  SdbPreviewExampleId,
  SdbPreviewPostResponse,
  SdbPreviewSource,
  SdbPreviewTeaser,
} from '@/lib/sdb-preview/api-contract';
import type { ExtractionProgressSnapshot } from '@/lib/sdb-preview/extraction-progress';
import { trackDemoCounterEvent } from '@/lib/analytics/demo-counter';
import { trackFunnelEvent } from '@/lib/analytics/funnel';
import { createSdbDraft } from '@/lib/sdb-preview/create-draft';
import { loadSdbPreviewConfig } from '@/lib/sdb-preview/load-config';
import { prepareCompactUpload, runExamplePreview, uploadPdfPreview } from '@/lib/sdb-preview/preview-api-client';
import { persistPreviewToken } from '@/lib/sdb-preview/preview-handoff';
import { useExtractionProgress, type StartExtractionProgressOptions } from '@/lib/sdb-preview/use-extraction-progress';

export type SdbPreviewPhase = 'idle' | 'processing' | 'ready' | 'error';

export type { SdbPreviewSource };

export type SdbDemoPreviewLoader = () => Promise<{
  /** Anzeigename der Quelle, z. B. „Beispiel-SDB Salzsäure 37 %“. */
  sourceLabel: string;
  /** Bereits für die Landing gekürzter Teaser. */
  teaser: SdbPreviewTeaser;
}>;

export interface SdbPreviewController {
  phase: SdbPreviewPhase;
  progress: ExtractionProgressSnapshot;
  teaser: SdbPreviewTeaser | null;
  source: SdbPreviewSource | null;
  error: string | null;
  /** Dateiname des hochgeladenen PDFs (nur bei `source.kind === 'upload'`). */
  fileLabel: string | null;
  /** Clientseitig erkannter Produktname, während die API noch läuft. */
  earlyTradeName: string | null;
  /** Draft-Token aus `POST /api/public/drafts` (für `?draft=` an Register-CTAs), sobald verfügbar. */
  draftToken: string | null;
  uploadFile: (file: File) => Promise<void>;
  runExample: (exampleId: SdbPreviewExampleId) => Promise<void>;
  runDemo: (loadDemo: SdbDemoPreviewLoader) => Promise<void>;
  reset: () => void;
}

/**
 * Demo-Lauf: gleiche Fortschrittskurve im Zeitraffer, damit der Durchlauf 1,5–2 s dauert
 * und sichtbar bis in Phase 3 kommt (1,8 s × 2,5 = 4,5 s Kurvenzeit ≈ 60 %).
 */
const DEMO_RUN_DURATION_MS = 1800;
const DEMO_PROGRESS_TIME_SCALE = 2.5;

type PreviewRunResult = Pick<SdbPreviewPostResponse, 'ok'> & {
  teaser?: SdbPreviewTeaser;
  error?: string;
  /** Erst nach dem Laden bekannte Quelle (Demo: Slug- oder Cluster-Beispiel). */
  resolvedSource?: SdbPreviewSource;
};

function toRunResult(response: SdbPreviewPostResponse): PreviewRunResult {
  return response.ok ? { ok: true, teaser: response.teaser } : { ok: false, error: response.error };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Serverseitiger Prefill existiert nur für echte Uploads und Server-Beispiele. */
export function hasTransferablePreviewToken(source: SdbPreviewSource | null): boolean {
  return source !== null && source.kind !== 'demo';
}

export function useSdbPreview(): SdbPreviewController {
  const [phase, setPhase] = useState<SdbPreviewPhase>('idle');
  const [teaser, setTeaser] = useState<SdbPreviewTeaser | null>(null);
  const [source, setSource] = useState<SdbPreviewSource | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [earlyTradeName, setEarlyTradeName] = useState<string | null>(null);
  const [draftToken, setDraftToken] = useState<string | null>(null);
  const extractionProgress = useExtractionProgress();
  const { start: startProgress, complete: completeProgress, stop: stopProgress } = extractionProgress;

  /** Monoton steigende Lauf-ID: Antworten veralteter Läufe (Reset / neuer Upload) werden verworfen. */
  const activeRunIdRef = useRef(0);

  const runPreview = useCallback(
    async (
      nextSource: SdbPreviewSource,
      run: (isCurrent: () => boolean) => Promise<PreviewRunResult>,
      progressOptions?: StartExtractionProgressOptions,
    ) => {
      const runId = activeRunIdRef.current + 1;
      activeRunIdRef.current = runId;
      const isCurrent = () => activeRunIdRef.current === runId;

      setSource(nextSource);
      setPhase('processing');
      setError(null);
      setTeaser(null);
      setEarlyTradeName(null);
      setDraftToken(null);
      startProgress(progressOptions);
      trackFunnelEvent('dropzone_interaction', { isExample: nextSource.kind !== 'upload' });
      if (nextSource.kind === 'upload') {
        trackDemoCounterEvent('dropzone_upload');
      } else if (nextSource.kind === 'example') {
        trackDemoCounterEvent('quick_example');
      }

      let result: PreviewRunResult;
      try {
        result = await run(isCurrent);
      } catch (cause) {
        result = {
          ok: false,
          error: cause instanceof Error && cause.message ? cause.message : 'Vorschau konnte nicht erstellt werden.',
        };
      }

      if (!isCurrent()) return;

      if (!result.ok || !result.teaser) {
        stopProgress();
        setPhase('error');
        setError(result.error ?? 'Unbekannter Fehler');
        return;
      }

      const readyTeaser = result.teaser;
      const readySource = result.resolvedSource ?? nextSource;
      await completeProgress();
      if (!isCurrent()) return;

      const transferable = hasTransferablePreviewToken(readySource);
      if (transferable) {
        persistPreviewToken(readyTeaser.previewToken);
      }
      setSource(readySource);
      setTeaser(readyTeaser);
      setPhase('ready');

      // Hintergrund-Übergabe an die App: Ergebnis zuerst zeigen, Draft-Token nachreichen.
      void createSdbDraft({
        previewToken: transferable ? readyTeaser.previewToken : null,
        source: readySource,
        teaser: readyTeaser,
      }).then((token) => {
        if (token && isCurrent()) setDraftToken(token);
      });
    },
    [startProgress, stopProgress, completeProgress],
  );

  const uploadFile = useCallback(
    (file: File) =>
      runPreview({ kind: 'upload', fileName: file.name }, async (isCurrent) => {
        const config = await loadSdbPreviewConfig();
        const prepared = await prepareCompactUpload(file);
        if (prepared.earlyTradeName && isCurrent()) {
          setEarlyTradeName(prepared.earlyTradeName);
        }
        const response = await uploadPdfPreview(
          file,
          { apiBaseUrl: config.apiBaseUrl, useMock: Boolean(config.useMock) },
          prepared,
        );
        return toRunResult(response);
      }),
    [runPreview],
  );

  const runExample = useCallback(
    (exampleId: SdbPreviewExampleId) =>
      runPreview({ kind: 'example', exampleId }, async () => {
        const config = await loadSdbPreviewConfig();
        const response = await runExamplePreview(exampleId, {
          apiBaseUrl: config.apiBaseUrl,
          useMock: Boolean(config.useMock),
        });
        return toRunResult(response);
      }),
    [runPreview],
  );

  const runDemo = useCallback(
    (loadDemo: SdbDemoPreviewLoader) =>
      runPreview(
        { kind: 'demo', label: '' },
        async () => {
          const [demo] = await Promise.all([loadDemo(), delay(DEMO_RUN_DURATION_MS)]);
          return { ok: true, teaser: demo.teaser, resolvedSource: { kind: 'demo', label: demo.sourceLabel } };
        },
        { timeScale: DEMO_PROGRESS_TIME_SCALE },
      ),
    [runPreview],
  );

  const reset = useCallback(() => {
    activeRunIdRef.current += 1;
    stopProgress();
    setPhase('idle');
    setTeaser(null);
    setSource(null);
    setError(null);
    setEarlyTradeName(null);
    setDraftToken(null);
  }, [stopProgress]);

  return {
    phase,
    progress: extractionProgress.progress,
    teaser,
    source,
    error,
    fileLabel: source?.kind === 'upload' ? source.fileName : null,
    earlyTradeName,
    draftToken,
    uploadFile,
    runExample,
    runDemo,
    reset,
  };
}
