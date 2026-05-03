/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './loesungen/**/*.html'],
  corePlugins: {
    preflight: false,
    container: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
