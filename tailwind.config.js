/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      kanjiSerif: ["Noto Serif JP"],
      kanjiSans: ["Noto Sans JP"]
    },
    extend: {
      transitionProperty: {
          'width': 'width',
          'height': 'height'
      },
      colors: {
        primary: colors.zinc
      }
    }
  },
  plugins: [],
  darkMode: "class"
}

