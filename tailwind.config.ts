import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#6D28D9',
          'red-dark': '#5B21B6',
          crimson: '#4C1D95',
          navy: '#0A1033',
          blush: '#F8F5FF',
          mist: '#F7F8FA',
          line: '#E2E4E9',
          ink: '#1F2430',
          muted: '#5E6472',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        page: '1168px',
        narrow: '728px',
        catalog: '1024px',
      },
      letterSpacing: { heading: '-0.025em' },
    },
  },
  plugins: [],
};
export default config;
