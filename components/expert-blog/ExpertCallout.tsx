type ExpertCalloutProps = {
  title: string;
  children: React.ReactNode;
};

/**
 * Hervorgehobener Realismus-/Hinweis-Block (Expert-Ton).
 */
export function ExpertCallout({ title, children }: ExpertCalloutProps) {
  return (
    <div className="rounded-2xl border border-slate-200 border-l-[3px] border-l-[#2dd4bf] bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem] [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-[#2dd4bf]">
        {children}
      </div>
    </div>
  );
}
