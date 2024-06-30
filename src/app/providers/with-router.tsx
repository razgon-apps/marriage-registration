import { Suspense } from 'react';

import { useRoutes } from 'react-router-dom';

import { PagesEnum } from 'app/store/pages-store';
import AdminPage from 'pages/admin';
import AllowAccessPage from 'pages/allow-access';
import CreatePage from 'pages/create';
import HomePage from 'pages/home';
import InfoPage from 'pages/info';
import LoadingPage from 'pages/loading';
import NearlyReadyPage from 'pages/nearly-ready';
import NotFoundPage from 'pages/not-found';
import ResultPage from 'pages/result';
import MainLayout from 'shared/layouts/main-layout';

export enum RouterPathEnum {
  HOME = `/`,
  ALLOW_ACCESS = `/${PagesEnum.ALLOW_ACCESS}`,
  CREATE = `/${PagesEnum.CREATE}`,
  INFO = `/${PagesEnum.INFO}`,
  LOADING = `/${PagesEnum.LOADING}`,
  NEARLY_READY = `/${PagesEnum.NEARLY_READY}`,
  RESULT = `/${PagesEnum.RESULT}`,
  ADMIN = `/${PagesEnum.ADMIN}`,
}

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
          path: RouterPathEnum.ALLOW_ACCESS,
          element: <AllowAccessPage />,
        },
        {
          path: RouterPathEnum.CREATE,
          element: <CreatePage />,
        },
        {
          path: RouterPathEnum.INFO,
          element: <InfoPage />,
        },
        {
          path: RouterPathEnum.LOADING,
          element: <LoadingPage />,
        },
        {
          path: RouterPathEnum.NEARLY_READY,
          element: <NearlyReadyPage />,
        },
        {
          path: RouterPathEnum.RESULT,
          element: <ResultPage />,
        },
        {
          path: RouterPathEnum.ADMIN,
          element: <AdminPage />,
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
