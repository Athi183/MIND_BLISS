/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      animation: {

        'fade-slide': 'fadeSlideUp 1.5s ease-in-out forwards',

        fadeSlideUp: 'fadeSlideUp 1.5s ease-in-out forwards',

      },
      keyframes: {
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      width: {
        'underline-sm': '6rem',     // 24px width for small screens
        'underline-md': '8rem',     // 32px width for medium
        'underline-lg': '10rem',    // 40px width for large
      },


    },
  },
  plugins: [],
};
