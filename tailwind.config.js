/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Green & Earth (Nature First) Theme
        primary: '#2D6A4F',      // Forest Green
        secondary: '#936639',     // Soil Brown
        accent: '#A7C957',       // Leafy Light Green
        background: '#FAF9F6',   // Off-White
        text: '#2C2C2C',         // Charcoal
        // Additional shades for better design flexibility
        'primary-light': '#52B788',
        'primary-dark': '#1B4332',
        'secondary-light': '#B08D57',
        'secondary-dark': '#6F4E37',
        'accent-light': '#D4E09B',
        'accent-dark': '#8FBC8F',
      },
      animation: {
        'pop-up': 'popUp 0.3s ease-out forwards',
      },
      keyframes: {
        popUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};