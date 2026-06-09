'use client';

import { useState, type FormEvent } from 'react';
import { VORLAGE_DOWNLOAD_FILE } from '@/config/vorlage-landing';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type VorlageDownloadFormProps = {
  className?: string;
  /** `dark` für Hero auf Navy-Grund; `light` für weiße Sections */
  tone?: 'dark' | 'light';
};

export function VorlageDownloadForm({
  className = '',
  tone = 'dark',
}: VorlageDownloadFormProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isDark = tone === 'dark';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_PATTERN.test(trimmed)) {
      setState('error');
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    setState('submitting');

    try {
      await Promise.resolve();
    } catch {
      /* Download auch ohne Backend ermöglichen */
    }

    setState('success');

    const link = document.createElement('a');
    link.href = VORLAGE_DOWNLOAD_FILE;
    link.download = 'Gefahrstoffverzeichnis-Muster.xlsx';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (state === 'success') {
    return (
      <div
        className={`rounded-2xl border p-6 text-center ${
          isDark
            ? 'border-[#2dd4bf]/30 bg-[#2dd4bf]/10'
            : 'border-emerald-200 bg-emerald-50'
        } ${className}`}
        role="status"
      >
        <p
          className={`text-lg font-bold ${isDark ? 'text-[#f0f6ff]' : 'text-emerald-900'}`}
        >
          Vorlage ist unterwegs!
        </p>
        <p
          className={`mt-2 text-sm ${isDark ? 'text-[#8fa4c0]' : 'text-emerald-800'}`}
        >
          Der Download sollte automatisch starten. Falls nicht:
        </p>
        <a
          href={VORLAGE_DOWNLOAD_FILE}
          download
          className="gqr-cta-primary gqr-cta-primary--md mt-4 inline-flex no-underline"
        >
          Vorlage erneut herunterladen
        </a>
      </div>
    );
  }

  const formSurface = isDark
    ? 'border border-[#2dd4bf]/28 bg-gradient-to-br from-[#2dd4bf]/10 via-[#0f1e35]/80 to-[#0a1628]/90 shadow-lg shadow-black/25'
    : 'border border-slate-200 bg-white shadow-lg shadow-slate-900/5';

  const labelCls = isDark
    ? 'text-[#c8d4e6]'
    : 'text-slate-800';

  const inputCls = isDark
    ? 'min-h-[52px] flex-1 rounded-xl border border-white/15 bg-[#0a1628]/70 px-4 text-base text-[#f0f6ff] placeholder:text-[#8fa4c0] focus:border-[#2dd4bf]/50 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/25 disabled:opacity-60'
    : 'min-h-[52px] flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30 disabled:opacity-60';

  const hintCls = isDark ? 'text-[#8fa4c0]' : 'text-slate-500';
  const linkCls = isDark
    ? 'text-[#5eead4] underline hover:text-[#99f6e4]'
    : 'text-slate-600 underline hover:text-slate-900';

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl p-6 sm:p-8 ${formSurface} ${className}`}
      aria-label="Excel-Vorlage per E-Mail sichern"
    >
      <label htmlFor="vorlage-email" className={`block text-sm font-semibold ${labelCls}`}>
        E-Mail für den Download
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="vorlage-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="deine@firma.de"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          disabled={state === 'submitting'}
          className={inputCls}
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="gqr-cta-primary gqr-cta-primary--lg shrink-0 cursor-pointer border-0 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === 'submitting' ? 'Wird gesendet…' : 'Jetzt gratis Vorlage sichern'}
        </button>
      </div>
      {state === 'error' && errorMessage && (
        <p className="mt-2 text-sm text-red-400" role="alert">{errorMessage}</p>
      )}
      <p className={`mt-4 text-xs leading-relaxed ${hintCls}`}>
        Mit dem Download erhältst du die Vorlage und gelegentlich praxisnahe Tipps zum
        Gefahrstoffmanagement. Abmeldung jederzeit.{' '}
        <a href="/datenschutz/" className={linkCls}>Datenschutz</a>
      </p>
    </form>
  );
}
