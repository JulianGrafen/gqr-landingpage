import { createRoot } from 'react-dom/client';
import { SdbLivePreviewDropzone } from '../components/sdb-preview/SdbLivePreviewDropzone';

function mountSdbLivePreview() {
  document.querySelectorAll<HTMLElement>('[data-sdb-live-preview]').forEach((el) => {
    if (el.dataset.sdbLivePreviewMounted === 'true') return;
    el.dataset.sdbLivePreviewMounted = 'true';
    const root = createRoot(el);
    root.render(<SdbLivePreviewDropzone variant="static" />);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountSdbLivePreview);
} else {
  mountSdbLivePreview();
}
