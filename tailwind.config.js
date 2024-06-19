/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C3E50",
        secondary: "#27AE60",
        background: "#FFFFFF",
        bg_onboarding: "#2C3E50",
        text_primary: "#34495E",
        text_secondary: "#7F8C8D",
        success: "#2ECC71",
        warning: "#E67E22",
        red_error: "#E74C3C",
        link: "#3498DB"
      }
    },
  },
  plugins: [],
}

