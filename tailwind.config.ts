import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        masjid: {
          green: '#059669',
          dark: '#064e3b',
          gold: '#d97706',
          cream: '#fef3c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'islamic-pattern': "url('/images/pattern.svg')",
        'hero-gradient': 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #047857 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
