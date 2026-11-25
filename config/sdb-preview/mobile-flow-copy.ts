import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';

/**
 * Mobile-First-Flow der SDB-Dropzone (< md): Beispiel-SDB als Primär-Aktion und
 * E-Mail-Fallback für den späteren Test am Desktop.
 * Bewusst ohne feste Zeitversprechen (scripts/validate-legal-copy.mjs).
 */

const QUICK_EXAMPLE_LABEL = SDB_PREVIEW_EXAMPLES[0].label;

export const SDB_MOBILE_FLOW_COPY = {
  quickExamplePrimary: `Kein SDB am Handy? Beispiel-SDB (${QUICK_EXAMPLE_LABEL}) mit 1 Klick testen`,
  lead: {
    title: 'Muster-BA & Desktop-Link an meine E-Mail senden',
    emailLabel: 'E-Mail-Adresse',
    placeholder: 'name@firma.de',
    submit: 'Senden',
    submitting: 'Wird gesendet…',
    success: 'Gesendet. Prüfen Sie Ihr Postfach: Muster-BA und Link zum Weitermachen am Desktop sind unterwegs.',
    error: 'Senden hat gerade nicht geklappt. Bitte später erneut versuchen.',
    invalidEmail: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    privacyPrefix: 'Nur für diesen Versand, keine Weitergabe.',
    privacyLinkLabel: 'Datenschutz',
    privacyHref: '/datenschutz/',
  },
} as const;
