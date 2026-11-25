/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Colors are driven by CSS variables in src/index.css so the whole palette
      // can be re-themed without touching component code.
      colors: {
        cream: 'rgb(var(--color-cream) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        blush: 'rgb(var(--color-blush) / <alpha-value>)',
        night: 'rgb(var(--color-night) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 32px -12px rgb(26 19 15 / 0.18)',
        lift: '0 20px 45px -18px rgb(26 19 15 / 0.30)',
      },
      borderRadius: {
        lg: '0.9rem',
        xl: '1.25rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'fade-in': 'fade-in 0.35s ease-out both',
        'slide-in-right': 'slide-in-right 0.3s ease-out both',
        'slide-in-left': 'slide-in-left 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
