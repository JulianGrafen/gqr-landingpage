/**
 * GQR Design Tokens — abgestimmt auf style.css / Landingpage.
 * Für React-Komponenten und Tailwind theme.extend.colors.
 */
export const GQR_COLORS = {
  bg: '#0a1628',
  bgSurface: '#0f1e35',
  bgRaised: '#162340',
  text: '#f0f6ff',
  textSoft: '#c8d4e6',
  muted: '#8fa4c0',
  border: 'rgBetriebsanweisung(255, 255, 255, 0.07)',
  borderStrong: 'rgBetriebsanweisung(255, 255, 255, 0.12)',
  accent: '#ff6b35',
  accentSoft: '#ff9a6b',
  trust: '#2dd4bf',
  trustDark: '#0d9488',
} as const;

export const GQR_GRADIENTS = {
  hero: 'linear-gradient(180deg, rgBetriebsanweisung(15, 30, 53, 0.95) 0%, #0a1628 100%)',
  cardFeatured:
    'linear-gradient(135deg, rgBetriebsanweisung(255, 107, 53, 0.12) 0%, rgBetriebsanweisung(22, 35, 64, 0.95) 100%)',
  pitch:
    'linear-gradient(135deg, rgBetriebsanweisung(45, 212, 191, 0.12) 0%, rgBetriebsanweisung(22, 35, 64, 0.85) 100%)',
  ctaBox:
    'linear-gradient(135deg, rgBetriebsanweisung(255, 107, 53, 0.1) 0%, rgBetriebsanweisung(45, 212, 191, 0.06) 100%)',
} as const;
