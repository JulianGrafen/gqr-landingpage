import { buildLlmsTxt } from '@/lib/aeo/build-llms-txt';
import { PLAIN_TEXT_CONTENT_TYPE, textResponse } from '@/lib/aeo/text-response';

export const dynamic = 'force-static';

/** /llms.txt für KI-Suchmaschinen und RAG-Systeme (statisch exportiert). */
export function GET(): Response {
  return textResponse(buildLlmsTxt(), PLAIN_TEXT_CONTENT_TYPE);
}
