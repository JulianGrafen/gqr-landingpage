import { CTA_TRUST_SIGNALS } from '@/config/aeo-config';

type CtaTrustLineProps = {
  /** Zusätzliche Klassen für Ausrichtung im jeweiligen CTA-Kontext. */
  className?: string;
};

/** Dezente Trust-Microcopy unter primären CTAs (Serverstandort, Export, Rechnungskauf). */
export function CtaTrustLine({ className = '' }: CtaTrustLineProps) {
  return (
    <p className={`text-xs leading-relaxed text-[#8fa4c0] ${className}`.trim()}>
      {CTA_TRUST_SIGNALS.map((signal, index) => (
        <span key={signal} className="whitespace-nowrap">
          {index > 0 ? ' · ' : null}
          <span className="text-teal-300" aria-hidden="true">
            ✓
          </span>{' '}
          {signal}
        </span>
      ))}
    </p>
  );
}
