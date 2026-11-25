'use client';

import { useEffect } from 'react';
import { ERROR_BOUNDARY_COPY } from '@/config/error-boundary-copy';
import { reloadOnceForChunkError } from '@/lib/errors/chunk-load-recovery';
import { resolveMarketingHomeHref } from '@/config/site-seo';

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Letztes Sicherheitsnetz für alle Next-Routen (BA-, Lösungs-, Wissensseiten).
 * Ersetzt Nexts generische Meldung „Application error: a client-side exception has occurred“.
 */
export default function RouteErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    if (reloadOnceForChunkError(error)) return;
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-[#f0f6ff] sm:text-3xl">{ERROR_BOUNDARY_COPY.headline}</h1>
      <p className="mt-3 max-w-md text-[#8fa4c0]">{ERROR_BOUNDARY_COPY.body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="gqr-cta-primary gqr-cta-primary--md" onClick={reset}>
          {ERROR_BOUNDARY_COPY.retryLabel}
        </button>
        <a
          href={resolveMarketingHomeHref()}
          className="inline-flex rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-[#f0f6ff] no-underline hover:bg-white/[0.06]"
        >
          {ERROR_BOUNDARY_COPY.homeLabel}
        </a>
      </div>
    </main>
  );
}
