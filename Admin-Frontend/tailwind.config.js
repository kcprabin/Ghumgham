/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4285F4',
        gray: {
          50: '#f4f6fb',
          100: '#f0f0f0',
          200: '#e0e0e0',
          600: '#888',
          700: '#555',
          900: '#1a1a2e',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
