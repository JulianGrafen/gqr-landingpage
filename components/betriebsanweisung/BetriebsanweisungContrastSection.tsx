import { BA_CONTAINER, BA_SECTION_MUTED } from '@/components/betriebsanweisung/ba-page-layout';
import type { HazardousSubstanceSeoEntry } from '@/config/betriebsanweisung/types';

type Props = {
  entry: HazardousSubstanceSeoEntry;
};

const MANUAL_ITEMS = [
  'Manuelles Suchen und Abtippen von Textpassagen aus mehrseitigen Lieferanten-PDFs',
  'Übertragungsfehler beim händischen Kopieren von SDB-Angaben in einzelne Vorlagen',
  'Getrennte Pflege von Betriebsanweisungen und Gefahrstoffverzeichnis (§ 6 GefStoffV)',
  'Statische Papier-Ordner ohne schnellen mobilen Zugriff am Arbeitsplatz',
] as const;

export function BetriebsanweisungContrastSection({ entry }: Props) {
  const substance = entry.substanceName;

  return (
    <section className={BA_SECTION_MUTED} aria-labelledby="ba-contrast-heading">
      <div className={BA_CONTAINER}>
        <h2 id="ba-contrast-heading" className="text-2xl font-bold text-[#f0f6ff] sm:text-3xl">
          Manuelle Dokumentenpflege vs. SDB-gestützter Entwurf bei {substance}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="ba-contrast-panel ba-contrast-panel--negative flex h-full flex-col">
            <h3 className="m-0 text-lg font-bold text-[#f0f6ff]">Manuelle Erstellung in Word &amp; Excel</h3>
            <ul className="m-0 mt-4 list-none space-y-3 p-0 text-sm leading-relaxed text-[#c8d4e6]" role="list">
              {MANUAL_ITEMS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="shrink-0 text-red-300" aria-hidden="true">
                    ✗
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ba-contrast-panel ba-contrast-panel--positive flex h-full flex-col">
            <h3 className="m-0 text-lg font-bold text-[#f0f6ff]">Software-gestützter Workflow mit Gefahrstoff-QR</h3>
            <ul className="m-0 mt-4 list-none space-y-3 p-0 text-sm leading-relaxed text-[#c8d4e6]" role="list">
              <li className="flex gap-2">
                <span className="shrink-0 text-[#2dd4bf]" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold text-[#f0f6ff]">Automatisierter SDB-Import:</strong> Relevante
                  Textbausteine aus Ihrem {substance}-PDF werden als Entwurf vorstrukturiert
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-[#2dd4bf]" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold text-[#f0f6ff]">Klare SiFa-Vorprüfung:</strong> Strukturierte
                  Oberfläche zur Kontrolle, betrieblichen Anpassung und Dokumentation vor der Freigabe
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-[#2dd4bf]" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold text-[#f0f6ff]">Verknüpftes Verzeichnis:</strong> Daten aus dem SDB
                  lassen sich direkt für das Gefahrstoffverzeichnis nach § 6 GefStoffV nutzen
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-[#2dd4bf]" aria-hidden="true">
                  ✓
                </span>
                <span>
                  <strong className="font-semibold text-[#f0f6ff]">Optionale QR-Bereitstellung:</strong> Freigegebene
                  Dokumente können per QR-Code am Arbeitsplatz oder Gebinde abrufbar gemacht werden
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
