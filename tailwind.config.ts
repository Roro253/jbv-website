import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx,json}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#b7d6ff",
          300: "#8bb8ff",
          400: "#5b95ff",
          500: "#2f72ff",
          600: "#1f5ae6",
          700: "#1948b4",
          800: "#163e92",
          900: "#132f6b"
        }
      },
      fontFamily: {
        display: ["var(--font-inter)"],
        sans: ["var(--font-inter)"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};
export default config;
