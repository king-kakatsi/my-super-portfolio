/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Braxton-inspired color palette
        accent: {
          DEFAULT: '#aa70e0',
          light: '#CEC4EF',
          dark: '#8f56cc',
        },
        secondary: {
          DEFAULT: '#7059e2',
          light: '#CEC4EF',
          dark: '#5d4ec4',
        },
        base: {
          DEFAULT: '#111111',
          tint: '#161616',
          shade: '#000000',
        },
        text: {
          bright: '#e9e9f1',
          medium: '#C7C6D3',
          muted: '#A1A1AF',
        },
      },
      fontFamily: {
        sans: ['Syne', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '1.5rem',
        'md': '2.2rem',
        'lg': '3rem',
        'xl': '3.6rem',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.23, 0.65, 0.74, 1.09)',
      },
    },
  },
  plugins: [],
}
