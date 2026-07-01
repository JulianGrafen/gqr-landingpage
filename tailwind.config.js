/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './gefahrstoffverzeichnis-excel-vorlage/**/*.html',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  corePlugins: {
    preflight: false,
    container: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        gqr: {
          bg: '#0a1628',
          surface: '#0f1e35',
          raised: '#162340',
          text: '#f0f6ff',
          soft: '#c8d4e6',
          muted: '#8fa4c0',
          accent: '#ff6b35',
          'accent-soft': '#ff9a6b',
          trust: '#2dd4bf',
          'trust-dark': '#0d9488',
        },
      },
      boxShadow: {
        gqr: '0 4px 24px rgBetriebsanweisung(0, 0, 0, 0.35)',
        'gqr-hover': '0 12px 40px rgBetriebsanweisung(0, 0, 0, 0.45)',
        'gqr-glow': '0 0 42px rgBetriebsanweisung(255, 115, 70, 0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
