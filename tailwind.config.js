/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ice-pink': {
          50: '#FFF5F7',
          100: '#FFE8EF',
          500: '#FF69B4',
          600: '#FF1493',
        },
      },
    },
  },
  plugins: [],
};