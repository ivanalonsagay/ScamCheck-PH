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
    },
  },

  plugins: [],
};