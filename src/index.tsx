import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { store } from '@app/store';
import { router } from '@routes/router';

import './i18n';
import './index.css';

import { extendTheme, ChakraTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
} satisfies Partial<ChakraTheme>);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </StrictMode>
);
