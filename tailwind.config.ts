import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          50: '#E8EEF5',
          100: '#C5D2E0',
          200: '#8FA8C2',
          300: '#5A7EA4',
          400: '#2E5486',
          500: '#1C3A68',
          600: '#162F55',
          700: '#112342',
          800: '#0C1A31',
          900: '#070F1E',
          950: '#040C18',
        },
        gold: {
          DEFAULT: '#C9A84C',
          50: '#FAF5EB',
          100: '#F0E4BC',
          200: '#E8D8A0',
          300: '#DEC886',
          400: '#D4B86A',
          500: '#C9A84C',
          600: '#B8882A',
          700: '#9E7422',
          800: '#7A5A1A',
          900: '#5C4312',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          50: '#FDFCF9',
          100: '#F9F5EE',
          200: '#F5F0E8',
          300: '#EDE4D2',
          400: '#E0D3B8',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8D8A0 50%, #C9A84C 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0A1628 0%, #162F55 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(10,22,40,0.5) 0%, rgba(10,22,40,0.8) 100%)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 8px 40px rgba(201, 168, 76, 0.4)',
        'navy': '0 4px 20px rgba(10, 22, 40, 0.3)',
        'card': '0 2px 20px rgba(10, 22, 40, 0.08)',
        'card-hover': '0 8px 40px rgba(10, 22, 40, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
