/** Shared class strings — Next (Tailwind) vs static homepage (BEM in style.css). */

export type SdbPreviewVariant = 'next' | 'static';

export function shellClass(variant: SdbPreviewVariant): string {
  if (variant === 'static') return 'sdb-live-preview-shell';
  return 'rounded-[1.75rem] border border-white/[0.09] bg-gradient-to-br from-[#162340]/95 to-[#0f1e35]/90 p-6 shadow-[0_28px_70px_rgba(0,0,0,0.36)] sm:p-8';
}

export function dropzoneClass(variant: SdbPreviewVariant, state: 'idle' | 'drag' | 'processing'): string {
  if (variant === 'static') {
    const base = 'sdb-live-preview-dropzone';
    if (state === 'drag') return `${base} is-drag-over`;
    if (state === 'processing') return `${base} is-processing`;
    return base;
  }
  const base =
    'flex min-h-[164px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[22px] border-2 border-dashed border-teal-400/55 bg-teal-400/10 px-4 py-6 text-center transition';
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
