/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      animation: {
        'fade-slide': 'fadeSlideUp 1.5s ease-in-out forwards',
        fadeSlideUp: 'fadeSlideUp 1.5s ease-in-out forwards', // this line is technically a duplicate name, can be removed
      },
      keyframes: {
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      width: {
        'underline-sm': '6rem',
        'underline-md': '8rem',
        'underline-lg': '10rem',
      },
    },
  },
  plugins: [],
};
