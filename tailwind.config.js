/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          bg:      '#f5f0eb',
          surface: '#ede6dc',
          border:  '#d4c9b8',
          text:    '#2e2a24',
          muted:   '#7a6e61',
          dark:    '#1c1814',
        },
        accent: {
          DEFAULT: '#c97a3a',
          lt:      '#e8a96a',
        },
      },
      boxShadow: {
        'glow-accent':    '0 0 14px rgba(201,122,58,0.55), 0 0 28px rgba(201,122,58,0.28)',
        'glow-accent-sm': '0 0 8px rgba(201,122,58,0.50), 0 0 16px rgba(201,122,58,0.25)',
      },
      fontFamily: {
        sans:    ['Arsenal SC', 'sans-serif'],
        primary: ['Arsenal SC', 'sans-serif'],
        accent:  ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%':      { transform: 'translateX(6px)' },
        },
      },
      animation: {
        marquee:      'marquee 18s linear infinite',
        'fade-in':    'fadeIn 0.7s ease both',
        'fade-up':    'fadeUp 0.7s ease both',
        'fade-left':  'fadeLeft 0.7s ease both',
        'fade-up-2':  'fadeUp 0.7s 0.15s ease both',
        'fade-up-3':  'fadeUp 0.7s 0.3s ease both',
        'fade-up-4':  'fadeUp 0.7s 0.45s ease both',
        'fade-up-5':  'fadeUp 0.7s 0.6s ease both',
        'bounce-x':   'bounceX 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}