/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    colors: {
      background: '#001e1d',
      backgroundLight: '#004643',
      highlight: '#f9bc60',
      paragraph: '#abd1c6',
      buttonText: '#001e1d',
      buttonHover: '',
      main: '#e8e4e6',
      secondary: '#abd1c6',
      attention: '#e16162'
    },
    screens: {
      'mobile': {'max': '1100px'},
    },
    fontFamily: {
      noto: ['Noto Sans', 'sans-serif'],
      open: ['Open Sans', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        login: "url('/assets/login-background.svg')",
        loginmobile: "url('/assets/login-background-mobile.svg')"
      },
    },
  },
  plugins: [],
}

