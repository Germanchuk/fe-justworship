import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";
import tailwindTypography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "card-orange": "#fff7ed",
      "card-orange-border": "#fdba74",
      "base-700": "#3f3f46",
      "create-base": "#e0f2fe",
      "delete-base": "#fecaca",
      "delete-content": "#450a0a",
      "error": "#b91c1c",
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          ...themes.light,
          primary: "#b91c1c",
          secondary: "#f6d860",
          "neutral-content": "#71717a",
          accent: "#4ade80",
          "base-100": "#fff",
          "base-200": "#f4f4f5",
          "base-300": "#d4d4d8",
          "base-content": "#09090b",
        },
      },
    ],
  },
  plugins: [tailwindTypography, daisyui],
};
