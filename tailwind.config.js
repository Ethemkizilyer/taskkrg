/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss')


module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spinOnce: {
            '0%': { transform: 'translateY(-100px)' },
            '100%': { transform: 'translateY(0px)' },
        },
    },
    animation: {
        spinOnce: 'spinOnce 1s linear',
    },
    },
  },

}

