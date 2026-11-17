import Link from 'next/link';
import type { HazardousSubstanceSeoEntry, SubstanceFaqItems } from '@/config/betriebsanweisung/types';
import { BetriebsanweisungFaqSection } from '@/components/betriebsanweisung/BetriebsanweisungFaqSection';
import { BA_HUB_LINKS } from '@/config/betriebsanweisung/hub-links';
import { resolveMarketingHomeHref } from '@/config/site-seo';
import { BetriebsanweisungIntentSwitch } from '@/components/betriebsanweisung/BetriebsanweisungIntentSwitch';
import { buildWorkplaceConditionsParagraph } from '@/lib/betriebsanweisung/format-workplace-context';

type Props = {
  entry: HazardousSubstanceSeoEntry;
  /** Dieselben Items wie im FAQPage-JSON-LD der Seite (1:1 synchron). */
  faqItems: SubstanceFaqItems;
};

const HUB_LINK_CLASS = 'font-semibold text-teal-300 underline underline-offset-2 hover:text-teal-200';

export function BetriebsanweisungExpertSeoSection({ entry, faqItems }: Props) {
  const workplaceParagraph = buildWorkplaceConditionsParagraph(entry.substanceName, entry.typicalIndustries);

  return (
    <div className="space-y-12">
      <section aria-labelledby="compliance-heading">
        <h2 id="compliance-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Warum eine Betriebsanweisung für {entry.substanceName} hersteller- und arbeitsplatzbezogen sein muss
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>{workplaceParagraph}</p>
          <p>
            Allgemeine Sicherheits- und Schutzangaben aus dem Internet genügen den Anforderungen des § 14 GefStoffV
            nicht. Schutzmaßnahmen wie Atemschutz, Handschuhmaterial oder Lüftung hängen von der Konzentration im
            Produkt Ihres Lieferanten, der Einsatzmenge und den Lüftungsverhältnissen vor Ort ab. Deshalb nennt diese
            Seite bewusst keine verbindlichen Schutzmaßnahmen. Maßgeblich ist das Sicherheitsdatenblatt Ihres Produkts.
          </p>
        </div>
      </section>

      <section aria-labelledby="legal-frame-heading">
        <h2 id="legal-frame-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Rechtlicher Rahmen: § 14 GefStoffV und TRGS 555
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Für Tätigkeiten mit {entry.substanceName} muss vor Aufnahme der Arbeit eine schriftliche Betriebsanweisung
            vorliegen. Sie muss in verständlicher Form und Sprache verfasst sein, den Arbeitsplatz berücksichtigen und auf
            das Sicherheitsdatenblatt des verwendeten Produkts Bezug nehmen. Die TRGS 555 konkretisiert Aufbau und
            Inhalte.
          </p>
          <p>
            Gefahrstoff-QR erstellt einen KI-gestützten Entwurf (gemäß TRGS 555) als Vorprüfung zur fachlichen Freigabe
            durch die SiFa / den Arbeitgeber (§ 14 GefStoffV). Freigabe, Unterweisung und die Dokumentation im
            Gefahrstoffverzeichnis nach § 6 GefStoffV bleiben betriebliche Pflichten.
          </p>
          <p>
            Die Betriebsanweisung ist ein Baustein des betrieblichen Gefahrstoffmanagements. Wie Excel-Listen,
            Konzern-EHS-Systeme und spezialisierte Lösungen Verzeichnis, Betriebsanweisungen und Lagerung abdecken,
            zeigt der Leitfaden{' '}
            <Link href={BA_HUB_LINKS.softwareGuide.href} className={HUB_LINK_CLASS}>
              {BA_HUB_LINKS.softwareGuide.anchorText}
            </Link>
            . Den Funktionsumfang im Überblick finden Sie bei{' '}
            <a href={resolveMarketingHomeHref()} className={HUB_LINK_CLASS}>
              {BA_HUB_LINKS.home.anchorText}
            </a>
            .{' '}
            Wer Produkte in Sprühflaschen oder andere Gebinde umfüllt, kennzeichnet diese mit{' '}
            <Link href={BA_HUB_LINKS.labelSoftware.href} className={HUB_LINK_CLASS}>
              {BA_HUB_LINKS.labelSoftware.anchorText}
            </Link>
            .
          </p>
        </div>
      </section>

      <BetriebsanweisungIntentSwitch slug={entry.slug} />

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-[#f0f6ff]">
          Häufige Fragen zur Betriebsanweisung {entry.substanceName}
        </h2>
        <div className="mt-6">
          <BetriebsanweisungFaqSection items={faqItems} variant="dark" />
        </div>
      </section>
    </div>
  );
}
