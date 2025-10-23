/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FFF',
        'primary-dark': '#4A3FE8',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        oneup: {
          "primary": "#5B4FFF",
          "secondary": "#F3F4F6",
          "accent": "#10B981",
          "neutral": "#1F2937",
          "base-100": "#FFFFFF",
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
}