import { Fragment } from 'react';
import { HOME_HERO } from '@/config/home-sections/hero';

type CtaTrustLineProps = {
  /** Zusätzliche Klassen für Ausrichtung im jeweiligen CTA-Kontext. */
  className?: string;
};

/** Einzige Trust-Leiste der Startseite, direkt unter der SDB-Dropzone (keine Wiederholung). */
export function CtaTrustLine({ className = '' }: CtaTrustLineProps) {
  return (
    <p className={`text-xs leading-relaxed text-[#8fa4c0] ${className}`.trim()}>
      {HOME_HERO.trustSignals.map((signal, index) => (
        <Fragment key={signal}>
          {index > 0 ? ' · ' : null}
          <span className="whitespace-nowrap">
            <span className="text-teal-300" aria-hidden="true">
              ✓
            </span>{' '}
            {signal}
          </span>
        </Fragment>
      ))}
    </p>
  );
}
