import { Suspense } from 'react';

import { useRoutes } from 'react-router-dom';

import AllowAccessPage from 'pages/allow-access';
import CreatePage from 'pages/create';
import HomePage from 'pages/home';
import InfoPage from 'pages/info';
import LoadingPage from 'pages/loading';
import NotFoundPage from 'pages/not-found';
import ResultPage from 'pages/result';
import MainLayout from 'shared/layouts/main-layout';

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
          path: '/allow-access',
          element: <AllowAccessPage />,
        },
        {
          path: '/create',
          element: <CreatePage />,
        },
        {
          path: '/info',
          element: <InfoPage />,
        },
        {
          path: '/result',
          element: <ResultPage />,
        },
        {
          path: '/loading',
          element: <LoadingPage />,
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
