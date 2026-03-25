import type { Config } from 'tailwindcss'

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
          DEFAULT: '#00B4FF',
          dark: '#0086CC',
          light: '#33C3FF',
        },
        secondary: {
          DEFAULT: '#FF6B35',
          dark: '#CC5528',
        },
        accent: '#FFD700',
        space: {
          black: '#060810',
          dark: '#0D1117',
          navy: '#0A0F1E',
          mid: '#111827',
          card: '#141C2E',
        },
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'sans-serif'],
        body: ['var(--font-exo)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'star-pattern': "url('/images/stars-bg.png')",
        'hero-gradient': 'linear-gradient(180deg, rgba(6,8,16,0) 0%, #060810 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,180,255,0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0,180,255,0.9)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0,180,255,0.4)',
        'glow-orange': '0 0 20px rgba(255,107,53,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}

export default config