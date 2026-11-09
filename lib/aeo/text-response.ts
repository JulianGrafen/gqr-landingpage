/** MIME-Typen für maschinenlesbare Textrouten (llms.txt, pricing.md). */
export const PLAIN_TEXT_CONTENT_TYPE = 'text/plain; charset=utf-8';
export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8';

export function textResponse(body: string, contentType: string): Response {
  return new Response(body, { headers: { 'Content-Type': contentType } });
}
