'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { bootstrapInternalTrafficFlag } from '@/lib/analytics/internal-traffic';
import { trackLandingViewOnce } from '@/lib/analytics/funnel';

/** Sendet `landing_view` für jede Next-Route (einmal pro Pfad). Rendert nichts. */
export function FunnelLandingViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    bootstrapInternalTrafficFlag();
    trackLandingViewOnce();
  }, [pathname]);

  return null;
}
