/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'josefin': ['Josefin Sans', 'sans-serif']
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        'pulse': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1)  infinite',
      },
      screens: {
        mxxl: { 'max': '1535px' },
        // => @media (max-width: 1535px) { ... }
        mxl: { 'max': '1279px' },
        // => @media (max-width: 1279px) { ... }
        mlg: { 'max': '1023px' },
        // => @media (max-width: 1023px) { ... }
        mmd: { 'max': '767px' },
        // => @media (max-width: 767px) { ... }
        msm: { 'max': '639px' },
        // => @media (max-width: 639px) { ... }
        mss: { 'max': '550px' },
        // => @media (max-width: 550px) { ... }
        mxs: { 'max': "480px" }
        // => @media (max-width: 480px) { ... }
      },
    },
  },
  plugins: [],
}
