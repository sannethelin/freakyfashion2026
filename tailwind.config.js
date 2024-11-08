/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Verdana", "'Segoe UI'", "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [],
};
