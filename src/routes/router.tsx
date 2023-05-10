import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { withLoading } from 'src/hocs/withLoading';
import NotFoundPage from 'src/pages/NotFoundPage';

const App = withLoading(lazy(() => import('src/app/App')));
const WelcomePage = withLoading(lazy(() => import('src/pages/WelcomePage')));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
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
];

export const router = createBrowserRouter(routes);
