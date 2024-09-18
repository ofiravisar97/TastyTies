/** @type {import('tailwindcss').Config} */
import fluid, { extract } from "fluid-tailwind";

export default {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    extend: {
      colors: {
        background: "#dedede",
        primary: "#CA054D",
        accent: "#EF8094",
        borderColor: "#ececec",
      },
    },
  },
  plugins: [fluid],
};
