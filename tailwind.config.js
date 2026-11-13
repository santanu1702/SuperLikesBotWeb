/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: "#2563EB",
        violet: { brand: "#7C3AED" },
        lavender: "#F1F2FF",
        ink: "#111827",
        slate2: "#64748B",
        navy: { 950: "#0B1020", 900: "#0F1630", 800: "#151D3D", 700: "#1E2850" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(37, 99, 235, 0.18)",
        "card-hover": "0 24px 50px -16px rgba(124, 58, 237, 0.35)",
        glow: "0 12px 28px -8px rgba(99, 70, 237, 0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.25)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
