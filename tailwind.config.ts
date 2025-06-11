import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'custom': '1.33',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "oslo-grey": {
          500: "#8d929a",
        },
        mirage: {
          500: "#101828",
        },
        porcelain: {
          500: "#f2f4f7",
        },
        button: {
          500: "#3470ff",
        },
        "button-hover": {
          500: "#0b44cd",
        },
        inputs: "var(--inputs)",
        main: "var(--main)",
        "gray-light": "var(--gray-light)",
      },
    },
  },
  plugins: [],
} satisfies Config;
