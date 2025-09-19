/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#fdfaf5',   // Fond très clair
          100: '#f7f1e6',  // Partie image
          300: '#e0cda9',  // Bouton et focus léger
          400: '#d4b27c',  // Hover bouton
          700: '#a67c52',  // Texte titre
        }
      }
    },
  },
  plugins: [],
}
