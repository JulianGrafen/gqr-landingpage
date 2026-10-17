'use client';

import { useCallback, useRef, useState } from 'react';
import type { SdbPreviewExampleId } from '@/lib/sdb-preview/api-contract';
import { PROCESSING_STEP_LABELS } from '@/lib/sdb-preview/api-contract';
import { loadSdbPreviewConfig } from '@/lib/sdb-preview/load-config';
import {
  persistPreviewToken,
  runExamplePreview,
  uploadPdfPreview,
  type SdbPreviewTeaser,
} from '@/lib/sdb-preview/preview-api-client';

export type SdbPreviewPhase = 'idle' | 'processing' | 'ready' | 'error';

export function useSdbPreview() {
  const [phase, setPhase] = useState<SdbPreviewPhase>('idle');
  const [processingStepIndex, setProcessingStepIndex] = useState(0);
  const [teaser, setTeaser] = useState<SdbPreviewTeaser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const abortRef = useRef(false);

  /** Hero zeigt initial keine Teaser — Animation dauert fest 2,5 s (CRO). */
  const runProcessingAnimation = useCallback(async () => {
    const totalMs = 2500;
    const stepMs = Math.ceil(totalMs / PROCESSING_STEP_LABELS.length);
    setProcessingStepIndex(0);
    for (let i = 0; i < PROCESSING_STEP_LABELS.length; i += 1) {
      if (abortRef.current) return;
      setProcessingStepIndex(i);
      await new Promise((r) => setTimeout(r, stepMs));
    }
  }, []);

  const finishWithResult = useCallback(async (run: () => Promise<{ ok: boolean; teaser?: SdbPreviewTeaser; error?: string }>) => {
    abortRef.current = false;
    setPhase('processing');
    setError(null);
    setTeaser(null);

    const animation = runProcessingAnimation();
    const result = await run();
    await animation;

    if (abortRef.current) return;

    if (!result.ok || !result.teaser) {
      setPhase('error');
      setError(result.error ?? 'Unbekannter Fehler');
      return;
    }

    persistPreviewToken(result.teaser.previewToken);
    setTeaser(result.teaser);
    setPhase('ready');
  }, [runProcessingAnimation]);

  const uploadFile = useCallback(
    async (file: File) => {
      setFileLabel(file.name);
      const config = await loadSdbPreviewConfig();
      await finishWithResult(async () => {
        const res = await uploadPdfPreview(file, {
          apiBaseUrl: config.apiBaseUrl,
          useMock: Boolean(config.useMock),
        });
        if (!res.ok) return { ok: false, error: res.error };
        return { ok: true, teaser: res.teaser };
      });
    },
    [finishWithResult],
  );

  const runExample = useCallback(
    async (exampleId: SdbPreviewExampleId) => {
      setFileLabel(null);
      const config = await loadSdbPreviewConfig();
      await finishWithResult(async () => {
        const res = await runExamplePreview(exampleId, {
          apiBaseUrl: config.apiBaseUrl,
          useMock: Boolean(config.useMock),
        });
        if (!res.ok) return { ok: false, error: res.error };
        return { ok: true, teaser: res.teaser };
      });
    },
    [finishWithResult],
  );

  const reset = useCallback(() => {
    abortRef.current = true;
    setPhase('idle');
    setTeaser(null);
    setError(null);
    setFileLabel(null);
    setProcessingStepIndex(0);
  }, []);

  return {
    phase,
    processingStepIndex,
    processingLabel: PROCESSING_STEP_LABELS[processingStepIndex] ?? PROCESSING_STEP_LABELS[0],
    teaser,
    error,
    fileLabel,
    uploadFile,
    runExample,
    reset,
  };
}
