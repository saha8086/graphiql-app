import {
  useBreakpointValue as baseUseBreakpointValue,
  useBreakpoint,
  useMediaQuery,
} from '@chakra-ui/react';

import { BREAKPOINTS, BreakpointType } from '@consts/breakpoints';

export const useBreakpointValue = <T>(values: Partial<Record<BreakpointType, T>>) =>
  baseUseBreakpointValue(values, { ssr: false });

export const useCurrentBreakpoint = () => useBreakpoint({ ssr: false }) as BreakpointType;

export const useResponsive = () => {
  const [isMobile, isTablet, isDesktop] = useMediaQuery(
    [
      `(max-width: ${BREAKPOINTS.md})`,
      `(min-width: ${BREAKPOINTS.md}) and (max-width: ${BREAKPOINTS.xl})`,
      `(min-width: ${BREAKPOINTS.xl}) and (max-width: ${BREAKPOINTS['2xl']})`,
    ],
    { ssr: false }
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
  } as const;
};
