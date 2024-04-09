/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      mobile: { min: "320px", max: "767px" },
      // => @media (min-width: 320px and max-width: 639px) { ... }

      tablet: { min: "768px", max: "1279px" },
      // => @media (min-width: 640px and max-width: 1279px) { ... }

      desktop: { min: "1280px" },
      // => @media (min-width: 1280px ) { ... }
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    colors: {
      "navbar-bg": "#0C359E",
      "content-bg": "#279EFF",
      "navbar-footer-bg": "#1D24CA",
      "navbar-text": "#FBDF07",
      white: "#FFFFFF",
      black: "#000000",
      red: "#FF0000",
    },
  },
  plugins: [],
};
