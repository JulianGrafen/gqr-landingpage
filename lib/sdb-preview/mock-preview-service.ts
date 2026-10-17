import type { SdbPreviewPostResponse } from '@/lib/sdb-preview/api-contract';
import { buildMockTeaserForExample } from '@/config/sdb-preview-examples';
import type { SdbPreviewExampleId } from '@/lib/sdb-preview/api-contract';

export type MockPreviewInput =
  | { kind: 'example'; exampleId: SdbPreviewExampleId }
  | { kind: 'file'; fileName: string };

function newToken(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `preview-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function runMockPreview(input: MockPreviewInput): Promise<SdbPreviewPostResponse> {
  const previewToken = newToken();

  if (input.kind === 'example') {
    return { ok: true, teaser: buildMockTeaserForExample(input.exampleId, previewToken) };
  }

  return {
    ok: true,
    teaser: buildMockTeaserForExample('bremsenreiniger', previewToken),
  };
}
