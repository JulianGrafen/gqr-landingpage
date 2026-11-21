'use client';

import { useRef, type ReactNode } from 'react';
import { useBaPreviewTilt } from '@/hooks/use-ba-preview-tilt';

type Props = {
  children: ReactNode;
  className?: string;
};

/** Muster-BA-PDF mit 3D-Neigung (Startseite #ergebnis & pSEO-Slugs). */
export function BaPdfPreviewTilt({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useBaPreviewTilt(ref);

  return (
    <div ref={ref} className={`ba-preview-tilt ${className}`.trim()} data-ba-tilt="">
      <div className="ba-preview-tilt__perspective">
        <div className="ba-preview-tilt__inner">{children}</div>
      </div>
    </div>
  );
}