/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        vietnam: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        display: ['Montserrat', '"Be Vietnam Pro"', 'sans-serif']
      },
      colors: {
        flag: {
          red: '#DA251D',
          yellow: '#FFCD00',
          cream: '#FFF8F5',
          dark: '#181818',
          gray: '#666666'
        }
      },
      boxShadow: {
        glow: '0 24px 70px rgba(218, 37, 29, 0.24)',
        gold: '0 18px 50px rgba(255, 205, 0, 0.20)'
      },
      maxWidth: {
        content: '1320px'
      }
    }
  },
  plugins: []
};
