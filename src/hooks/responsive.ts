import { useBreakpointValue as useBreakpoint, useMediaQuery } from '@chakra-ui/react';

import { BREAKPOINTS } from '@consts/breakpoints';

export const useBreakpointValue = () => useBreakpoint(BREAKPOINTS);

export const useViewportWidth = () => {
  const [isMobile, isTablet, isDesktop] = useMediaQuery([
    `(max-width: ${BREAKPOINTS.md})`,
    `(min-width: ${BREAKPOINTS.md}) and (max-width: ${BREAKPOINTS.xl})`,
    `(min-width: ${BREAKPOINTS.xl}) and (max-width: ${BREAKPOINTS['2xl']})`,
  ]);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export const useResponsive = () => {
  const value = useBreakpointValue();

  const viewport = useViewportWidth();

  return {
    ...viewport,
    sm: BREAKPOINTS.sm === value,
    md: BREAKPOINTS.md === value,
    lg: BREAKPOINTS.lg === value,
    xl: BREAKPOINTS.xl === value,
    xxl: BREAKPOINTS['2xl'] === value,
  };
};
