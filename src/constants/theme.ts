import { ChakraTheme, extendTheme, localStorageManager } from '@chakra-ui/react';
import { BREAKPOINTS } from './breakpoints';

// https://chakra-ui.com/docs/styled-system/color-mode
localStorageManager.set('system');

export const THEME = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  breakpoints: BREAKPOINTS,
} satisfies Partial<ChakraTheme>);
