/**
 * Rendert die CRO-Bausteine aus `config/blog-cro/` in statische Blog-Artikel.
 * Marker im HTML: `<!--AEO:ARTICLE_CRO_<BLOCK>-->…<!--/AEO:ARTICLE_CRO_<BLOCK>-->`.
 * Ist ein Block konfiguriert, aber der Marker fehlt, bricht das Skript ab.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ArticleCtaBanner } from '@/components/blog-cro/ArticleCtaBanner';
import { ExcelVsQrComparison } from '@/components/blog-cro/ExcelVsQrComparison';
import { ProductScreenshotGallery } from '@/components/blog-cro/ProductScreenshotGallery';
import { SdbOutputPreviewCard } from '@/components/blog-cro/SdbOutputPreviewCard';
import { ARTICLE_CRO_PAGES } from '@/config/blog-cro';
import type { ArticleCroPage } from '@/config/blog-cro/types';
import { replaceMarkedBlocks, type MarkedBlockRenderers } from '@/lib/static-html/replace-marked-blocks';

const ROOT = process.cwd();

function blockElements(page: ArticleCroPage): Record<string, ReactElement | null> {
  return {
    ARTICLE_CRO_TOP: page.topCallout ? <ArticleCtaBanner copy={page.topCallout} variant="callout" /> : null,
    ARTICLE_CRO_COMPARISON: page.comparison ? <ExcelVsQrComparison copy={page.comparison} /> : null,
    ARTICLE_CRO_OUTPUT_PREVIEW: page.outputPreview ? <SdbOutputPreviewCard copy={page.outputPreview} /> : null,
    ARTICLE_CRO_SCREENSHOTS: page.screenshots ? <ProductScreenshotGallery items={page.screenshots} /> : null,
    ARTICLE_CRO_CLOSING: page.closingCta ? <ArticleCtaBanner copy={page.closingCta} variant="closing" /> : null,
  };
}

for (const page of ARTICLE_CRO_PAGES) {
  const file = path.join(ROOT, page.sourcePath, 'index.html');
  if (!fs.existsSync(file)) throw new Error(`sync-blog-article-cro: ${file} existiert nicht.`);

  const renderers: MarkedBlockRenderers = {};
  for (const [marker, element] of Object.entries(blockElements(page))) {
    if (element) renderers[marker] = () => renderToStaticMarkup(element);
  }

  fs.writeFileSync(file, replaceMarkedBlocks(fs.readFileSync(file, 'utf8'), renderers), 'utf8');
  console.log(`✓ Artikel-CRO → ${page.sourcePath} (${Object.keys(renderers).join(', ')})`);
}
