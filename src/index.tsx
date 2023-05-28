import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { store } from '@app/store';
import { router } from '@routes/router';
import { THEME } from '@consts/theme';

import './i18n';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider theme={THEME}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </StrictMode>
);
