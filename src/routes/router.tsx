import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { withLoading } from 'src/hocs/withLoading';

const App = withLoading(lazy(() => import('src/app/App')));
const WelcomePage = withLoading(lazy(() => import('src/pages/WelcomePage/WelcomePage')));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFoundPage/> // todo: https://github.com/saha8086/graphiql-app/issues/3
    children: [
      {
        path: '/',
        index: true,
        element: <WelcomePage />,
      },
      {
        path: '/sign-in',
        // element: <SignInPage/>, // todo: https://github.com/saha8086/graphiql-app/issues/9
      },
      {
        path: '/sign-up',
        // element: <SignUpPage/>, // todo: https://github.com/saha8086/graphiql-app/issues/10
      },
    ],
  },
]);
