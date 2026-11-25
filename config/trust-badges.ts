/** Vertrauens-Badges (Hero-Trust-Leiste, Footer). Icons: `SecurityTrustBadgeList`. */
export type TrustBadgeId = 'hosting' | 'avv' | 'regelwerk' | 'no-credit-card' | 'made-in-germany' | 'ssl';

export interface TrustBadge {
  id: TrustBadgeId;
  label: string;
}
