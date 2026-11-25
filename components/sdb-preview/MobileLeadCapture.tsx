'use client';

import { useId, useState, type FormEvent } from 'react';
import { SDB_MOBILE_FLOW_COPY } from '@/config/sdb-preview/mobile-flow-copy';
import { trackFunnelEvent } from '@/lib/analytics/funnel';
import { submitMobileLead } from '@/lib/sdb-preview/submit-mobile-lead';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  draftToken: string | null;
  previewToken: string | null;
  className?: string;
};

const copy = SDB_MOBILE_FLOW_COPY.lead;

/** 1-Feld-Widget unter der Dropzone, nur auf schmalen Viewports (< md) sichtbar. */
export function MobileLeadCapture({ draftToken, previewToken, className = '' }: Props) {
  const fieldId = useId();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setMessage(null);
    const result = await submitMobileLead({ email, draftToken, previewToken });
    if (result.ok) {
      setState('success');
      trackFunnelEvent('mobile_lead_submitted', { hasDraft: Boolean(draftToken) });
      return;
    }
    setState('error');
    setMessage(result.reason === 'invalid_email' ? copy.invalidEmail : copy.error);
  }

  if (state === 'success') {
    return (
      <p
        className={`mt-4 rounded-xl border border-teal-300/30 bg-teal-300/10 px-4 py-3 text-sm leading-relaxed text-[#c8d4e6] md:hidden ${className}`}
        role="status"
      >
        ✓ {copy.success}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-4 rounded-2xl border border-white/10 bg-[#0f1e35]/70 p-4 text-left md:hidden ${className}`}
      aria-label={copy.title}
      noValidate
    >
      <p className="m-0 text-sm font-semibold text-[#f0f6ff]">{copy.title}</p>
      <label htmlFor={fieldId} className="sr-only">
        {copy.emailLabel}
      </label>
      <div className="mt-3 flex gap-2">
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
          className="min-h-[48px] min-w-0 flex-1 rounded-xl border border-white/15 bg-[#0a1628]/70 px-3 text-base text-[#f0f6ff] placeholder:text-[#8fa4c0] focus:border-[#2dd4bf]/50 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/25 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="gqr-cta-primary gqr-cta-primary--md shrink-0 cursor-pointer border-0 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === 'submitting' ? copy.submitting : copy.submit}
        </button>
      </div>
      {state === 'error' && message ? (
        <p className="m-0 mt-2 text-sm text-red-400" role="alert">
          {message}
        </p>
      ) : null}
      <p className="m-0 mt-3 text-xs leading-relaxed text-[#8fa4c0]">
        {copy.privacyPrefix}{' '}
        <a href={copy.privacyHref} className="text-[#5eead4] underline hover:text-[#99f6e4]">
          {copy.privacyLinkLabel}
        </a>
      </p>
    </form>
  );
}
