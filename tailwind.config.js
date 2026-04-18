/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A3D62',
          light: '#145A8D',
          dark: '#052A45',
        },
        accent: {
          DEFAULT: '#00C9D8',
          glow: 'rgba(0, 201, 216, 0.5)',
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 201, 216, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 201, 216, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
