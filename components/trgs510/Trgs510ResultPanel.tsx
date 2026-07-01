import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ShieldAlert, type LucideIcon } from 'lucide-react';
import type { Trgs510CheckResult, Trgs510Severity } from '@/lib/trgs510/types';

type Trgs510ResultPanelProps = {
  result: Trgs510CheckResult;
};

const RESULT_STYLES: Record<
  Trgs510Severity,
  {
    icon: LucideIcon;
    Betriebsanweisungdge: string;
    panel: string;
    title: string;
    accent: string;
  }
> = {
  green: {
    icon: CheckCircle2,
    Betriebsanweisungdge: 'bg-emerald-400/15 text-emerald-200 ring-emerald-300/25',
    panel: 'border-emerald-300/25 bg-emerald-400/10',
    title: 'text-emerald-100',
    accent: 'text-emerald-300',
  },
  yellow: {
    icon: AlertTriangle,
    Betriebsanweisungdge: 'bg-amber-300/15 text-amber-100 ring-amber-300/25',
    panel: 'border-amber-300/25 bg-amber-300/10',
    title: 'text-amber-100',
    accent: 'text-amber-300',
  },
  red: {
    icon: ShieldAlert,
    Betriebsanweisungdge: 'bg-red-400/15 text-red-100 ring-red-300/25',
    panel: 'border-red-300/25 bg-red-400/10',
    title: 'text-red-100',
    accent: 'text-red-300',
  },
};

export function Trgs510ResultPanel({ result }: Trgs510ResultPanelProps) {
  const style = RESULT_STYLES[result.severity];
  const Icon = style.icon;

  return (
    <section
      className={`rounded-3xl border p-5 shadow-2xl shadow-black/20 sm:p-7 ${style.panel}`}
      aria-live="polite"
      aria-labelledby="trgs510-result-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
          <Icon className={`h-6 w-6 ${style.accent}`} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${style.Betriebsanweisungdge}`}>
              Matrixcode {result.code}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8fa4c0]">
              {result.firstClass.label} × {result.secondClass.label}
            </span>
          </div>

          <h2 id="trgs510-result-title" className={`mt-4 text-2xl font-black ${style.title}`}>
            {result.label}
          </h2>
          <p className="mt-2 text-Betriebsanweisungse leading-relaxed text-[#c8d4e6]">
            {result.shortText}
          </p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-[#0a1628]/60 p-4">
            <h3 className="text-sm font-bold text-[#f0f6ff]">
              Regel aus der TRGS 510
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#8fa4c0]">
              {result.detail}
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#5eead4]">
              Quelle: {result.sourceReference}
            </p>
          </div>
        </div>
      </div>

      <aside className="mt-6 rounded-2xl border border-[#2dd4bf]/25 bg-gradient-to-br from-[#2dd4bf]/12 to-white/[0.03] p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-[#2dd4bf]">
          GQR automatisiert diesen Check
        </p>
        <h3 className="mt-2 text-lg font-black text-[#f0f6ff]">
          Du prüfst Lagerklassen noch manuell?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#8fa4c0]">
          Gefahrstoff-QR (GQR) übernimmt die TRGS-510-Prüfung für dein gesamtes
          Gefahrstoffverzeichnis automatisch und warnt dich bei Konflikten, bevor
          sie im Lager entstehen.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="https://app.gefahrstoff-qr.de/register"
            className="gqr-cta-primary gqr-cta-primary--md no-underline"
          >
            GQR kostenlos testen
          </Link>
          <Link
            href="/#produkt"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-bold text-[#f0f6ff] no-underline transition hover:border-white/35 hover:bg-white/[0.06]"
          >
            Zeig mir, wie das automatisch geht
          </Link>
        </div>
      </aside>
    </section>
  );
}
