/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ejs,js}"],
  theme: {
    extend: {
      fontFamily: {
        "MuseoModerno": ["MuseoModerno", "serif"]
      }
    },
  },
  plugins: [],
}