import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light theme
        light: {
          bg: "#F4F5FB",
          card: "#FFFFFF",
          text: {
            primary: "#111827",
            secondary: "#4B5563",
          },
          sidebar: "#0F172A",
        },
        // Dark theme
        dark: {
          bg: "#050816",
          card: "#0B1120",
          border: "#1E293B",
          text: {
            primary: "#E5E7EB",
            secondary: "#9CA3AF",
          },
          sidebar: "#020617",
        },
        // Brand colors
        primary: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        ai: {
          50: "#FDF4FF",
          100: "#FAE8FF",
          200: "#F5D0FE",
          300: "#F0ABFC",
          400: "#E879F9",
          500: "#EC4899",
          600: "#D946EF",
          700: "#A855F7",
          800: "#9333EA",
          900: "#7E22CE",
        },
        // Social network colors
        social: {
          instagram: "#E4405F",
          facebook: "#1877F2",
          linkedin: "#0A66C2",
          x: "#000000",
          tiktok: "#000000",
          youtube: "#FF0000",
          google: "#4285F4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "dark-card": "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
