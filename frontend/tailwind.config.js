/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF', // Синій колір з оригінального сайту
        secondary: '#28a745', // Зелений колір кнопок
      }
    },
  },
  plugins: [],
}