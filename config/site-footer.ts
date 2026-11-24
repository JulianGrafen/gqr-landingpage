/** Footer-Navigation und SEO-Silos (Startseite & statisches HTML). */
import { getDecisionPagesForFooterColumn } from '@/config/trust/decision-pages';
import type { DecisionPageLink } from '@/config/trust/types';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterNavColumn {
  id: string;
  title: string;
  links: readonly FooterLink[];
}

function toFooterLinks(pages: readonly DecisionPageLink[]): FooterLink[] {
  return pages.map((page) => ({ label: page.navLabel, href: page.href }));
}

export const FOOTER_PRODUCT_LINKS: readonly FooterLink[] = [
  { label: 'Live-Test', href: '/#live-demo' },
  { label: 'Preise', href: '/#preise' },
  { label: 'Schlüsselfertig (2.900 € zzgl. MwSt.)', href: '/wissen/gefahrstoffkataster-erstellen-lassen/' },
  { label: 'Kataster erstellen lassen', href: '/wissen/gefahrstoffkataster-erstellen-lassen/' },
  { label: 'Für SiFas', href: '/#fuer-sifas' },
  ...toFooterLinks(getDecisionPagesForFooterColumn('product')),
  { label: 'Kostenlos starten', href: 'https://app.gefahrstoff-qr.de/register' },
];

export const FOOTER_RESOURCE_LINKS = [
  { label: 'Wissen', href: '/wissen/' },
  { label: 'Gefahrstoffmanagement Software', href: '/wissen/gefahrstoffmanagement-software/' },
  { label: 'Etikettensoftware Gefahrstoffe', href: '/etikettensoftware-gefahrstoffe/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Excel-Vorlage', href: '/gefahrstoffverzeichnis-excel-vorlage/' },
  { label: 'TRGS-510-Checker', href: '/trgs-510-zusammenlagerungs-check/' },
  { label: 'Excel vs. Software', href: '/gefahrstoffkataster-excel-vorlage/' },
] as const satisfies readonly FooterLink[];

export const FOOTER_LEGAL_LINKS: readonly FooterLink[] = [
  ...toFooterLinks(getDecisionPagesForFooterColumn('legal')),
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'AGB', href: '/agb' },
];

export const FOOTER_INDUSTRY_LINKS = [
  { label: 'Kfz-Werkstatt', href: '/loesungen/kfz-werkstatt/' },
  { label: 'Schreinerei', href: '/loesungen/schreinerei/' },
  { label: 'Malerbetrieb', href: '/loesungen/malerbetrieb/' },
  { label: 'Labor', href: '/loesungen/laborbetrieb/' },
  { label: 'Gebäudereinigung', href: '/loesungen/reinigungsunternehmen/' },
  { label: 'Zahnarztpraxis', href: '/loesungen/zahnarztpraxis/' },
  { label: 'Elektrobetrieb', href: '/loesungen/elektrobetrieb/' },
  { label: 'Dachdecker', href: '/loesungen/dachdecker/' },
  { label: 'Tankstelle', href: '/loesungen/tankstelle/' },
  { label: 'Druckerei', href: '/loesungen/druckerei/' },
  { label: 'Bäckerei', href: '/loesungen/baeckerei/' },
  { label: 'SiFa & Mandanten', href: '/loesungen/sifa-mehrere-mandanten/' },
  { label: 'Fliesenleger', href: '/loesungen/fliesenleger/' },
  { label: 'SHK-Betrieb', href: '/loesungen/shk-betrieb/' },
  { label: 'Lackiererei', href: '/loesungen/lackiererei/' },
  { label: 'Tischlerei', href: '/loesungen/tischlerei/' },
  { label: 'Gastronomie', href: '/loesungen/gastronomie/' },
  { label: 'Steinmetz', href: '/loesungen/steinmetz/' },
  { label: 'Galabau', href: '/loesungen/garten-landschaftsbau/' },
  { label: 'Pflegeeinrichtung', href: '/loesungen/pflegeeinrichtung/' },
  { label: 'Gerüstbau', href: '/loesungen/geruestbau/' },
] as const satisfies readonly FooterLink[];

export const FOOTER_BA_SAMPLE_LINKS = [
  { label: 'Bremsenreiniger', href: '/betriebsanweisung/bremsenreiniger-trgs-555/' },
  { label: 'Aceton', href: '/betriebsanweisung/aceton-trgs-555/' },
  { label: 'Isopropanol', href: '/betriebsanweisung/isopropanol-trgs-555/' },
  { label: 'Epoxidharz', href: '/betriebsanweisung/epoxidharz-trgs-555/' },
  { label: 'Kühlschmierstoff', href: '/betriebsanweisung/kuehlschmierstoff-trgs-555/' },
  { label: 'AdBlue', href: '/betriebsanweisung/adblue-trgs-555/' },
] as const satisfies readonly FooterLink[];

export const FOOTER_TRUST_BADGES = [
  { id: 'hosting' as const, label: 'Hosting in Deutschland (inkl. AVV)' },
  { id: 'made-in-germany' as const, label: 'Made in Germany' },
  { id: 'ssl' as const, label: 'SSL-verschlüsselt' },
];
