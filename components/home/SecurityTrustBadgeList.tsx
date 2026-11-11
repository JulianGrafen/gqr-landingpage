import type { HOME_HERO } from '@/config/home-sections/hero';

type TrustBadgeId = (typeof HOME_HERO.trustBadges)[number]['id'];

type SecurityTrustBadgeListProps = {
  badges: ReadonlyArray<{ id: TrustBadgeId; label: string }>;
  className?: string;
};

function TrustBadgeIcon({ id }: { id: TrustBadgeId }) {
  if (id === 'hosting') {
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
        <path d="M12 3 4 6v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" />
        <path d="m9.5 12.5 2 2 3.5-3.5" />
      </svg>
    );
  }

  if (id === 'made-in-germany') {
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
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M12 16v2" />
    </svg>
  );
}

/** Hosting-, Herkunfts- und SSL-Badges (1:1 wie Footer / Silo-Hero). */
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
