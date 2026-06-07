/** @type {import('tailwindcss').Config} */
export default {
  // Files where Tailwind will scan class names
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        navy: "#061A33",
        primary: "#2563EB",
        soft: "#F8FAFC",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
      keyframes: {
        loader: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(160%)" },
        },
        "feature-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 0.5rem))" },
        },
      },
      animation: {
        loader: "loader 0.8s ease-in-out infinite",
        "feature-marquee": "feature-marquee 32s linear infinite",
      },
    },
  },

  plugins: [],
};
