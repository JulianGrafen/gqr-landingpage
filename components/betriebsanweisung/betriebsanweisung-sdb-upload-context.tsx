'use client';

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react';
import type { SubstanceClusterId } from '@/config/betriebsanweisung/substance-clusters';
import { loadDemoPreviewTeaser } from '@/lib/betriebsanweisung/load-demo-preview-teaser';
import { buildBetriebsanweisungPath } from '@/lib/betriebsanweisung/build-register-url';
import { handOffPreviewTokenToRegistration } from '@/lib/sdb-preview/preview-handoff';
import { hasTransferablePreviewToken, useSdbPreview, type SdbPreviewController } from '@/lib/sdb-preview/useSdbPreview';
import { useSdbUnlockHref } from '@/lib/sdb-preview/use-sdb-unlock-href';

type SdbUploadSurface = {
  openFilePicker: () => void;
  scrollToDropzone: () => void;
};

type BetriebsanweisungSdbUploadContextValue = {
  /**
   * Gemeinsamer Vorschau-State (State-Lifting): Die Dropzone rechts schreibt, die große
   * DIN-A4-Vorschau links und die Conversion-Card lesen.
   */
  preview: SdbPreviewController;
  registerSdbUploadSurface: (surface: SdbUploadSurface | null) => void;
  requestSdbUploadFromOverlay: () => void;
  openFilePicker: () => void;
  scrollToDropzone: () => void;
  /** 1-Klick-Demo mit Beispiel-SDB des aktuellen Slugs (kein Upload, kein API-Call). */
  startDemoExtraction: () => void;
  /** Register-Link für Freischalt-CTAs; enthält bei echten Uploads den `previewToken`. */
  unlockHref: string;
  /** onClick der Freischalt-CTAs: legt den Token zusätzlich als Fallback (Cookie/Storage) ab. */
  handOffToRegistration: () => void;
};

const BetriebsanweisungSdbUploadContext = createContext<BetriebsanweisungSdbUploadContextValue | null>(
  null,
);

type ProviderProps = {
  children: ReactNode;
  slug: string;
  cluster: SubstanceClusterId;
  /** Register-Link ohne Token (Demo / vor dem Upload). */
  fallbackRegisterUrl: string;
};

export function BetriebsanweisungSdbUploadProvider({ children, slug, cluster, fallbackRegisterUrl }: ProviderProps) {
  const surfaceRef = useRef<SdbUploadSurface | null>(null);
  const preview = useSdbPreview();
  const { runDemo, teaser, source } = preview;

  const transferableToken = teaser && hasTransferablePreviewToken(source) ? teaser.previewToken : null;
  const unlockHref = useSdbUnlockHref({
    previewToken: transferableToken,
    fallbackHref: fallbackRegisterUrl,
    returnTo: buildBetriebsanweisungPath(slug),
    utmSource: 'landing',
    utmMedium: 'betriebsanweisung',
    utmCampaign: slug,
    utmContent: 'sdb-live-vorschau',
  });

  const registerSdbUploadSurface = useCallback((surface: SdbUploadSurface | null) => {
    surfaceRef.current = surface;
  }, []);

  const scrollToDropzone = useCallback(() => {
    surfaceRef.current?.scrollToDropzone();
  }, []);

  const openFilePicker = useCallback(() => {
    surfaceRef.current?.openFilePicker();
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

  const startDemoExtraction = useCallback(() => {
    void runDemo(() => loadDemoPreviewTeaser(slug, cluster));
  }, [runDemo, slug, cluster]);

  const handOffToRegistration = useCallback(() => {
    if (transferableToken) handOffPreviewTokenToRegistration(transferableToken);
  }, [transferableToken]);

  const value = useMemo(
    () => ({
      preview,
      registerSdbUploadSurface,
      requestSdbUploadFromOverlay,
      openFilePicker,
      scrollToDropzone,
      startDemoExtraction,
      unlockHref,
      handOffToRegistration,
    }),
    [
      preview,
      registerSdbUploadSurface,
      requestSdbUploadFromOverlay,
      openFilePicker,
      scrollToDropzone,
      startDemoExtraction,
      unlockHref,
      handOffToRegistration,
    ],
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
