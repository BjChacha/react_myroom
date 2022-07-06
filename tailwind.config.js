/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem'
      },
    },
  },
  plugins: [],
}
