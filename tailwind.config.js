/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'bg-deep': '#040610',
        'bg-dark': '#080d1a',
        'cyan-neon': '#00f5ff',
        'purple-neon': '#b400ff',
        'pink-neon': '#ff0090',
        'yellow-neon': '#ffe000',
        'green-neon': '#00ff87',
        'red-neon': '#ff3b3b',
      },
      animation: {
        'ping-pulse': 'ping-pulse 2s ease-in-out infinite',
        'hex-rotate': 'hex-rotate 20s linear infinite',
        'progress-bar': 'progress-bar 5s linear infinite',
        'radar-pulse': 'radar-pulse 2s ease-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease both',
      },
      keyframes: {
        'ping-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'hex-rotate': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'progress-bar': {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        'radar-pulse': {
          '0%': { transform: 'translate(-50%,-50%) scale(0)', opacity: '1' },
          '100%': { transform: 'translate(-50%,-50%) scale(1)', opacity: '0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
