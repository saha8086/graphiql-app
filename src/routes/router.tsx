import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { withLoading } from '@hocs/withLoading';
import NotFoundPage from '@pages/NotFoundPage';

const App = withLoading(lazy(() => import('@app/App')));
const WelcomePage = withLoading(lazy(() => import('@pages/WelcomePage')));
const GraphQLPage = withLoading(lazy(() => import('@pages/GraphQLPage')));
const SignInPage = withLoading(lazy(() => import('@pages/SignInPage/SignInPage')));
const SignUpPage = withLoading(lazy(() => import('@pages/SignUpPage/SignUpPage')));

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
        path: '/graphql',
        index: true,
        element: <GraphQLPage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />, // todo: https://github.com/saha8086/graphiql-app/issues/9
      },
      {
        path: '/sign-up',
        element: <SignUpPage />, // todo: https://github.com/saha8086/graphiql-app/issues/10
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
