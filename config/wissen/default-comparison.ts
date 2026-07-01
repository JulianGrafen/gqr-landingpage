import type { DeepinfoComparisonRow } from '@/lib/wissen/types';

/** Standard-Vergleich Excel/Papier vs. GQR — in MDX per `comparison.rows` überschreibbar. */
export const DEFAULT_MANUAL_VS_GQR_ROWS: DeepinfoComparisonRow[] = [
 {
 criterion: 'Daten aus dem Sicherheitsdatenblatt erfassen',
 manual: 'Manuelles Abtippen aus PDF — fehleranfällig und zeitintensiv',
 gqr: 'KI extrahiert H-/P-Sätze, LGK und Schutzmaßnahmen automatisch',
 },
 {
 criterion: 'Aktualität & Revisionen',
 manual: 'Versionen per E-Mail/Ordner — kein klarer Revisionsverlauf',
 gqr: 'Änderungen revisionssicher mit Zeitstempel und Historie',
 },
 {
 criterion: 'Zusammenlagerung (TRGS 510)',
 manual: 'Matrix manuell prüfen — leicht übersehene Konflikte',
 gqr: 'Lagerklassen-Check und Warnungen im Verzeichnis',
 },
 {
 criterion: 'Audit & Behörden',
 manual: 'Excel-Export ohne Nachweis der Datenherkunft',
 gqr: 'Export mit Sicherheitsdatenblatt-Bezug und nachvollziehbarer Dokumentation',
 },
 {
 criterion: 'Skalierung im Betrieb',
 manual: 'Ab ~15–20 Stoffen wird Pflege zum Vollzeitjob',
 gqr: 'Neue Stoffe in Minuten statt Stunden — auch mobil',
 },
];

export const DEFAULT_COMPARISON_TITLES = {
 leftColumnTitle: 'Excel / Papier',
 rightColumnTitle: 'Gefahrstoff-QR (GQR)',
} as const;
