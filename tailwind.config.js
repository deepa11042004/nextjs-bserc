import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ REQUIRED for shadcn
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // ✅ your custom colors
        primary: {
          DEFAULT: "#00B4FF",
          dark: "#0086CC",
          light: "#33C3FF",
        },
        secondary: {
          DEFAULT: "#FF6B35",
          dark: "#CC5528",
        },
        accent: "#FFD700",
        space: {
          black: "#060810",
          dark: "#0D1117",
          navy: "#0A0F1E",
          mid: "#111827",
          card: "#141C2E",
        },
      },
    },
  },
  plugins: [],
};

export default config;