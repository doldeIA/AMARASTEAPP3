// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#A13500',
        accent: '#FF8345',
        'coke-red': '#E41B17',
        gold: '#D4AF37'
      }
    },
  },
  plugins: [],
};
