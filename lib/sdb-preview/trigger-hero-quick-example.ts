import { LIVE_DEMO_ANCHOR_ID } from '@/config/home-sections/hero';

/** Scroll zur Dropzone und 1-Klick-Beispiel-SDB (Mobile-Quick-Button oder erstes Beispiel-Chip). */
export function triggerHeroQuickExample(anchorId: string = LIVE_DEMO_ANCHOR_ID): void {
  const root = document.getElementById(anchorId);
  if (!root) return;

  root.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const quickBtn = root.querySelector<HTMLButtonElement>('[data-sdb-mobile-quick-example]');
  if (quickBtn) {
    quickBtn.click();
    return;
  }

  const exampleChip = root.querySelector<HTMLButtonElement>(
    '.sdb-live-preview-examples__btn, [class*="sdb-live-preview-examples"] button',
  );
  exampleChip?.click();
}