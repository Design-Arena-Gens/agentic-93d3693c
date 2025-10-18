import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mint: '#DFF3E3',
        butter: '#FFF4CC',
        cream: '#FFF9F1',
        leaf: '#2E6F3E',
        clay: '#5B4636',
        ink: '#1F2937',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0,0,0,0.06)'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn .6s ease both'
      }
    },
  },
  plugins: [],
}
export default config
