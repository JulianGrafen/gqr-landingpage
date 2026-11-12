import type { ReactNode } from 'react';

type BaPreviewTiltFrameProps = {
  children: ReactNode;
  className?: string;
};

/** Nur 3D-Neigung per `scripts/output-preview-ba-tilt.js` — kein Foil/Glare. */
export function BaPreviewTiltFrame({ children, className = '' }: BaPreviewTiltFrameProps) {
  return (
    <div className={`ba-preview-tilt ${className}`.trim()} data-ba-tilt="">
      <div className="ba-preview-tilt__perspective">
        <div className="ba-preview-tilt__inner">{children}</div>
      </div>
    </div>
  );
}
