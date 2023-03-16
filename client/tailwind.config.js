/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1024px",
      lg: "1200px",
      xl: "1700px",
    },
    // colors: {
    //   'purple': '#A259FF',
    //   'darkgray': '#2B2B2B',
    //   'mdgray': '#3B3B3B',
    // }
  },
  plugins: [],
}
