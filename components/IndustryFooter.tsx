import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Car,
  FlaskConical,
  Hammer,
  Paintbrush,
  Sparkles,
  Scissors,
  Factory,
  Wheat,
  Stethoscope,
  Zap,
  Home,
  Fuel,
  Printer,
  Croissant,
  ShieldCheck,
  LayoutGrid,
  Droplets,
  SprayCan,
  Armchair,
  UtensilsCrossed,
  Pickaxe,
  TreePine,
  HeartHandshake,
  HardHat,
  Shirt,
  Cylinder,
  PawPrint,
  Key,
  PanelTop,
  Accessibility,
} from 'lucide-react';
import { getAllIndustries, type IndustrySlug } from '@/config/industry-solutions';

const ICONS: Record<IndustrySlug, LucideIcon> = {
  'kfz-werkstatt': Car,
  schreinerei: Hammer,
  malerbetrieb: Paintbrush,
  laborbetrieb: FlaskConical,
  reinigungsunternehmen: Sparkles,
  friseursalon: Scissors,
  metallbau: Factory,
  landwirtschaft: Wheat,
  zahnarztpraxis: Stethoscope,
  elektrobetrieb: Zap,
  dachdecker: Home,
  tankstelle: Fuel,
  druckerei: Printer,
  baeckerei: Croissant,
  'sifa-mehrere-mandanten': ShieldCheck,
  fliesenleger: LayoutGrid,
  'shk-betrieb': Droplets,
  lackiererei: SprayCan,
  tischlerei: Armchair,
  gastronomie: UtensilsCrossed,
  steinmetz: Pickaxe,
  'garten-landschaftsbau': TreePine,
  pflegeeinrichtung: HeartHandshake,
  geruestbau: HardHat,
  textilreinigerei: Shirt,
  kunststoffverarbeitung: Cylinder,
  tierarztpraxis: PawPrint,
  schlosserei: Key,
  glaserei: PanelTop,
  orthopaedietechnik: Accessibility,
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
 GefStoffV, Sicherheitsdatenblatt und Betriebsanweisungen hilft.
 </p>

 <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
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
           href={`/loesungen/${item.slug}/`}
           className="mt-4 text-sm font-semibold text-[#ff6b35] no-underline transition hover:underline"
          >
           Branchen-Landingpage
          </Link>
          <Link
           href={item.blogPostHref}
           className="mt-2 text-xs font-medium text-slate-500 no-underline transition hover:text-[#ff6b35] hover:underline"
          >
           Mehr im Blog &amp; Wissen
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
