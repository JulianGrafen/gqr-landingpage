import { createRoot } from 'react-dom/client';
import { SdbLivePreviewDropzone } from '../components/sdb-preview/SdbLivePreviewDropzone';
import type { SdbPreviewExampleId } from '../lib/sdb-preview/api-contract';

function parseExampleIds(raw: string | undefined): SdbPreviewExampleId[] | undefined {
  if (!raw?.trim()) return undefined;
  const ids = raw.split(',').map((part) => part.trim()) as SdbPreviewExampleId[];
  return ids.length ? ids : undefined;
}

function mountSdbLivePreview() {
  document.querySelectorAll<HTMLElement>('[data-sdb-live-preview]').forEach((el) => {
    if (el.dataset.sdbLivePreviewMounted === 'true') return;
    el.dataset.sdbLivePreviewMounted = 'true';
    const root = createRoot(el);
    const exampleIds = parseExampleIds(el.dataset.sdbExampleIds);
    root.render(<SdbLivePreviewDropzone variant="static" exampleIds={exampleIds} />);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountSdbLivePreview);
} else {
  mountSdbLivePreview();
}
