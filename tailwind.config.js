import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";
import tailwindTypography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          ...themes.light,
          "primary": "#D62839",
          "secondary": "#f6d860",
          "accent": "#f3eed9",
        },
      }
    ]
  },
  plugins: [tailwindTypography, daisyui],
};
