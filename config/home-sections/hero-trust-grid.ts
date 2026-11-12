/**
 * Hero unter den Sicherheits-Badges: Regelwerk-Leiste (keine Webportal-Logos).
 */

export type HeroRegelwerkBadge = {
  id: string;
  code: string;
  label: string;
};

export const HOME_HERO_REGELWERK = {
  title: 'Konformitäts- & Datenstruktur nach aktuellen Regelwerken',
  ariaLabel: 'Konformitäts- und Datenstruktur nach aktuellen Regelwerken',
  badges: [
    { id: 'gefstoffv-6', code: '§ 6 GefStoffV', label: 'Gefahrstoffverzeichnis' },
    { id: 'trgs-555', code: 'TRGS 555', label: 'Betriebsanweisungen' },
    { id: 'trgs-510', code: 'TRGS 510', label: 'Lagerklassen-Matrix' },
    { id: 'trgs-201-clp', code: 'TRGS 201 / CLP', label: 'Gebindekennzeichnung' },
    { id: 'baua-reach', code: 'BAuA / REACH Art. 31', label: 'SDB-Datenstruktur' },
  ] satisfies readonly HeroRegelwerkBadge[],
} as const;
