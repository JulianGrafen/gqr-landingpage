'use client';

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react';

type SdbUploadSurface = {
  openFilePicker: () => void;
  scrollToDropzone: () => void;
};

type BetriebsanweisungSdbUploadContextValue = {
  registerSdbUploadSurface: (surface: SdbUploadSurface | null) => void;
  requestSdbUploadFromOverlay: () => void;
  scrollToDropzone: () => void;
};

const BetriebsanweisungSdbUploadContext = createContext<BetriebsanweisungSdbUploadContextValue | null>(
  null,
);

export function BetriebsanweisungSdbUploadProvider({ children }: { children: ReactNode }) {
  const surfaceRef = useRef<SdbUploadSurface | null>(null);

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

  const value = useMemo(
    () => ({ registerSdbUploadSurface, requestSdbUploadFromOverlay, scrollToDropzone }),
    [registerSdbUploadSurface, requestSdbUploadFromOverlay, scrollToDropzone],
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
