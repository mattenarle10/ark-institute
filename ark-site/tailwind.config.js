/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#193a7a',
        accent: '#c80100',
      },
      boxShadow: {
        'glow-primary': '0 0 15px 2px rgba(25, 58, 122, 0.4)',
        'glow-accent': '0 0 15px 2px rgba(200, 1, 0, 0.4)',
        'glow-mixed': '0 0 15px 2px rgba(120, 30, 60, 0.4)',
        'text': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.15)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.2)',
        'primary': '0 2px 4px rgba(25, 58, 122, 0.3)',
        'accent': '0 2px 4px rgba(200, 1, 0, 0.3)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-md': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-primary': {
          textShadow: '0 2px 4px rgba(25, 58, 122, 0.3)',
        },
        '.text-shadow-accent': {
          textShadow: '0 2px 4px rgba(200, 1, 0, 0.3)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
