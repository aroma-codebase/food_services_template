/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea6c0a',
          700: '#c2570a',
          800: '#9a3c07',
          900: '#7c2d12',
          950: '#431407',
        },
        cream: '#FFF8E7',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      /* Custom keyframes */
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(249,115,22,0.3)' },
          '50%':       { borderColor: 'rgba(249,115,22,0.8)' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        shimmer:        'shimmer 2.5s linear infinite',
        floatUp:        'floatUp 3s ease-in-out infinite',
        fadeInUp:       'fadeInUp 0.5s ease-out forwards',
        scaleIn:        'scaleIn 0.3s ease-out forwards',
        borderPulse:    'borderPulse 2s ease-in-out infinite',
        gradientShift:  'gradientShift 4s ease infinite',
      },
      /* Extended box shadows */
      boxShadow: {
        'orange-sm':  '0 2px 8px rgba(249,115,22,0.2)',
        'orange-md':  '0 8px 25px rgba(249,115,22,0.3)',
        'orange-lg':  '0 16px 50px rgba(249,115,22,0.4)',
        'glow-sm':    '0 0 15px rgba(249,115,22,0.3)',
        'glow-md':    '0 0 30px rgba(249,115,22,0.4)',
      },
      /* Extended transition durations */
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
