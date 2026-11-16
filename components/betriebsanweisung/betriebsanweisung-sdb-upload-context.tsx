'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { SAMPLE_PREVIEW_COPY } from '@/config/betriebsanweisung/sample-preview';

type SdbUploadSurface = {
  openFilePicker: () => void;
  scrollToDropzone: () => void;
};

type BetriebsanweisungSdbUploadContextValue = {
  registerSdbUploadSurface: (surface: SdbUploadSurface | null) => void;
  requestSdbUploadFromOverlay: () => void;
  scrollToDropzone: () => void;
  /** Statische Muster-Vorschau ist sichtbar (kein API-Call, rein clientseitig). */
  isSamplePreviewActive: boolean;
  /** Blendet die Muster-Vorschau ein und scrollt zu ihr. */
  showSamplePreview: () => void;
};

const BetriebsanweisungSdbUploadContext = createContext<BetriebsanweisungSdbUploadContextValue | null>(
  null,
);

export function BetriebsanweisungSdbUploadProvider({ children }: { children: ReactNode }) {
  const surfaceRef = useRef<SdbUploadSurface | null>(null);
  const [isSamplePreviewActive, setIsSamplePreviewActive] = useState(false);

  const registerSdbUploadSurface = useCallback((surface: SdbUploadSurface | null) => {
    surfaceRef.current = surface;
  }, []);

  const scrollToDropzone = useCallback(() => {
    surfaceRef.current?.scrollToDropzone();
  }, []);

  const requestSdbUploadFromOverlay = useCallback(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const prefersDesktopPicker =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
    if (prefersDesktopPicker) {
      surface.openFilePicker();
    } else {
      surface.scrollToDropzone();
    }
  }, []);

  const showSamplePreview = useCallback(() => {
    setIsSamplePreviewActive(true);
    document
      .getElementById(SAMPLE_PREVIEW_COPY.anchorId)
      ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, []);

  const value = useMemo(
    () => ({
      registerSdbUploadSurface,
      requestSdbUploadFromOverlay,
      scrollToDropzone,
      isSamplePreviewActive,
      showSamplePreview,
    }),
    [registerSdbUploadSurface, requestSdbUploadFromOverlay, scrollToDropzone, isSamplePreviewActive, showSamplePreview],
  );

  return (
    <BetriebsanweisungSdbUploadContext.Provider value={value}>{children}</BetriebsanweisungSdbUploadContext.Provider>
  );
}

export function useBetriebsanweisungSdbUpload(): BetriebsanweisungSdbUploadContextValue {
  const ctx = useContext(BetriebsanweisungSdbUploadContext);
  if (!ctx) {
    throw new Error('useBetriebsanweisungSdbUpload must be used within BetriebsanweisungSdbUploadProvider');
  }
  return ctx;
}
