'use client';

import { type ReactNode } from 'react';
import { BaPdfPreviewTilt } from '@/components/ui/BaPdfPreviewTilt';
import { BaSamplePdfEmbed } from '@/components/ui/BaSamplePdfEmbed';

type Props = {
  embedTitle: string;
  /** Wie #ergebnis auf der Startseite — auf pSEO-Slugs `true`. */
  blurred?: boolean;
  overlay?: ReactNode;
  tiltClassName?: string;
  embedClassName?: string;
};

/** Muster-BA: A4-PDF in Tilt-Rahmen (1:1 wie Landing `#ergebnis`). */
export function BaSamplePdfPreviewMedia({
  embedTitle,
  blurred = false,
  overlay,
  tiltClassName = 'output-preview-ba-tilt',
  embedClassName = 'output-preview-pdf-embed--spotlight',
}: Props) {
  const embedClass = [embedClassName, blurred ? 'output-preview-pdf-embed--blurred-full' : ''].filter(Boolean).join(' ');

  const embed = <BaSamplePdfEmbed embedClassName={embedClass} title={embedTitle} />;

  return (
    <div className="output-preview-ba-spotlight__media relative w-full">
      <BaPdfPreviewTilt className={tiltClassName}>
        {blurred ? <div className="pointer-events-none select-none">{embed}</div> : embed}
      </BaPdfPreviewTilt>
      {overlay}
    </div>
  );
}