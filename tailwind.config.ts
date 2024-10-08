import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "10m": "1059px",
        "9m": "930px",
        "8m": "830px",
        "7m": "730px",
        "6m": "630px",
        "5m": "500px",
        "4m": "430px",
        "3m": "330px",
        "1m": "1100px",
        "14m": "1430px",
        "2m": "230px",
      },
      colors: {
        ornge: "#FF6314",
        gry: "#F4F4F4",
        black: "#0D0E13",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        satoshi: "var(--satoshi-font)",
        swearDisplay: "var(--swear-display-font)",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 8s linear infinite",
      },
      transitionTimingFunction: {
        slow: "cubic-bezier(.405, 0, .025, 1)",
        "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
