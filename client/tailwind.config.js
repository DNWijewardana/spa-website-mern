/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          100: '#E4EFE4',
          300: '#A8C3A8',
          500: '#6B8E6E',
          700: '#4A6350',
          900: '#2F3E34',
        },
        sand: { 300: '#E4D2AE', 500: '#C9A96E' },
        clay: { 400: '#D8A48F' },
        linen: '#FAF6F0',
        stone: { 200: '#EDE7DE', 400: '#B8AFA3' },
        ink: '#1F2621',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl: '16px', '2xl': '28px' },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(47, 62, 52, 0.15)',
        float: '0 24px 60px -20px rgba(47, 62, 52, 0.25)',
      },
      keyframes: {
        'float-drift': {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-24px) translateX(12px) rotate(6deg)' },
          '66%': { transform: 'translateY(-8px) translateX(-10px) rotate(-4deg)' },
        },
      },
      animation: {
        'float-drift': 'float-drift 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
