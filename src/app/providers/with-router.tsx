import { Suspense, lazy } from 'react';

import { useRoutes } from 'react-router-dom';

const MainLayout = lazy(() => import('shared/layouts/main-layout'));
const NotFoundPage = lazy(() => import('pages/not-found'));
const HomePage = lazy(() => import('pages/home'));
const ResultPage = lazy(() => import('pages/result'));

export const Router = () => {
  const router = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/result',
          element: <ResultPage />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <Suspense>{router}</Suspense>;
};
