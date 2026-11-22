'use client';

import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { buildRoiViewModel } from '@/lib/roi-calculator/buildRoiViewModel';
import {
  ROI_CLIENT_SLIDER,
  ROI_SUBSTANCE_SLIDER,
  type RoiCalculatorMode,
} from '@/lib/roi-calculator/computeTimeSavings';
import { ROI_COPY } from '@/lib/roi-calculator/roi-copy';

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
        <span className="min-w-[3ch] text-right tabular-nums text-2xl font-extrabold text-blue-600" aria-live="polite">
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
        <span className="tabular-nums">{min}</span>
        <span className="tabular-nums">{max}</span>
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
  const [kmuSubstances, setKmuSubstances] = useState<number>(ROI_SUBSTANCE_SLIDER.kmuDefault);
  const [sifaSubstances, setSifaSubstances] = useState<number>(ROI_SUBSTANCE_SLIDER.sifaDefault);
  const [clientCount, setClientCount] = useState<number>(ROI_CLIENT_SLIDER.default);

  const substancesPerScope = mode === 'sifa' ? sifaSubstances : kmuSubstances;

  const view = useMemo(
    () =>
      buildRoiViewModel({
        mode,
        substancesPerScope,
        clientCount,
      }),
    [mode, substancesPerScope, clientCount],
  );

  return (
    <aside
      className={['rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7', className].join(' ')}
      aria-label="ROI-Rechner: Zeitersparnis berechnen"
    >
      <header className="mb-5">
        <h2 className="text-base font-bold text-slate-900">{ROI_COPY.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{ROI_COPY.subtitle}</p>
      </header>

      <p id={modeLabelId} className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Zielgruppe
      </p>
      <ModeSegmentedControl mode={mode} onChange={setMode} groupLabelId={modeLabelId} />

      <div className="mt-6">
        <RangeSliderField
          fieldId={`${baseId}-substances`}
          label={mode === 'kmu' ? ROI_COPY.kmuSubstanceLabel : ROI_COPY.sifaSubstanceLabel}
          min={ROI_SUBSTANCE_SLIDER.min}
          max={ROI_SUBSTANCE_SLIDER.max}
          step={ROI_SUBSTANCE_SLIDER.step}
          value={substancesPerScope}
          onChange={mode === 'sifa' ? setSifaSubstances : setKmuSubstances}
        />

        {mode === 'sifa' ? (
          <RangeSliderField
            fieldId={`${baseId}-clients`}
            label={ROI_COPY.clientLabel}
            min={ROI_CLIENT_SLIDER.min}
            max={ROI_CLIENT_SLIDER.max}
            step={ROI_CLIENT_SLIDER.step}
            value={clientCount}
            onChange={setClientCount}
          />
        ) : null}

        <p className="mt-1 text-xs text-slate-400">
          <span className="tabular-nums">{view.totalSubstancesText}</span>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-xs font-semibold text-[#ff6b35]">{ROI_COPY.excelLabel}</p>
          <p className="mt-2 text-2xl font-black leading-none text-[#ff9a5c]">
            <span className="inline-block min-w-[4.5ch] tabular-nums">{view.traditional.value}</span>
            <span className="ml-1 text-sm font-medium">{view.traditional.unit}</span>
          </p>
        </div>
        <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3">
          <p className="text-xs font-semibold text-teal-600">{ROI_COPY.digitalLabel}</p>
          <p className="mt-2 text-2xl font-black leading-none text-teal-600">
            <span className="inline-block min-w-[4.5ch] tabular-nums">{view.digital.value}</span>
            <span className="ml-1 text-sm font-medium">{view.digital.unit}</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50 px-5 py-4">
        <p className="text-sm font-bold text-slate-800">{ROI_COPY.savedTimeLabel}</p>
        <p className="text-3xl font-black leading-none text-teal-600">
          <span className="inline-block min-w-[4.5ch] tabular-nums">{view.saved.value}</span>
          <span className="ml-1 text-xl font-bold">{view.saved.unit}</span>
        </p>
      </div>

      <div className="mt-3 rounded-xl border border-orange-200/80 bg-orange-50 px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{view.costLabel}</p>
        <p className="mt-1 text-2xl font-black leading-snug text-[#ff6b35]">
          <span className="tabular-nums">{view.costEurFormatted}</span>
          <span className="ml-1 text-sm font-semibold text-slate-500">{view.costHint}</span>
        </p>
        {view.roiLine ? (
          <p className="mt-2 text-sm font-semibold leading-snug text-slate-700">
            <span className="tabular-nums">{view.roiLine}</span>
          </p>
        ) : null}
      </div>

      <a
        href={registerHref}
        className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#ff6b35] px-5 py-3.5 text-center text-sm font-extrabold text-white shadow-lg shadow-orange-300/50 transition hover:bg-[#ff8555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2"
      >
        {ROI_COPY.ctaPrefix} <span className="tabular-nums">&nbsp;{view.savedHoursLabel}&nbsp;</span> {ROI_COPY.ctaSuffix}
      </a>
      <p className="mt-2 text-center text-xs leading-relaxed text-slate-500">{ROI_COPY.microcopy}</p>
      <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">{ROI_COPY.assumption}</p>
    </aside>
  );
}
