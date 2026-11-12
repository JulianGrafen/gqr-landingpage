'use client';

import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  computeTimeSavings,
  formatEuroWholeAmount,
  formatGermanDecimal,
  ROI_CLIENT_SLIDER,
  ROI_SUBSTANCE_SLIDER,
  type RoiCalculatorMode,
} from '@/lib/roi-calculator/computeTimeSavings';

const DEFAULT_REGISTER_HREF = 'https://app.gefahrstoff-qr.de/register';

const MODE_OPTIONS: ReadonlyArray<{ value: RoiCalculatorMode; label: string }> = [
  { value: 'kmu', label: 'Betrieb / KMU' },
  { value: 'sifa', label: 'Externe SiFa' },
];

export interface ROICalculatorProps {
  className?: string;
  registerHref?: string;
}

interface RangeSliderFieldProps {
  fieldId: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

function RangeSliderField({
  fieldId,
  label,
  min,
  max,
  step,
  value,
  onChange,
}: RangeSliderFieldProps) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={fieldId} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
        <span
          className="tabular-nums text-2xl font-extrabold text-blue-600"
          aria-live="polite"
        >
          {value}
        </span>
      </div>
      <input
        id={fieldId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

interface ModeSegmentedControlProps {
  mode: RoiCalculatorMode;
  onChange: (mode: RoiCalculatorMode) => void;
  groupLabelId: string;
}

function ModeSegmentedControl({ mode, onChange, groupLabelId }: ModeSegmentedControlProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ width: 0, x: 4 });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const active = root.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    if (!active) return;
    const rootRect = root.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setThumb({
      width: activeRect.width,
      x: activeRect.left - rootRect.left,
    });
  }, [mode]);

  return (
    <div
      ref={rootRef}
      className="relative grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1"
      role="tablist"
      aria-labelledby={groupLabelId}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 rounded-lg bg-white shadow-sm transition-[transform,width] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none"
        style={{ width: thumb.width, transform: `translate3d(${thumb.x}px, 0, 0)` }}
      />
      {MODE_OPTIONS.map((option) => {
        const isActive = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[
              'relative z-[1] rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm',
              isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-800',
            ].join(' ')}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ROICalculator({
  className = '',
  registerHref = DEFAULT_REGISTER_HREF,
}: ROICalculatorProps) {
  const baseId = useId();
  const modeLabelId = `${baseId}-mode-label`;

  const [mode, setMode] = useState<RoiCalculatorMode>('kmu');
  const [substancesPerScope, setSubstancesPerScope] = useState<number>(
    ROI_SUBSTANCE_SLIDER.default,
  );
  const [clientCount, setClientCount] = useState<number>(ROI_CLIENT_SLIDER.default);

  const result = useMemo(
    () =>
      computeTimeSavings({
        mode,
        substancesPerScope,
        clientCount,
      }),
    [mode, substancesPerScope, clientCount],
  );

  const savedHoursLabel = formatGermanDecimal(result.savedHours);

  return (
    <aside
      className={[
        'rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7',
        className,
      ].join(' ')}
      aria-label="ROI-Rechner: Zeitersparnis berechnen"
    >
      <header className="mb-5">
        <h2 className="text-base font-bold text-slate-900">ROI-Rechner</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          Wie viel Arbeitszeit verbrennen Sie mit Copy &amp; Paste?
        </p>
      </header>

      <p id={modeLabelId} className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Zielgruppe
      </p>
      <ModeSegmentedControl mode={mode} onChange={setMode} groupLabelId={modeLabelId} />

      <div className="mt-6">
        <RangeSliderField
          fieldId={`${baseId}-substances`}
          label={
            mode === 'kmu'
              ? 'Gefahrstoffe im Betrieb'
              : 'Ø Gefahrstoffe pro Mandant'
          }
          min={ROI_SUBSTANCE_SLIDER.min}
          max={ROI_SUBSTANCE_SLIDER.max}
          step={ROI_SUBSTANCE_SLIDER.step}
          value={substancesPerScope}
          onChange={setSubstancesPerScope}
        />

        {mode === 'sifa' ? (
          <RangeSliderField
            fieldId={`${baseId}-clients`}
            label="Anzahl der Mandanten"
            min={ROI_CLIENT_SLIDER.min}
            max={ROI_CLIENT_SLIDER.max}
            step={ROI_CLIENT_SLIDER.step}
            value={clientCount}
            onChange={setClientCount}
          />
        ) : null}
      </div>

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
        <p className="text-sm font-semibold text-slate-700">
          Gesparte Schreibtischzeit:{' '}
          <span className="tabular-nums text-2xl font-extrabold text-blue-600">
            {savedHoursLabel} Stunden
          </span>
        </p>
        {mode === 'sifa' && result.honorPotentialEur !== null ? (
          <p className="mt-2 text-sm text-slate-600">
            Blockiertes Honorarpotenzial:{' '}
            <span className="font-bold text-slate-900">
              {formatEuroWholeAmount(result.honorPotentialEur)}
            </span>
            <span className="text-slate-500"> (bei 100&nbsp;€/h)</span>
          </p>
        ) : null}
      </div>

      <a
        href={registerHref}
        className="mt-5 flex w-full items-center justify-center rounded-xl border border-transparent bg-[#ff6b35] px-5 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-orange-200/60 transition hover:bg-[#ff8555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2"
      >
        Diese {savedHoursLabel} Stunden zurückholen
      </a>

      <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
        Annahme: rund 20 Minuten manuelles Abtippen pro Sicherheitsdatenblatt.
      </p>
    </aside>
  );
}
