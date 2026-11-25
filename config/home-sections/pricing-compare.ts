import type { HomePricingCardId } from '@/config/home-sections/pricing';
import { GBU_MODULE_LABEL } from '@/config/pricing-plans';

export type PricingCompareCell =
  | { kind: 'text'; value: string }
  | { kind: 'yes'; ariaLabel?: string }
  | { kind: 'no'; ariaLabel?: string; suffix?: string }
  | { kind: 'dash' };

export interface PricingCompareRow {
  label: string;
  cells: Record<HomePricingCardId, PricingCompareCell>;
}

export const HOME_PRICING_COMPARE_ROWS: readonly PricingCompareRow[] = [
  {
    label: 'Zielgruppe',
    cells: {
      'kmu-basis': { kind: 'text', value: 'Kleine Betriebe & Handwerk' },
      'kmu-pro': { kind: 'text', value: 'Mittelstand & Produktion' },
      'sifa-multi-mandant': { kind: 'text', value: 'Externe SiFa & Ingenieurbüros' },
    },
  },
  {
    label: 'SDB-Uploads / Gefahrstoffe',
    cells: {
      'kmu-basis': { kind: 'text', value: 'Bis 30' },
      'kmu-pro': { kind: 'text', value: 'Bis 250' },
      'sifa-multi-mandant': { kind: 'text', value: 'Fair-Use je Mandant' },
    },
  },
  {
    label: 'Werke',
    cells: {
      'kmu-basis': { kind: 'text', value: '1' },
      'kmu-pro': { kind: 'text', value: 'Bis 3' },
      'sifa-multi-mandant': { kind: 'text', value: 'Unbegrenzt (Fair-Use)' },
    },
  },
  {
    label: 'KI-gestützte BA-Entwürfe',
    cells: {
      'kmu-basis': { kind: 'yes' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'Batch-Upload',
    cells: {
      'kmu-basis': { kind: 'no' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: GBU_MODULE_LABEL,
    cells: {
      'kmu-basis': { kind: 'no' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'PDF-Export inkl. GHS-Piktogrammen',
    cells: {
      'kmu-basis': { kind: 'yes' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'Excel-Export',
    cells: {
      'kmu-basis': { kind: 'yes' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'QR-Notfallansicht',
    cells: {
      'kmu-basis': { kind: 'yes' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'SDB-Aktualitäts-Alerts',
    cells: {
      'kmu-basis': { kind: 'no' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'Mehrere Nutzer',
    cells: {
      'kmu-basis': { kind: 'no' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'Begehungs-Modus (ohne SDB)',
    cells: {
      'kmu-basis': { kind: 'yes' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'Mandanten- & Werkstrennung',
    cells: {
      'kmu-basis': { kind: 'no' },
      'kmu-pro': { kind: 'yes', ariaLabel: 'Ja, Werks-Hierarchie' },
      'sifa-multi-mandant': { kind: 'yes', ariaLabel: 'Ja, Mandanten- und Werks-Hierarchie' },
    },
  },
  {
    label: 'Mandantenbetriebe inkl.',
    cells: {
      'kmu-basis': { kind: 'dash' },
      'kmu-pro': { kind: 'dash' },
      'sifa-multi-mandant': { kind: 'text', value: 'Bis 15 · +79 €/Monat je 10er-Block' },
    },
  },
  {
    label: 'Kauf auf Rechnung / SEPA',
    cells: {
      'kmu-basis': { kind: 'yes' },
      'kmu-pro': { kind: 'yes' },
      'sifa-multi-mandant': { kind: 'yes' },
    },
  },
  {
    label: 'SSO (Single Sign-On)',
    cells: {
      'kmu-basis': { kind: 'no' },
      'kmu-pro': { kind: 'no' },
      'sifa-multi-mandant': { kind: 'no' },
    },
  },
  {
    label: 'Dedizierter AVV-Support',
    cells: {
      'kmu-basis': { kind: 'no' },
      'kmu-pro': { kind: 'no' },
      'sifa-multi-mandant': { kind: 'no' },
    },
  },
];