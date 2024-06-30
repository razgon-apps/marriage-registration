import { FC, useEffect } from 'react';

import { BackgroundImage, Box } from '@mantine/core';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';

import bgImage from 'app/public/img/background.png';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';

import { useStyles } from './styles';

interface ICurrentTitle {
  [key: string]: string;
}

const currentTitle: ICurrentTitle = {
  [PagesEnum.HOME]: 'Главная',
  [PagesEnum.RESULT]: 'Результат',
};

interface ILayoutProps {
  prevPage?: string;
}

export const MainLayout: FC<ILayoutProps> = observer(({ prevPage }) => {
  const { classes } = useStyles();
  const location = useLocation();

  const currentPath = location.pathname;

  console.log('currentPath', currentPath);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await getPayload();

  //       if (data && data.success) {
  //         UserStore.setGroups(data.message);
  //       }
  //     } catch (e) {
  //       console.warn('getPayload ERR', e);
  //     }

  //     const user = await bridge.send('VKWebAppGetUserInfo');
  //     localStorage.setItem('userInfo', JSON.stringify(user));

  //     UserStore.setUserInfo(user);
  //   })();
  // }, []);

  return (
    <Box className={classes.root}>
      <BackgroundImage
        src={bgImage}
        bg={location.pathname === '/admin' ? '#132136' : undefined}
        h="100vh"
      >
        <Outlet />
      </BackgroundImage>
    </Box>
  );
});
