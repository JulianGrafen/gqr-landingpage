import { SDB_PREVIEW_EXAMPLES } from '@/config/sdb-preview-examples';
import type { SdbPreviewSource } from '@/lib/sdb-preview/api-contract';

export function resolvePreviewSourceLabel(source: SdbPreviewSource | null): string | null {
  if (!source) return null;
  if (source.kind === 'upload') return source.fileName;
  if (source.kind === 'demo') return source.label.trim() || 'Beispiel-SDB';
  const example = SDB_PREVIEW_EXAMPLES.find((entry) => entry.id === source.exampleId);
  return example?.label ?? 'Beispiel-SDB';
}
