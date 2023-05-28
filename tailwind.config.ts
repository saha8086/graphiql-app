import type { Config } from 'tailwindcss';

import { BREAKPOINTS } from './src/constants/breakpoints';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      ...BREAKPOINTS,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
