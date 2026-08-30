/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--color-base)',
          elevated: 'var(--color-elevated)',
          inset: 'var(--color-inset)',
        },
        hw: {
          data: '#10b981',    // oklch(0.65 0.18 145)
          address: '#f59e0b', // oklch(0.72 0.16 65)
          control: '#06b6d4', // oklch(0.70 0.14 210)
          interrupt: '#ef4444', // oklch(0.60 0.20 25)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        // Enforce 0 generic drop shadows by removing them entirely or replacing with borders
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
        inner: 'none',
      },
      borderRadius: {
        // Enforce sharp corners for everything except pills
        'none': '0px',
        'sm': '0px',
        DEFAULT: '0px',
        'md': '0px',
        'lg': '0px',
        'xl': '0px',
        '2xl': '0px',
        '3xl': '0px',
        'full': '9999px',
      }
    }
  },
  plugins: [],
}
