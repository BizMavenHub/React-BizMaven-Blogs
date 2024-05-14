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
      // => @media (min-width: 1280px and max-width: 1919px ) { ... }
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    fontSize: {
      h1: "48px",
      h2: "36px",
      h3: "24px",
      h4: "18px",
      h5: "16px",
      h6: "14px",
      p: "16px",
    },
  },

  plugins: [],
};
