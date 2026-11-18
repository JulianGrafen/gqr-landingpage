import { Glasses, Hand, Shirt, Wind, type LucideIcon } from 'lucide-react';
import type { ProtectiveEquipmentId } from '@/lib/sdb-preview/api-contract';

const PROTECTIVE_EQUIPMENT_DISPLAY: Record<ProtectiveEquipmentId, { label: string; Icon: LucideIcon }> = {
  eye_protection: { label: 'Augenschutz', Icon: Glasses },
  hand_protection: { label: 'Handschutz', Icon: Hand },
  respiratory_protection: { label: 'Atemschutz', Icon: Wind },
  protective_clothing: { label: 'Schutzkleidung', Icon: Shirt },
};

type Props = {
  items: readonly ProtectiveEquipmentId[];
};

/** Blaue Gebotszeichen-Kreise (angelehnt an ISO 7010 M-Zeichen) wie im DIN-A4-Muster. */
export function BaProtectiveEquipmentIcons({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0 sm:justify-start" aria-label="Persönliche Schutzausrüstung">
      {items.map((id) => {
        const { label, Icon } = PROTECTIVE_EQUIPMENT_DISPLAY[id];
        return (
          <li key={id} className="m-0 flex w-16 flex-col items-center gap-1 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1e5aa8] text-white shadow-sm">
              <Icon className="h-6 w-6" strokeWidth={2.25} aria-hidden />
            </span>
            <span className="text-[10px] font-semibold leading-tight text-slate-600">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
