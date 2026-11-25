import type { ReactNode } from 'react';
import type { TrustBadge, TrustBadgeId } from '@/config/trust-badges';

type SecurityTrustBadgeListProps = {
  badges: readonly TrustBadge[];
  className?: string;
};

/** Gemeinsamer Rahmen der Linien-Icons (teal, 1.65er Strich, wie Footer / Silo-Hero). */
function OutlineTrustIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="h-7 w-7 flex-shrink-0 text-teal-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function GermanFlagIcon() {
  return (
    <svg
      className="h-7 w-9 flex-shrink-0 overflow-visible rounded-md border border-white/20 shadow-sm"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 16"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="16" rx="1.5" fill="#1a1a1a" />
      <rect width="24" height="5.33" y="5.33" fill="#dd0000" />
      <rect width="24" height="5.34" y="10.66" fill="#ffce00" />
    </svg>
  );
}

const OUTLINE_ICON_PATHS: Record<Exclude<TrustBadgeId, 'made-in-germany'>, ReactNode> = {
  hosting: (
    <>
      <path d="M12 3 4 6v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" />
      <path d="m9.5 12.5 2 2 3.5-3.5" />
    </>
  ),
  avv: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5" />
      <path d="m9 14.5 2 2 4-4" />
    </>
  ),
  regelwerk: (
    <>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19.5A2 2 0 0 0 6 21h13" />
      <path d="M9 8h6" />
      <path d="M9 12h4" />
    </>
  ),
  'no-credit-card': (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19" />
      <path d="m3 3 18 18" />
    </>
  ),
  ssl: (
    <>
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M12 16v2" />
    </>
  ),
};

function TrustBadgeIcon({ id }: { id: TrustBadgeId }) {
  if (id === 'made-in-germany') return <GermanFlagIcon />;
  return <OutlineTrustIcon>{OUTLINE_ICON_PATHS[id]}</OutlineTrustIcon>;
}

/** Vertrauens-Badges (Hero-Trust-Leiste, Footer). */
export function SecurityTrustBadgeList({ badges, className = '' }: SecurityTrustBadgeListProps) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 ${className}`.trim()}
      role="list"
      aria-label="Vertrauen und Sicherheit"
    >
      {badges.map((badge) => (
        <li key={badge.id} className="flex items-center gap-2.5 text-sm font-medium text-[#8fa4c0]">
          <TrustBadgeIcon id={badge.id} />
          <span>{badge.label}</span>
        </li>
      ))}
    </ul>
  );
}
