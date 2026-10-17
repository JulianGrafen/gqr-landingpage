/** Shared class strings — Next (Tailwind) vs static homepage (BEM in style.css). */

export type SdbPreviewVariant = 'next' | 'static';

export function shellClass(variant: SdbPreviewVariant, embedded = false): string {
  if (variant === 'static') return 'sdb-live-preview-shell';
  if (embedded) {
    return 'rounded-xl border border-white/10 bg-[#0f1e35]/70 p-4 shadow-inner shadow-black/20';
  }
  return 'rounded-2xl border border-white/10 bg-gradient-to-br from-[#162340]/95 to-[#0f1e35]/90 p-5 shadow-xl shadow-black/25 sm:p-6';
}

export function dropzoneClass(variant: SdbPreviewVariant, state: 'idle' | 'drag' | 'processing'): string {
  if (variant === 'static') {
    const base = 'sdb-live-preview-dropzone';
    if (state === 'drag') return `${base} is-drag-over`;
    if (state === 'processing') return `${base} is-processing`;
    return base;
  }
  const base =
    'flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-teal-400/45 bg-teal-400/5 px-3 py-5 text-center transition';
  if (state === 'drag') return `${base} border-blue-500 bg-blue-100/10`;
  if (state === 'processing') return `${base} border-teal-500 bg-teal-500/10`;
  return base;
}

export function unlockCardClass(variant: SdbPreviewVariant): string {
  if (variant === 'static') return 'sdb-live-preview-unlock';
  return 'gqr-card gqr-card--featured relative z-10 mx-auto max-w-lg -mt-6 p-6 text-center sm:p-8';
}

export function primaryCtaClass(variant: SdbPreviewVariant): string {
  if (variant === 'static') return 'btn-cta-orange sdb-live-preview-unlock__cta';
  return 'gqr-cta-primary gqr-cta-primary--lg mt-4 inline-flex w-full max-w-md justify-center no-underline';
}
