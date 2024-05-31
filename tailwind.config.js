/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': "#0A0C56", // Ensure the color value is a string with quotes
        'secondary': "#62629D", // Ensure the color value is a string with quotes
      },
      fontFamily: {
        'inter': ["Inter","sans-serif"], // Ensure the font family names are arrays
        'montserrat': ["Montserrat","sans-serif"],
      }
    },
  },
  plugins: [],
};
