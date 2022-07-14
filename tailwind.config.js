module.exports = {
 	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#41B883', // vue green color
          200: '#31a772',
          'black': '#34495E' // vue black color
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
