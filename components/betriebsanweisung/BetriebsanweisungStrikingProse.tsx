import Link from 'next/link';
import type { HazardousSubstanceSlug } from '@/config/betriebsanweisung/entries';
import { resolveMarketingHomeHref } from '@/config/site-seo';

const LINK_CLASS = 'font-semibold text-teal-300 underline underline-offset-2 hover:text-teal-200';

type Props = {
  slug: HazardousSubstanceSlug;
  substanceName: string;
};

/**
 * Striking-Distance-Zusatztexte mit internen Links (nur Slugs aus dem 2026-11-23-Lauf).
 */
export function BetriebsanweisungStrikingProse({ slug, substanceName }: Props) {
  switch (slug) {
    case 'isopropanol-trgs-555':
      return (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Isopropanol steht in vielen Werkstätten neben Bremsenreiniger und Lacklösern. Führen Sie solche Stoffe im{' '}
            <Link href="/loesungen/kfz-werkstatt/" className={LINK_CLASS}>
              Gefahrstoffverzeichnis der Kfz-Werkstatt
            </Link>{' '}
            mit Verweis auf das jeweilige Sicherheitsdatenblatt und verknüpfen Sie die Betriebsanweisung mit QR-Codes am
            Arbeitsplatz.
          </p>
          <p>
            Wer mehrere Produkte parallel pflegt, startet den{' '}
            <a href={resolveMarketingHomeHref()} className={LINK_CLASS}>
              digitalen Kataster-Entwurf auf der Startseite
            </a>{' '}
            und gibt jeden TRGS-555-Entwurf nach der SiFa-Prüfung frei.
          </p>
        </div>
      );
    case 'aceton-trgs-555':
      return (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Aceton wird oft gemeinsam mit Lackierstoffen gelagert. Prüfen Sie die{' '}
            <Link href="/trgs-510-zusammenlagerungs-check/" className={LINK_CLASS}>
              Zusammenlagerung nach TRGS 510
            </Link>{' '}
            bevor Sie Entzündbare im Werkstattschrank abstellen. Das Gefahrstoffverzeichnis nach § 6 GefStoffV verknüpft
            Mengen, Arbeitsplatz und SDB-Bezug.
          </p>
          <p>
            Für das gesamte Kataster nutzen Sie{' '}
            <a href={resolveMarketingHomeHref()} className={LINK_CLASS}>
              Gefahrstoff-QR als Kataster-Software
            </a>{' '}
            oder die Branchenseite{' '}
            <Link href="/loesungen/kfz-werkstatt/" className={LINK_CLASS}>
              Gefahrstoff-Software für Kfz-Werkstätten
            </Link>
            .
          </p>
        </div>
      );
    case 'sekundenkleber-trgs-555':
      return (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Sekundenkleber ergänzt das Verzeichnis in der{' '}
            <Link href="/loesungen/kfz-werkstatt/" className={LINK_CLASS}>
              Kfz-Werkstatt-Lösung
            </Link>{' '}
            um Klebstoffe und Dichtmassen. Unterweisung und QR-Notfallpass greifen auf dieselbe Betriebsanweisung zu.
          </p>
          <p>
            Alle Stoffe lassen sich über{' '}
            <a href={resolveMarketingHomeHref()} className={LINK_CLASS}>
              den Livetest auf der Startseite
            </a>{' '}
            aus SDB-PDFs in Entwürfe überführen.
          </p>
        </div>
      );
    case 'argon-trgs-555':
      return (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Argon gehört neben Schutzgasen und Flaschenlagern ins Verzeichnis. Bei Metallbau und Karosseriebau
            übernimmt oft dieselbe Software wie in der{' '}
            <Link href="/loesungen/kfz-werkstatt/" className={LINK_CLASS}>
              Gefahrstoff-Lösung für Werkstätten
            </Link>
            .
          </p>
          <p>
            Lagern Sie Druckgasflaschen getrennt von Entzündbaren: Hilfreich ist der{' '}
            <Link href="/trgs-510-zusammenlagerungs-check/" className={LINK_CLASS}>
              TRGS-510-Zusammenlagerungs-Check
            </Link>
            .
          </p>
        </div>
      );
    case 'kaliumpermanganat-trgs-555':
      return (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Oxidationsmittel wie {substanceName} gehören in Gefahrstoffverzeichnis und Gefährdungsbeurteilung.
            Zusammenlagerung prüfen Sie mit dem{' '}
            <Link href="/trgs-510-zusammenlagerungs-check/" className={LINK_CLASS}>
              TRGS-510-Hinweis zu Lagerklassen
            </Link>
            .
          </p>
          <p>
            Betriebsanweisungen und Verzeichnis pflegen Sie zentral über{' '}
            <a href={resolveMarketingHomeHref()} className={LINK_CLASS}>
              die Gefahrstoffmanagement-Plattform
            </a>
            .
          </p>
        </div>
      );
    case 'grundierung-trgs-555':
      return (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#c8d4e6]">
          <p>
            Für die mündliche Unterweisung am Lackierplatz nutzen Sie eine eigene Vorlage-Struktur:{' '}
            <Link href="/wissen/gefahrstoffunterweisung-vorlage/" className={LINK_CLASS}>
              Gefahrstoffunterweisung Vorlage
            </Link>{' '}
            (§ 14 GefStoffV, TRGS 555, dokumentierbar mit Unterschrift).
          </p>
          <p>
            Nach TRGS 600 soll der Betrieb prüfen, ob eine weniger belastete Grundierung verfügbar ist. Die
            Substitutionsprüfung dokumentieren Sie sinnvoll im{' '}
            <Link href="/wissen/gefahrstoffkataster-erstellen/" className={LINK_CLASS}>
              Leitfaden Gefahrstoffkataster erstellen
            </Link>{' '}
            zusammen mit Verzeichnis und Betriebsanweisungen.
          </p>
          <p>
            Lackierbereiche profitieren von einer{' '}
            <Link href="/loesungen/kfz-werkstatt/" className={LINK_CLASS}>
              Werkstatt-Software mit Kataster und QR-Codes
            </Link>{' '}
            sowie dem{' '}
            <Link href="/trgs-510-zusammenlagerungs-check/" className={LINK_CLASS}>
              Check zur Lagerung von Grundierung und Verdünnung
            </Link>
            .
          </p>
          <p>
            Für alle Produkte der Werkstatt:{' '}
            <a href={resolveMarketingHomeHref()} className={LINK_CLASS}>
              digitales Gefahrstoffkataster erstellen
            </a>
            .
          </p>
        </div>
      );
    default:
      return null;
  }
}

export function hasBetriebsanweisungStrikingProse(slug: string): slug is HazardousSubstanceSlug {
  return (
    slug === 'isopropanol-trgs-555' ||
    slug === 'aceton-trgs-555' ||
    slug === 'sekundenkleber-trgs-555' ||
    slug === 'argon-trgs-555' ||
    slug === 'kaliumpermanganat-trgs-555' ||
    slug === 'grundierung-trgs-555'
  );
}