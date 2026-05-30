/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 0 15px rgba(139, 92, 246, 0.15)',
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.2)',
      }
    },
  },
  plugins: [],
}
