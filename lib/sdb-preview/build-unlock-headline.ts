import { SDB_UNLOCK_RESULT_COPY } from '@/config/sdb-preview/unlock-result-copy';

const FALLBACK_TRADE_NAMES = new Set(['', '—', 'unbenannter stoff']);

export function isUsableProductName(tradeName: string | null | undefined): boolean {
  const trimmed = tradeName?.trim() ?? '';
  return trimmed.length > 0 && !FALLBACK_TRADE_NAMES.has(trimmed.toLowerCase());
}

export function buildUnlockHeadline(productName: string | null | undefined): string {
  if (!isUsableProductName(productName)) {
    return SDB_UNLOCK_RESULT_COPY.headlineFallback;
  }
  return SDB_UNLOCK_RESULT_COPY.headlineForProduct(productName!.trim());
}

export function buildSuccessBadgeLabel(sourceLabel: string | null | undefined): string {
  const trimmed = sourceLabel?.trim();
  if (!trimmed) return SDB_UNLOCK_RESULT_COPY.successBadgeFallback;
  return SDB_UNLOCK_RESULT_COPY.successBadgeFrom(trimmed);
}
