/** @type {import('tailwindcss').Config} */
module.exports = {
 darkMode: ["class"],
 content: [
  "./pages/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./app/**/*.{js,jsx}",
  "./src/**/*.{js,jsx}",
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
   colors: {
    primary: "#fff",
    primaryDark: "#1E1E1E",

    secondary: "#F8F8F8",
    secondaryDark: "#252525",

    tertiary: "#ECF1FE",
    tertiaryDark: "#353535",

    textPrimary: "#191919",
    textSecondary: "#f3f3f3",
   },
  },
  plugins: [require("tailwindcss-animate")],
 },
}
