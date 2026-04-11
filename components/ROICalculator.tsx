"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  Clock,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN CONSTANTS — single source of truth, no magic numbers
// ─────────────────────────────────────────────────────────────────────────────

const SLIDER_MIN = 5;
const SLIDER_MAX = 100;
const DEFAULT_SUBSTANCE_COUNT = 20;
const DEFAULT_NEW_SUBSTANCES_PER_YEAR = 3;

const SETUP_MINUTES_MANUAL  = 15; // SDB suchen, abtippen, prüfen
const SETUP_MINUTES_DIGITAL = 1;  // KI-Scan & Verifikation

const REVISION_MINUTES_MANUAL  = 5; // SDB-Aktualität prüfen (§ 6 GefStoffV)
const REVISION_MINUTES_DIGITAL = 1; // Automatischer Abgleich

const EMERGENCY_SEARCH_MINUTES_MANUAL  = 5;           // Ordner suchen, blättern
const EMERGENCY_SEARCH_MINUTES_DIGITAL = 10 / 60;     // QR-Scan: 10 Sekunden

const EMERGENCY_SEARCHES_PER_YEAR = 12; // konservative Schätzung: einmal pro Monat

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface TimeBlock {
  manualMinutes: number;
  digitalMinutes: number;
  savedMinutes: number;
  savedHours: number;
}

interface ROIResult {
  setup: TimeBlock;
  annual: TimeBlock;
}

// ─────────────────────────────────────────────────────────────────────────────
// PURE BUSINESS LOGIC — completely isolated from UI
// ─────────────────────────────────────────────────────────────────────────────

function toTimeBlock(manualMinutes: number, digitalMinutes: number): TimeBlock {
  const savedMinutes = manualMinutes - digitalMinutes;
  return {
    manualMinutes,
    digitalMinutes,
    savedMinutes,
    savedHours: parseFloat((savedMinutes / 60).toFixed(1)),
  };
}

export function calculateROI(
  substanceCount: number,
  newSubstancesPerYear: number,
): ROIResult {
  const setupManual  = substanceCount * SETUP_MINUTES_MANUAL;
  const setupDigital = substanceCount * SETUP_MINUTES_DIGITAL;

  const revisionManual  = substanceCount * REVISION_MINUTES_MANUAL
                          + newSubstancesPerYear * SETUP_MINUTES_MANUAL;
  const revisionDigital = substanceCount * REVISION_MINUTES_DIGITAL
                          + newSubstancesPerYear * SETUP_MINUTES_DIGITAL;

  const emergencyManual  = EMERGENCY_SEARCHES_PER_YEAR * EMERGENCY_SEARCH_MINUTES_MANUAL;
  const emergencyDigital = EMERGENCY_SEARCHES_PER_YEAR * EMERGENCY_SEARCH_MINUTES_DIGITAL;

  const annualManual  = revisionManual  + emergencyManual;
  const annualDigital = revisionDigital + emergencyDigital;

  return {
    setup:  toTimeBlock(setupManual,  setupDigital),
    annual: toTimeBlock(annualManual, annualDigital),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function LiabilityBadge({ isDigital }: { isDigital: boolean }) {
  if (isDigital) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        <ShieldCheck className="h-3.5 w-3.5" />
        Rechtssicher nach §&nbsp;6 GefStoffV
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
      <AlertTriangle className="h-3.5 w-3.5" />
      Haftungsrisiko: Hoch
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface TimeRowProps {
  label: string;
  icon: React.ReactNode;
  manualMinutes: number;
  digitalMinutes: number;
}

function TimeComparisonRow({ label, icon, manualMinutes, digitalMinutes }: TimeRowProps) {
  const manualDisplay  = manualMinutes >= 60
    ? `${(manualMinutes / 60).toFixed(1)} h`
    : `${Math.round(manualMinutes)} min`;

  const digitalDisplay = digitalMinutes < 1
    ? `${Math.round(digitalMinutes * 60)} s`
    : digitalMinutes >= 60
      ? `${(digitalMinutes / 60).toFixed(1)} h`
      : `${Math.round(digitalMinutes)} min`;

  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-2 text-slate-600 font-medium min-w-0">
        <span className="shrink-0 text-slate-400">{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="tabular-nums font-semibold text-red-500 w-16 text-right">
          {manualDisplay}
        </span>
        <span className="text-slate-300">→</span>
        <span className="tabular-nums font-semibold text-emerald-600 w-16 text-right">
          {digitalDisplay}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface SavingsCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  savedHours: number;
  rows: TimeRowProps[];
}

function SavingsCard({ icon, title, subtitle, savedHours, rows }: SavingsCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">{title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="tabular-nums text-2xl font-extrabold leading-none text-blue-600">
              {savedHours}
              <span className="ml-1 text-sm font-semibold">h gespart</span>
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="px-6 py-2">
        <div className="flex justify-end gap-3 pb-1 pt-2 text-xs font-semibold text-slate-400">
          <span className="w-16 text-right text-red-400">Manuell</span>
          <span className="w-4" />
          <span className="w-16 text-right text-emerald-500">Digital</span>
        </div>
        {rows.map((row) => (
          <TimeComparisonRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface SubstanceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

function SubstanceSlider({ value, onChange }: SubstanceSliderProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="substance-count" className="text-sm font-semibold text-slate-700">
          Anzahl Gefahrstoffe im Betrieb
        </label>
        <span className="tabular-nums text-xl font-extrabold text-blue-600">{value}</span>
      </div>
      <input
        id="substance-count"
        type="range"
        min={SLIDER_MIN}
        max={SLIDER_MAX}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
        aria-label="Anzahl der Gefahrstoffe auswählen"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{SLIDER_MIN}</span>
        <span>{SLIDER_MAX}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface NewSubstancesInputProps {
  value: number;
  onChange: (value: number) => void;
}

function NewSubstancesInput({ value, onChange }: NewSubstancesInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      onChange(parsed);
    }
  }

  return (
    <div>
      <label htmlFor="new-substances" className="mb-2 block text-sm font-semibold text-slate-700">
        Neue Stoffe pro Jahr
      </label>
      <input
        id="new-substances"
        type="number"
        min={0}
        max={50}
        value={value}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-right text-lg font-bold text-blue-600 tabular-nums shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        aria-label="Anzahl neuer Gefahrstoffe pro Jahr"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ROICalculator() {
  const [substanceCount, setSubstanceCount] = useState(DEFAULT_SUBSTANCE_COUNT);
  const [newSubstancesPerYear, setNewSubstancesPerYear] = useState(
    DEFAULT_NEW_SUBSTANCES_PER_YEAR,
  );

  const roi = calculateROI(substanceCount, newSubstancesPerYear);

  const setupRows: TimeRowProps[] = [
    {
      label: `${substanceCount} Stoffe anlegen`,
      icon: <Zap className="h-4 w-4" />,
      manualMinutes: roi.setup.manualMinutes,
      digitalMinutes: roi.setup.digitalMinutes,
    },
  ];

  const annualRows: TimeRowProps[] = [
    {
      label: `Jahresrevision (${substanceCount} Stoffe)`,
      icon: <Calendar className="h-4 w-4" />,
      manualMinutes: substanceCount * REVISION_MINUTES_MANUAL,
      digitalMinutes: substanceCount * REVISION_MINUTES_DIGITAL,
    },
    {
      label: `${newSubstancesPerYear} neue Stoffe aufnehmen`,
      icon: <Zap className="h-4 w-4" />,
      manualMinutes: newSubstancesPerYear * SETUP_MINUTES_MANUAL,
      digitalMinutes: newSubstancesPerYear * SETUP_MINUTES_DIGITAL,
    },
    {
      label: `Notfall-Suche (${EMERGENCY_SEARCHES_PER_YEAR}× / Jahr)`,
      icon: <Search className="h-4 w-4" />,
      manualMinutes: EMERGENCY_SEARCHES_PER_YEAR * EMERGENCY_SEARCH_MINUTES_MANUAL,
      digitalMinutes: EMERGENCY_SEARCHES_PER_YEAR * EMERGENCY_SEARCH_MINUTES_DIGITAL,
    },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Was kostet Sie der Papierkram wirklich?
        </h2>
        <p className="mt-3 text-slate-500">
          Stellen Sie Ihren Betrieb ein — die Rechnung erfolgt automatisch.
        </p>
      </div>

      {/* Inputs */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SubstanceSlider value={substanceCount} onChange={setSubstanceCount} />
          <NewSubstancesInput
            value={newSubstancesPerYear}
            onChange={setNewSubstancesPerYear}
          />
        </div>
      </div>

      {/* Liability Badges */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <LiabilityBadge isDigital={false} />
        <span className="text-sm font-bold text-slate-400">vs.</span>
        <LiabilityBadge isDigital={true} />
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SavingsCard
          icon={<Clock className="h-5 w-5" />}
          title="Einmaliger Zeitgewinn beim Start"
          subtitle="Bestandsaufnahme & Digitalisierung"
          savedHours={roi.setup.savedHours}
          rows={setupRows}
        />
        <SavingsCard
          icon={<Calendar className="h-5 w-5" />}
          title="Jährlicher Zeitgewinn"
          subtitle="Revision + neue Stoffe + Notfallsuche"
          savedHours={roi.annual.savedHours}
          rows={annualRows}
        />
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        Konservative Schätzung · Basiert auf Praxiswerten von Betrieben mit 5–100 Gefahrstoffen
      </p>
    </section>
  );
}
