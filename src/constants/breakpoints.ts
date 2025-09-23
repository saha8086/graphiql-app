import type { DistanceUnit } from '@interfaces/theme';

export const BREAKPOINTS = {
  base: '0',
  /** 480px */
  sm: '30rem',
  /** 768px */
  md: '48rem',
  /** 992px */
  lg: '62rem',
  /** 1280px */
  xl: '80rem',
  /** 1536px */
  '2xl': '96rem', // keep this property name backward compatible with Tailwind
} as const satisfies Record<string, DistanceUnit>;

export type BreakpointType = keyof typeof BREAKPOINTS;
