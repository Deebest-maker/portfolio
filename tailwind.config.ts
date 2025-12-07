import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "electric-blue": "#0EA5E9",
        "toxic-green": "#22C55E",
        "dark-bg": "#0A0E27",
        "dark-card": "#151933",
      },
    },
  },
  plugins: [],
};

export default config;
