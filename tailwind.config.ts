import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '380px',
      },
      colors: {
        indigo: {
          700: 'var(--indigo-700)',
          800: 'var(--indigo-800)',
          900: 'var(--indigo-900)',
        },
        mint: {
          300: 'var(--mint-300)',
          400: 'var(--mint-400)',
          500: 'var(--mint-500)',
        },
        lavender: {
          50: 'var(--lavender-50)',
          100: 'var(--lavender-100)',
          200: 'var(--lavender-200)',
        },
        ink: {
          DEFAULT: 'var(--indigo-900)',
          muted: 'var(--ink-muted)',
        },
        emergency: {
          600: 'var(--emergency-600)',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '24px',
        'hero': '28px',
      },
      boxShadow: {
        'soft': '0 12px 32px -8px rgba(18, 19, 22, 0.08)',
        'soft-lg': '0 20px 48px -12px rgba(18, 19, 22, 0.12)',
        'mint-glow': '0 8px 24px -4px rgba(255, 43, 68, 0.35)',
        'red-glow': '0 8px 24px -4px rgba(255, 43, 68, 0.35)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
};

export default config;

