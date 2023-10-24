/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['"./index.html"', "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'cs-light-gray': '#D9D9D9',
        'cs-soft-gray': '#E3DADA',
        'cs-soft-gray-two': '#898282',
        'cs-gray': '#5C5656',
        'cs-dark-gray':'#1E1E1E',
        'cs-body-gray':'#323232',
        'cs-orange': '#FE6100',
        'cs-light-orange':'#F47D00',
        'cs-red': 'red',
        'cs-flushed': '#DD5050',
        'cs-green': '#46F157'
      },
      screens: {
        xs: '520px',
        sm: '664px',
        md: '850px',
        lg: '1004px',
        xl: '1080px',
        '2xl': '1264px',
        '3xl': '1404px'
      },
    },
  },
  plugins: [],
}

