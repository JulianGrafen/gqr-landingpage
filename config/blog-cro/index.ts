/** Registry aller statischen Blog-Artikel mit CRO-Bausteinen (gelesen von `sync-blog-article-cro.tsx`). */
import { REINIGUNG_KATASTER_ARTICLE_CRO } from './reinigung-gefahrstoffkataster';
import type { ArticleCroPage } from './types';

export const ARTICLE_CRO_PAGES: readonly ArticleCroPage[] = [REINIGUNG_KATASTER_ARTICLE_CRO];
