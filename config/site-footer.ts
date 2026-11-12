/** Footer-Navigation und SEO-Silos (Startseite & statisches HTML). */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterNavColumn {
  id: string;
  title: string;
  links: readonly FooterLink[];
}

export const FOOTER_PRODUCT_LINKS = [
  { label: 'Live-Test', href: '/#live-demo' },
  { label: 'Preise', href: '/#preise' },
  { label: 'Schlüsselfertig (2.900 €)', href: '/#schluesselfertig-service' },
  { label: 'Kataster erstellen lassen', href: '/wissen/gefahrstoffkataster-erstellen-lassen/' },
  { label: 'Für SiFas', href: '/#fuer-sifas' },
  { label: 'TarifVorschau starten', href: 'https://app.gefahrstoff-qr.de/register' },
] as const satisfies readonly FooterLink[];

export const FOOTER_RESOURCE_LINKS = [
  { label: 'Wissen', href: '/wissen/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Excel-Vorlage', href: '/gefahrstoffverzeichnis-excel-vorlage/' },
  { label: 'TRGS-510-Checker', href: '/trgs-510-zusammenlagerungs-check/' },
  { label: 'Excel vs. Software', href: '/gefahrstoffkataster-excel-vorlage/' },
] as const satisfies readonly FooterLink[];

export const FOOTER_LEGAL_LINKS = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'AGB', href: '/agb' },
] as const satisfies readonly FooterLink[];

export const FOOTER_INDUSTRY_LINKS = [
  { label: 'Kfz-Werkstatt', href: '/loesungen/kfz-werkstatt/' },
  { label: 'Schreinerei', href: '/loesungen/schreinerei/' },
  { label: 'Malerbetrieb', href: '/loesungen/malerbetrieb/' },
  { label: 'Labor', href: '/loesungen/laborbetrieb/' },
  { label: 'Gebäudereinigung', href: '/loesungen/reinigungsunternehmen/' },
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
