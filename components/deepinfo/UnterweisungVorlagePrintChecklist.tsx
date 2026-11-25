/**
 * Druckbare HTML-Checkliste für die Gefahrstoffunterweisung (ohne Stoffdaten).
 */
export function UnterweisungVorlagePrintChecklist() {
  const rows: { id: string; label: string }[] = [
    { id: 'anlass', label: 'Anlass (Neueinstellung, neuer Stoff, neue Tätigkeit, Beinaheunfall)' },
    { id: 'teilnehmer', label: 'Teilnehmer (Name, Abteilung, Tätigkeit am Arbeitsplatz)' },
    { id: 'stoff-bezug', label: 'Bezug: Gefahrstoffverzeichnis und Betriebsanweisung (Stand, Version)' },
    { id: 'gefaehrdungen', label: 'Gefährdungen und Schutzmaßnahmen am konkreten Arbeitsplatz' },
    { id: 'verhalten', label: 'Sicheres Verhalten, Notfall und Erste Hilfe (betriebsintern)' },
    { id: 'psa', label: 'Persönliche Schutzausrüstung und Gebrauch vor Ort' },
    { id: 'fragen', label: 'Fragen der Teilnehmenden und Antworten' },
    { id: 'dokumentation', label: 'Dokumentation: Datum, Ort, Unterweisende Person, Themen kurz' },
    { id: 'unterschrift', label: 'Unterschrift Unterweisende und Teilnehmende (oder gleichwertiger Nachweis)' },
    { id: 'wiederholung', label: 'Nächster Termin (Wiederholung mindestens jährlich, bei Bedarf früher)' },
  ];

  return (
    <div className="gqr-unterweisung-print" id="unterweisung-vorlage-checkliste">
      <p className="text-sm text-[#8fa4c0]">
        Struktur für Ihre Unterweisung zur fachlichen Prüfung durch die SiFa bzw. den Arbeitgeber (§ 14
        GefStoffV, TRGS 555). Felder im Browser ausfüllen oder ausdrucken.
      </p>
      <ul className="gqr-unterweisung-print__list mt-6 list-none space-y-0 p-0">
        {rows.map((row) => (
          <li key={row.id} className="gqr-unterweisung-print__row">
            <label className="gqr-unterweisung-print__label" htmlFor={row.id}>
              <input type="checkbox" className="gqr-unterweisung-print__box" id={row.id} name={row.id} />
              <span>{row.label}</span>
            </label>
            <div className="gqr-unterweisung-print__notes" aria-hidden="true" />
          </li>
        ))}
      </ul>
      <p className="gqr-unterweisung-print__hint mt-4 text-xs text-[#8fa4c0]">
        Unterweisung mündlich und am Arbeitsplatz durchführen. Diese Vorlage ersetzt keine Gefährdungsbeurteilung.
      </p>
    </div>
  );
}