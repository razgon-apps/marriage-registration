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
import { ROUTE_URL } from 'shared/constants';
import MainLayout from 'shared/layouts/main-layout';

export enum RouterPathEnum {
  HOME = '',
  ALLOW_ACCESS = `/${PagesEnum.ALLOW_ACCESS}`,
  CREATE = `/${PagesEnum.CREATE}`,
  INFO = `/${PagesEnum.INFO}`,
  LOADING = `/${PagesEnum.LOADING}`,
  NEARLY_READY = `/${PagesEnum.NEARLY_READY}`,
  RESULT = `/${PagesEnum.RESULT}`,
  ADMIN = `/${PagesEnum.ADMIN}`,
}

export const RouterPath = {
  HOME: `/marriage-registration`,
  ALLOW_ACCESS: `${ROUTE_URL}/${PagesEnum.ALLOW_ACCESS}`,
  CREATE: `${ROUTE_URL}/${PagesEnum.CREATE}`,
  INFO: `${ROUTE_URL}/${PagesEnum.INFO}`,
  LOADING: `${ROUTE_URL}/${PagesEnum.LOADING}`,
  NEARLY_READY: `${ROUTE_URL}/${PagesEnum.NEARLY_READY}`,
  RESULT: `${ROUTE_URL}/${PagesEnum.RESULT}`,
  ADMIN: `${ROUTE_URL}/${PagesEnum.ADMIN}`,
};

export const Router = () => {
  const router = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: RouterPath.HOME,
          element: <HomePage />,
        },
        {
          path: RouterPath.ALLOW_ACCESS,
          element: <AllowAccessPage />,
        },
        {
          path: RouterPath.CREATE,
          element: <CreatePage />,
        },
        {
          path: RouterPath.INFO,
          element: <InfoPage />,
        },
        {
          path: RouterPath.LOADING,
          element: <LoadingPage />,
        },
        {
          path: RouterPath.NEARLY_READY,
          element: <NearlyReadyPage />,
        },
        {
          path: RouterPath.RESULT,
          element: <ResultPage />,
        },
        {
          path: RouterPath.ADMIN,
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
