import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  prefix: "tw-",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        medium: "0.625rem",
      },
      colors: {
        purple: {
          "1": "#A54AFF",
        },
        cinza: {
          "1": "D9D9D9",
        },
        error: {
          main: "#DA1E28",
        },
      },
      screens: {
        "-2xl": { max: "1535px" },
        // => @media (max-width: 1600px) { ... }
        "-xl": { max: "1279px" },
        // => @media (max-width: 1400px) { ... }
        "-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }
        "-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }
        "-sm": { max: "639px" },
        // => @media (max-width: 639px) { ... }
        "-xs": { max: "370px" },
        // => @media (max-width: 420px) { ... }
        "-xxs": { max: "329px" },
        // => @media (max-width: 330px) { ... }
      },
      fontFamily: {
        inter: "var(--font-inter)",
      },
      fontSize: {
        h1: "2.5rem",
        h2: "2.0rem",
        h3: "1.7rem",
        h4: "1.5rem",
        h5: "1.2rem",
        h6: "0.9rem",
        body1: "0.8rem",
        body2: "0.7rem",
      },
      outlineOffset: {
        half: "0.5px",
        "negative-half": "-0.5px",
      },
      boxShadow: {
        input: "0px 4.003px 4.003px 0px rgba(0, 0, 0, 0.25)",
      },
      dropShadow: {
        "default-1": "0 0 4px rgba(0,0,0,0.085)",
      },
      backgroundImage: {},
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
