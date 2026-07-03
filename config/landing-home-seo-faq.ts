import type { SeoFaqItem } from '@/lib/seo/seo-faq-types';

/**
 * Homepage FAQPage — SiFa-Schmerzpunkte (§ 6 GefStoffV, TRGS 510).
 * Sync mit index.html (#sifa-faq + JSON-LD im <head>).
 */
export const LANDING_HOME_SEO_FAQ: SeoFaqItem[] = [
  {
    question:
      'Welche Pflichtangaben muss ein digitales Gefahrstoffverzeichnis nach § 6 Abs. 12 GefStoffV enthalten?',
    answer:
      'Nach § 6 Abs. 12 GefStoffV gehören mindestens Stoffbezeichnung, Einstufung (GHS-Gefahrenklassen und -kategorien), verwendete Mengenbereiche, Expositions-Arbeitsbereiche und ein Verweis auf das aktuelle Sicherheitsdatenblatt in das Verzeichnis. In Excel fehlen häufig revisionssichere SDB-Verknüpfungen und Zeitstempel pro Änderung — bei einer Betriebsprüfung reicht ein Tabellenexport oft nicht als Nachweis der Aktualität. Gefahrstoff-QR strukturiert diese Pflichtfelder automatisch aus dem SDB-PDF und führt einen Revisionsverlauf, damit Sie nicht nur wissen, was einzutragen ist, sondern den Nachweis revisionssicher vorlegen können.',
  },
  {
    question:
      'Reicht Excel als Gefahrstoffverzeichnis-Software für die Pflichten nach § 6 GefStoffV?',
    answer:
      'Excel kann Pflichtfelder abbilden, erfüllt aber nicht zuverlässig die laufende Aktualitätspflicht, nachvollziehbare SDB-Versionierung und revisionssichere Änderungsdokumentation — genau die Punkte, die SiFa und Gewerbeaufsicht bei Betriebsprüfungen vertiefen. Ohne automatischen SDB-Import und protokollierte Freigabe durch die SiFa bleibt eine Haftungslücke bestehen, auch wenn die Liste optisch vollständig wirkt. Gefahrstoff-QR digitalisiert den §-6-Workflow: KI-Extraktion aus dem SDB, fachliche Freigabe und exportierbares PDF-Verzeichnis aus derselben Datenbasis — ohne Abtipp-Marathon.',
  },
  {
    question:
      'Wie dokumentiere ich die Zusammenlagerungsprüfung nach TRGS 510 revisionssicher?',
    answer:
      'TRGS 510 verlangt den Abgleich von Lagerklassen (LGK) über eine Zusammenlagerungsmatrix — manuell in Tabellen ein fehleranfälliger Prozess, der bei jeder neuen Charge oder Lagerplatzänderung neu bewertet werden muss. Ein Screenshot oder Excel-Hinweis genügt bei Audits selten als belastbarer Nachweis, welche Kombination zum Prüfzeitpunkt tatsächlich geprüft wurde. Gefahrstoff-QR klassifiziert Stoffe nach LGK und warnt automatisch bei verbotenen oder trennpflichtigen Kombinationen im selben Brandabschnitt — Sie sehen den Konflikt in Ihrem Lager, bevor die Behörde ihn findet.',
  },
  {
    question:
      'Worin erkennt eine Betriebsprüfung, dass unser Gefahrstoffverzeichnis nach § 6 GefStoffV veraltet ist?',
    answer:
      'Prüfer vergleichen Verzeichnisstand, SDB-Versionen und Arbeitsbereichszuordnungen — Abweichungen zwischen Etikett, Lagerort und dokumentiertem Eintrag gelten als Organisationsverschulden. Ordner mit PDFs oder unversionierte Excel-Listen zeigen selten, wer wann welches Feld geändert hat; fehlende Nachweise zu SDB-Aktualisierungen sind ein häufiger Beanstandungsgrund. Gefahrstoff-QR protokolliert Revisionen, fordert SDB-Updates zyklisch an und verknüpft jede Verzeichniszeile mit der gültigen SDB-Version — für die Prüfung exportieren Sie ein revisionssicheres Verzeichnis, ohne den Vortag mit Copy-Paste zu verbringen.',
  },
];
