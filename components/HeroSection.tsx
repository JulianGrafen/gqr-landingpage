"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ChevronRight,
  Clock,
  Play,
  ShieldCheck,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN CONSTANTS — single source of truth for business rules
// ─────────────────────────────────────────────────────────────────────────────

const SLIDER_MIN = 5;
const SLIDER_MAX = 100;
const SLIDER_DEFAULT = 20;
const MINUTES_PER_SUBSTANCE_TRADITIONAL = 10;
const SECONDS_PER_SUBSTANCE_DIGITAL = 30;

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface TimeComparison {
  traditionalHours: number;
  digitalMinutes: number;
  savedHours: number;
}

type ColorAccent = "red" | "emerald";

// ─────────────────────────────────────────────────────────────────────────────
// PURE BUSINESS LOGIC
// ─────────────────────────────────────────────────────────────────────────────

function calculateTimeComparison(substanceCount: number): TimeComparison {
  const traditionalMinutes = substanceCount * MINUTES_PER_SUBSTANCE_TRADITIONAL;
  const digitalRawMinutes =
    (substanceCount * SECONDS_PER_SUBSTANCE_DIGITAL) / 60;
  const savedMinutes = traditionalMinutes - digitalRawMinutes;

  return {
    traditionalHours: parseFloat((traditionalMinutes / 60).toFixed(1)),
    digitalMinutes: Math.ceil(digitalRawMinutes),
    savedHours: parseFloat((savedMinutes / 60).toFixed(1)),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface TimeMetricCardProps {
  label: string;
  value: string;
  unit: string;
  accent: ColorAccent;
  icon: React.ReactNode;
}

const accentStyles: Record<ColorAccent, { text: string; bg: string; border: string }> = {
  red: {
    text: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  emerald: {
    text: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
};

function TimeMetricCard({ label, value, unit, accent, icon }: TimeMetricCardProps) {
  const { text, bg, border } = accentStyles[accent];

  return (
    <div className={`rounded-xl border p-4 ${bg} ${border}`}>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        {icon}
        {label}
      </div>
      <p className={`text-2xl font-extrabold leading-none ${text}`}>
        {value}
        <span className="ml-1 text-sm font-medium">{unit}</span>
      </p>
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
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <label
          htmlFor="substance-count"
          className="text-sm font-semibold text-slate-700"
        >
          Anzahl Gefahrstoffe im Betrieb
        </label>
        <span className="tabular-nums text-2xl font-extrabold text-blue-600">
          {value}
        </span>
      </div>
      <input
        id="substance-count"
        type="range"
        min={SLIDER_MIN}
        max={SLIDER_MAX}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
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

interface RoiCalculatorCardProps {
  substanceCount: number;
  onSubstanceCountChange: (count: number) => void;
}

function RoiCalculatorCard({
  substanceCount,
  onSubstanceCountChange,
}: RoiCalculatorCardProps) {
  const { traditionalHours, digitalMinutes, savedHours } =
    calculateTimeComparison(substanceCount);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
      <h2 className="mb-6 text-base font-bold text-slate-800">
        ROI-Rechner: Wie viel Zeit sparen Sie?
      </h2>

      <SubstanceSlider value={substanceCount} onChange={onSubstanceCountChange} />

      <div className="mb-6 grid grid-cols-2 gap-3">
        <TimeMetricCard
          label="Herkömmlich (Excel/Papier)"
          value={String(traditionalHours)}
          unit="Stunden"
          accent="red"
          icon={<AlertTriangle className="h-3.5 w-3.5 text-red-400" />}
        />
        <TimeMetricCard
          label="Gefahrstoff-QR (KI-Scan)"
          value={String(digitalMinutes)}
          unit="Minuten"
          accent="emerald"
          icon={<ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />}
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-semibold text-slate-700">
            Gesparte Zeit
          </span>
        </div>
        <p className="tabular-nums text-3xl font-extrabold text-blue-600">
          {savedHours}
          <span className="ml-1 text-base font-semibold">h</span>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary";

interface CtaButtonProps {
  variant: ButtonVariant;
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
}

const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
};

function CtaButton({ variant, icon, href, children }: CtaButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

  return (
    <a href={href} className={`${baseStyles} ${buttonVariantStyles[variant]}`}>
      {children}
      {icon}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION — ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [substanceCount, setSubstanceCount] = useState(SLIDER_DEFAULT);

  return (
    <section className="flex min-h-screen items-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left Column: Copy & CTA ─────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Rechtssicher nach § 6 GefStoffV
              </span>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Digitales Gefahrstoff&shy;verzeichnis,{" "}
                <span className="text-blue-600">in 30 Sekunden.</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                Rechtssicher nach §&nbsp;6 GefStoffV. Für Maler, Werkstätten
                und den Mittelstand. Komplett digital&nbsp;—&nbsp;kein Papier,
                kein Haftungsrisiko.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaButton
                variant="primary"
                href="/pricing"
                icon={<ChevronRight className="h-4 w-4" />}
              >
                Kostenlos testen
              </CtaButton>
              <CtaButton
                variant="secondary"
                href="#demo"
                icon={<Play className="h-4 w-4" />}
              >
                Wie es funktioniert
              </CtaButton>
            </div>
          </div>

          {/* ── Right Column: ROI Calculator ────────────────────────── */}
          <RoiCalculatorCard
            substanceCount={substanceCount}
            onSubstanceCountChange={setSubstanceCount}
          />

        </div>
      </div>
    </section>
  );
}
