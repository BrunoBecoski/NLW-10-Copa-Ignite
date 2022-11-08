/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },

      backgroundImage: {
        app: 'url(/app-bg.png)',
      },

      colors: {
        green: {
          400: '#129E57',
          500: '#047C3F'
        },

        yellow: {
          500: '#F7DD43',
          700: '#E5CD3D',
        },

        red: {
          500: '#DB4437',
          700: '#ED4A3C'
        },

        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
          950: '#09090A',
        }
      }
    }
  },
  plugins: [],
}
