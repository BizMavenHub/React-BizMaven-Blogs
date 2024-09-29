/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],

  theme: {
    extend: {},

    screens: {
      sm: "320px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      ubuntu: ["Ubuntu", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
      robotoMono: ["Roboto Mono", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
      quicksand: ["Quicksand", "sans-serif"],
      rubik: ["Rubik", "sans-serif"],
      notoSans: ["Noto Sans", "sans-serif"],
      notoSansDisplay: ["Noto Sans Display", "sans-serif"],
      notoSansJP: ["Noto Sans JP", "sans-serif"],
      notoSansKR: ["Noto Sans KR", "sans-serif"],
      notoSansSC: ["Noto Sans SC", "sans-serif"],
      notoSansTC: ["Noto Sans TC", "sans-serif"],
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
