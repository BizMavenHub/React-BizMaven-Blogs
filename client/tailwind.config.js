/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],

  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            h1: {
              fontSize: theme("2.5rem"),
            },
            h2: {
              fontSize: theme("2rem"),
            },
            h3: {
              fontSize: theme("1.2rem"),
            },
            h4: {
              fontSize: theme("1.125rem"),
            },
            h5: {
              fontSize: theme("1rem"),
            },
            h6: {
              fontSize: theme("0.875rem"),
            },
            p: {
              fontSize: theme("1rem"),
            },
            a: {
              color: theme("colors.blue.600"),

              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
            // Add more customizations here
          },
        },
      }),
    },
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

  plugins: [require("@tailwindcss/typography")],
};
