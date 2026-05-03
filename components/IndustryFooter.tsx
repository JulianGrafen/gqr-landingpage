import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Car,
  FlaskConical,
  Hammer,
  Paintbrush,
  Sparkles,
} from 'lucide-react';
import { getAllIndustries, type IndustrySlug } from '@/config/industry-solutions';

const ICONS: Record<IndustrySlug, LucideIcon> = {
  'kfz-werkstatt': Car,
  schreinerei: Hammer,
  malerbetrieb: Paintbrush,
  laborbetrieb: FlaskConical,
  reinigungsunternehmen: Sparkles,
};

/**
 * Branchen-Grid — Branchenname + Link zum jeweiligen Blog-Artikel.
 */
export function IndustryFooter() {
  const industries = getAllIndustries();

  return (
    <section
      className="border-t border-slate-200/80 bg-slate-200/90 px-4 py-14 sm:px-6 lg:px-8 lg:py-16"
      aria-labelledby="industry-footer-heading"
    >
      <div className="mx-auto max-w-[1160px]">
        <h2
          id="industry-footer-heading"
          className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Maßgeschneiderte Lösungen für Ihre Branche
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Lesen Sie im Blog, wie Gefahrstoff-QR in Ihrer Branche bei
          GefStoffV, SDB und Betriebsanweisungen hilft.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {industries.map((item) => {
            const Icon = ICONS[item.slug];
            return (
              <li key={item.slug}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-300/80 bg-white p-5 shadow-sm">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-800"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span className="mt-4 text-base font-bold text-slate-900">
                    {item.label}
                  </span>
                  <Link
                    href={item.blogPostHref}
                    className="mt-4 text-sm font-semibold text-[#ff6b35] no-underline transition hover:underline"
                  >
                    Branchen-Blog
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
