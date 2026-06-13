type ExpertCalloutProps = {
  title: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
};

/**
 * Hervorgehobener Realismus-/Hinweis-Block (Expert-Ton).
 */
export function ExpertCallout({ title, children, tone = 'light' }: ExpertCalloutProps) {
  const isDark = tone === 'dark';

  return (
    <div
      className={`rounded-2xl border border-l-[3px] border-l-gqr-trust p-6 sm:p-8 ${
        isDark
          ? 'gqr-card gqr-card--flat border-white/10 bg-gqr-raised/90'
          : 'border-slate-200 bg-white shadow-sm'
      }`}
    >
      <h3 className={`text-lg font-bold ${isDark ? 'text-gqr-text' : 'text-slate-900'}`}>
        {title}
      </h3>
      <div
        className={`mt-4 space-y-4 text-sm leading-relaxed sm:text-[0.9375rem] [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-gqr-trust ${
          isDark ? 'text-gqr-muted' : 'text-slate-600'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
