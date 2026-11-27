import { StrikingDistanceMidPageCta } from '@/components/marketing/StrikingDistanceMidPageCta';
import type { StrikingDistanceMidPageCtaCopy } from '@/components/marketing/StrikingDistanceMidPageCta';

type CeoGeminiClickPageMidCtaProps = {
  copy: StrikingDistanceMidPageCtaCopy;
  /** Startseite und Branchen-LP: gleiche Kartenoptik wie Wissen-Hub. */
  variant?: 'wissen' | 'betriebsanweisung';
};

/** Mid-Page-CTA für die vier organischen Klickseiten (ceo-gemini-cta). */
export function CeoGeminiClickPageMidCta({ copy, variant = 'wissen' }: CeoGeminiClickPageMidCtaProps) {
  return <StrikingDistanceMidPageCta copy={copy} variant={variant} />;
}