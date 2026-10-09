/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main theme — teal. Replaces the old blue "primary" scale.
        // Every existing primary-* class (Student dashboard, etc.) now
        // resolves to teal automatically — no need to touch those files.
        primary: {
          50: '#EAF6F5',
          100: '#D2EBE9',
          200: '#A8D8D4',
          300: '#7EC5BF',
          400: '#54B2AA',
          500: '#2E8F86',
          600: '#25746D',
          700: '#1F6359',
          800: '#174A42',
          900: '#0F312B',
        },
        // Secondary/accent — warm gold, used sparingly for highlights
        // (badges, tags) now that teal owns the primary brand actions.
        secondary: {
          50: '#FBF4E4',
          100: '#F5E6C2',
          200: '#EBCE8B',
          300: '#E1B65F',
          400: '#D9A02C',
          500: '#C08D26',
          600: '#8A6110',
          700: '#6E4D0D',
          800: '#523A0A',
          900: '#372706',
        },
        // Shared neutrals used across Student/Teacher/Parent pages.
        ink: '#1B1F3B',
        subtle: '#5B6072',
        page: '#FBFAF7',
        panel: '#F3F1EA',
        border: '#E7E4DC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
