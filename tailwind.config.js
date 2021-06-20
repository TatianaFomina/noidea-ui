const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/components/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      pink: {
        50: '#F9CDD4',
        100: '#F292A1',
        200: '#EE7587',
        300: '#EB586F',
        400: '#EB415B',
        500: '#D14E63'
      },
      blue: {
        50: '#C9E3F2',
        100: '#89C1E4',
        200: '#6EACD2',
        300: '#4AA0D5',
        400: '#1695E3',
        500: '#428EBE'
      },
      sky: {
        50: '#D8E9F0',
        100: '#C0CFD6'
      },
      coal: {
        50: '#C0CFD6',
        100: '#3D3D4A'
      }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
