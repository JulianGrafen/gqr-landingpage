export type FeatureShowcaseItem = {
  number: string;
  heading: string;
  title: string;
  description: string;
  href: string;
  iconHtml: string;
};

export function parseFeatureShowcaseFromGrid(grid: Element): FeatureShowcaseItem[] {
  return Array.from(grid.querySelectorAll('.sds-entry-card')).map((card, index) => {
    const number =
      card.querySelector('.sds-entry-card__number')?.textContent?.trim() ??
      String(index + 1).padStart(2, '0');
    const heading = card.querySelector('.sds-entry-card__heading')?.textContent?.trim() ?? '';
    const title = card.querySelector('.sds-entry-card__title')?.textContent?.trim() ?? '';
    const description = card.querySelector('.sds-entry-card__body p')?.textContent?.trim() ?? '';
    const link = card.querySelector('.sds-entry-card__body a') as HTMLAnchorElement | null;
    const iconHtml = card.querySelector('.sds-entry-card__feature-icon')?.innerHTML ?? '';

    return {
      number,
      heading,
      title,
      description,
      href: link?.getAttribute('href') ?? '#',
      iconHtml,
    };
  });
}

export function getDefaultOpenIndex(grid: Element): number {
  const cards = Array.from(grid.querySelectorAll('.sds-entry-card'));
  const openIndex = cards.findIndex((card) => card.hasAttribute('open'));
  return openIndex >= 0 ? openIndex : 0;
}
