'use client';

import { useState, type FormEvent } from 'react';
import { VORLAGE_DOWNLOAD_FILE } from '@/config/vorlage-landing';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function VorlageDownloadForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

    // Platzhalter für spätere Lead-API (z. B. App-Backend oder Newsletter)
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
        className={`rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center ${className}`}
        role="status"
      >
        <p className="text-lg font-bold text-emerald-900">Vorlage ist unterwegs!</p>
        <p className="mt-2 text-sm text-emerald-800">
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

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 sm:p-8 ${className}`}
      aria-label="Excel-Vorlage per E-Mail sichern"
    >
      <label htmlFor="vorlage-email" className="block text-sm font-semibold text-slate-800">
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
          className="min-h-[52px] flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="gqr-cta-primary gqr-cta-primary--lg shrink-0 border-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === 'submitting' ? 'Wird gesendet…' : 'Jetzt gratis Vorlage sichern'}
        </button>
      </div>
      {state === 'error' && errorMessage && (
        <p className="mt-2 text-sm text-red-600" role="alert">{errorMessage}</p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Mit dem Download erhältst du die Vorlage und gelegentlich praxisnahe Tipps zum
        Gefahrstoffmanagement. Abmeldung jederzeit.{' '}
        <a href="/datenschutz/" className="text-slate-600 underline hover:text-slate-900">
          Datenschutz
        </a>
      </p>
    </form>
  );
}
