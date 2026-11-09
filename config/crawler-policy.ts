/**
 * Crawler-Richtlinie für robots.txt (app/robots.ts).
 *
 * Wichtig: Ein benannter User-agent-Block ersetzt für diesen Bot die `*`-Regeln vollständig.
 * Deshalb erhält jeder benannte Bot dieselben Allow-/Disallow-Pfade wie der Wildcard-Block.
 */

/** Suchmaschinen- und KI-Bots, die explizit auf alle öffentlichen Marketing- und SEO-Seiten dürfen. */
export const ALLOWED_SEARCH_AND_AI_CRAWLERS = [
  // Klassische Suche (speist Google AI Overviews und Copilot)
  'Googlebot',
  'Bingbot',
  // ChatGPT Search und nutzerausgelöster Abruf
  'OAI-SearchBot',
  'ChatGPT-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Claude
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Produkt-Steuerungstokens (Gemini- und Apple-Intelligence-Nutzung bereits gecrawlter Inhalte)
  'Applebot-Extended',
  'Google-Extended',
] as const;

/**
 * Nicht-öffentliche Pfade. Die App selbst läuft auf app.gefahrstoff-qr.de (eigene robots.txt);
 * diese Einträge sichern die Marketing-Domain zusätzlich ab.
 */
export const DISALLOWED_PRIVATE_PATHS = ['/dashboard', '/api/', '/settings', '/register'] as const;

export const SITEMAP_PATH = '/sitemap.xml';
