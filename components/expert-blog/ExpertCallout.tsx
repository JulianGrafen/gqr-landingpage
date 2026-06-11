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
      className={`rounded-2xl border border-l-[3px] border-l-[#2dd4bf] p-6 sm:p-8 ${
        isDark
          ? 'border-white/10 bg-[#162340]/90 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
          : 'border-slate-200 bg-white shadow-sm'
      }`}
    >
      <h3 className={`text-lg font-bold ${isDark ? 'text-[#f0f6ff]' : 'text-slate-900'}`}>
        {title}
      </h3>
      <div
        className={`mt-4 space-y-4 text-sm leading-relaxed sm:text-[0.9375rem] [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-[#2dd4bf] ${
          isDark ? 'text-[#8fa4c0]' : 'text-slate-600'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
