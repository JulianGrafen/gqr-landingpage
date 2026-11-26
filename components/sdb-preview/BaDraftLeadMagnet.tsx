'use client';

import { useId, useState, type FormEvent } from 'react';
import { APP_URL } from '@/config/app-endpoints';
import { BA_DRAFT_COMPLIANCE_LINE, BA_DRAFT_LEAD_COPY, BA_DRAFT_LEAD_SOURCE } from '@/config/sdb-preview/ba-draft-lead-copy';
import { trackFunnelEvent } from '@/lib/analytics/funnel';
import { downloadBytes } from '@/lib/download-bytes';
import type { SdbPreviewTeaser } from '@/lib/sdb-preview/api-contract';
import { createBaDraftPdf, type BaDraftPdfFile } from '@/lib/sdb-preview/create-ba-draft-pdf';
import { mobileLeadEmailSchema } from '@/lib/sdb-preview/submit-mobile-lead';
import { useRegisterCta } from '@/lib/sdb-preview/use-register-cta';
import { submitVorlageLead } from '@/lib/submit-vorlage-lead';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  teaser: SdbPreviewTeaser;
  /** `null` bei Demo-Vorschauen ohne Server-Prefill. */
  previewToken: string | null;
  draftToken: string | null;
  className?: string;
};

const copy = BA_DRAFT_LEAD_COPY;
const REGISTER_FALLBACK_URL = `${APP_URL}/register`;

/**
 * Lead-Magnet unter dem SDB-Live-Ergebnis: E-Mail → BA-Entwurf (PDF) wird im Browser erzeugt und heruntergeladen.
 * Der Gratis-Konto-CTA bleibt vor und nach dem Download sichtbar.
 */
export function BaDraftLeadMagnet({ teaser, previewToken, draftToken, className = '' }: Props) {
  const fieldId = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<BaDraftPdfFile | null>(null);

  const accountCta = useRegisterCta({
    previewToken,
    draftToken,
    fallbackHref: REGISTER_FALLBACK_URL,
    utmMedium: 'ba-entwurf-lead',
    utmContent: 'ba-entwurf-download',
    placement: 'ba-draft-lead-magnet',
  });
  const pdfAccountCta = useRegisterCta({
    previewToken,
    draftToken,
    fallbackHref: REGISTER_FALLBACK_URL,
    utmMedium: 'ba-entwurf-pdf',
    utmContent: 'ba-entwurf-pdf-link',
    placement: 'ba-draft-pdf',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const parsed = mobileLeadEmailSchema.safeParse(email);
    if (!parsed.success) {
      setState('error');
      setErrorMessage(copy.invalidEmail);
      return;
    }

    setState('submitting');
    // Lead-Speicherung blockiert den Download nicht (Fehler werden in submitVorlageLead geloggt).
    void submitVorlageLead(parsed.data, { source: BA_DRAFT_LEAD_SOURCE });
    trackFunnelEvent('ba_draft_lead_submitted', { hasDraft: Boolean(draftToken) });

    try {
      const file = await createBaDraftPdf(teaser, pdfAccountCta.href);
      setPdfFile(file);
      downloadBytes(file.bytes, file.fileName, 'application/pdf');
      setState('success');
    } catch (error) {
      console.warn('[GQR] BA-Entwurf-PDF konnte nicht erstellt werden:', error);
      setState('error');
      setErrorMessage(copy.pdfError);
    }
  }

  const accountBlock = (
    <div className="mt-4 border-0 border-t border-solid border-white/10 pt-4">
      <p className="m-0 text-xs leading-relaxed text-[#c8d4e6]">{copy.accountHint}</p>
      <a
        href={accountCta.href}
        onClick={accountCta.onClick}
        className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-solid border-[#2dd4bf]/50 bg-[#2dd4bf]/10 px-4 text-center text-sm font-bold text-[#5eead4] no-underline transition-colors hover:border-[#2dd4bf] hover:bg-[#2dd4bf]/20 hover:text-[#99f6e4]"
      >
        {copy.accountCta}
      </a>
    </div>
  );

  return (
    <div
      className={`mt-4 rounded-2xl border border-solid border-[#2dd4bf]/28 bg-gradient-to-br from-[#2dd4bf]/10 via-[#0f1e35]/80 to-[#0a1628]/90 p-4 text-left shadow-lg shadow-black/25 sm:p-5 ${className}`}
      data-ba-draft-lead-magnet
    >
      <p className="m-0 text-[11px] font-semibold uppercase tracking-wider text-teal-300">{copy.eyebrow}</p>

      {state === 'success' && pdfFile ? (
        <div role="status" className="mt-2">
          <p className="m-0 text-base font-bold text-[#f0f6ff]">✓ {copy.successTitle}</p>
          <button
            type="button"
            className="mt-2 cursor-pointer border-0 bg-transparent p-0 text-xs font-semibold text-[#5eead4] underline hover:text-[#99f6e4]"
            onClick={() => downloadBytes(pdfFile.bytes, pdfFile.fileName, 'application/pdf')}
          >
            {copy.successRetry}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate aria-label={copy.title}>
          <p className="m-0 mt-1 text-base font-bold leading-snug text-[#f0f6ff]">{copy.title}</p>
          <label htmlFor={fieldId} className="sr-only">
            {copy.emailLabel}
          </label>
          <div className="mt-3 flex flex-col gap-2">
            <input
              id={fieldId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder={copy.placeholder}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (state === 'error') setState('idle');
              }}
              disabled={state === 'submitting'}
              className="min-h-[48px] w-full rounded-xl border border-solid border-white/15 bg-[#0a1628]/70 px-3 text-base text-[#f0f6ff] placeholder:text-[#8fa4c0] focus:border-[#2dd4bf]/50 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/25 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="btn-cta-orange sdb-unlock-cta !mt-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              {state === 'submitting' ? copy.submitting : copy.submit}
            </button>
          </div>
          {state === 'error' && errorMessage ? (
            <p className="m-0 mt-2 text-sm text-red-400" role="alert">
              {errorMessage}
            </p>
          ) : null}
          <p className="m-0 mt-3 text-xs leading-relaxed text-[#8fa4c0]">
            {copy.privacyPrefix}{' '}
            <a href={copy.privacyHref} className="text-[#5eead4] underline hover:text-[#99f6e4]">
              {copy.privacyLinkLabel}
            </a>
          </p>
        </form>
      )}

      {accountBlock}
      <p className="m-0 mt-3 text-[11px] leading-snug text-[#8fa4c0]">{BA_DRAFT_COMPLIANCE_LINE}</p>
    </div>
  );
}
