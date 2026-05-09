'use client';

import { useId, useMemo, useState } from 'react';

const MIN_SDB = 10;
const MAX_SDB = 400;
const DEFAULT_SDB = 100;
/** Minuten pro SDB bei manueller Übertragung (konservativer Richtwert) */
const MINUTES_MANUAL_PER_SDB = 20;
/** Minuten gesamt bei automatisierter Extraktion, skaliert linear ab Referenz 100 → 15 Min */
const AUTO_MINUTES_AT_100 = 15;

function formatHoursDe(totalHours: number): string {
  const h = Math.floor(totalHours);
  const m = Math.round((totalHours - h) * 60);
  if (h === 0) return `${m} Min.`;
  if (m === 0) return `${h} Std.`;
  return `${h} Std. ${m} Min.`;
}

function formatMinutesDe(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} Min.`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m === 0 ? `${h} Std.` : `${h} Std. ${m} Min.`;
}

/**
 * Einfache Nutzer-Rechnung: manuell vs. automatisiert (illustrativ).
 */
export function RoiEstimator() {
  const id = useId();
  const [count, setCount] = useState(DEFAULT_SDB);

  const { manualHours, autoMinutes, manualPct, autoPct } = useMemo(() => {
    const manualMin = count * MINUTES_MANUAL_PER_SDB;
    const autoMin = (count / DEFAULT_SDB) * AUTO_MINUTES_AT_100;
    const manual = manualMin / 60;
    const maxMin = Math.max(manualMin, autoMin, 1);
    return {
      manualHours: manual,
      autoMinutes: autoMin,
      manualPct: (manualMin / maxMin) * 100,
      autoPct: (autoMin / maxMin) * 100,
    };
  }, [count]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#162340]/90 p-6 shadow-lg backdrop-blur-sm sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">
        Prozessvergleich
      </p>
      <h3 className="mt-2 text-xl font-bold text-[#f0f6ff] sm:text-2xl">
        Aufwand bei der Datenübernahme aus Sicherheitsdatenblättern
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#8fa4c0]">
        Schieben Sie den Regler, um eine typische Stückzahl abzubilden. Die
        Werte sind ein Plausibilitäts-Check auf Basis üblicher
        Copy-&amp;-Paste-Zeiten — keine Garantie für Ihren Einzelfall.
      </p>

      <div className="mt-8">
        <label
          htmlFor={id}
          className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-[#f0f6ff]"
        >
          <span>Anzahl SDB im Kataster</span>
          <span className="tabular-nums text-[#2dd4bf]">{count}</span>
        </label>
        <input
          id={id}
          type="range"
          min={MIN_SDB}
          max={MAX_SDB}
          step={5}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#ff6b35]"
          aria-valuemin={MIN_SDB}
          aria-valuemax={MAX_SDB}
          aria-valuenow={count}
          aria-label="Anzahl der Sicherheitsdatenblätter"
        />
        <div className="mt-1 flex justify-between text-xs text-[#8fa4c0]">
          <span>{MIN_SDB}</span>
          <span>{MAX_SDB}</span>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[#8fa4c0]">
            Manuelle Pflege (Excel-Vorlage)
          </p>
          <p className="mt-1 text-2xl font-black tabular-nums text-[#f0f6ff] sm:text-3xl">
            {formatHoursDe(manualHours)}
          </p>
          <p className="mt-1 text-xs text-[#8fa4c0]">
            Annahme: ca. {MINUTES_MANUAL_PER_SDB} Min. pro SDB für Erfassung und
            Formatierung
          </p>
          <div
            className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"
            role="presentation"
          >
            <div
              className="h-full rounded-full bg-slate-400/80 transition-[width] duration-200"
              style={{ width: `${Math.max(6, manualPct)}%` }}
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#8fa4c0]">
            Strukturierte Extraktion + Prüfung
          </p>
          <p className="mt-1 text-2xl font-black tabular-nums text-[#2dd4bf] sm:text-3xl">
            {formatMinutesDe(autoMinutes)}
          </p>
          <p className="mt-1 text-xs text-[#8fa4c0]">
            Skalierung ab Referenz: 100 SDB ≈ {AUTO_MINUTES_AT_100} Min. für
            technischen Import; Freigabe durch Fachpersonal zusätzlich
          </p>
          <div
            className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"
            role="presentation"
          >
            <div
              className="h-full rounded-full bg-[#2dd4bf] transition-[width] duration-200"
              style={{ width: `${Math.max(6, autoPct)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
