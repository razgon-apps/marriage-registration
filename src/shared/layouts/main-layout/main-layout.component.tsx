import { FC, useEffect } from 'react';

import { BackgroundImage, Box } from '@mantine/core';

import bridge from '@vkontakte/vk-bridge';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { RouterPathEnum } from 'app/providers';
import bgImage from 'app/public/img/background.png';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { DefaultButton } from 'shared/components';

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
  const navigate = useNavigate();
  const { UserStore, PagesStore } = useStores();

  const handleClickAdmin = () => {
    PagesStore.setActivePage(PagesEnum.ADMIN);
    navigate(RouterPathEnum.ADMIN);
  };

  useEffect(() => {
    (async () => {
      // try {
      //   const { data } = await getPayload();

      //   if (data && data.success) {
      //     UserStore.setGroups(data.message);
      //   }
      // } catch (e) {
      //   console.warn('getPayload ERR', e);
      // }

      const user = await bridge.send('VKWebAppGetUserInfo');
      localStorage.setItem('userInfo', JSON.stringify(user));

      UserStore.setUserInfo(user);
    })();
  }, []);

  return (
    <Box className={classes.root}>
      {UserStore.isAdmin && (
        <DefaultButton
          variant="gradient"
          gradient={{ from: '#FAC27F', to: '#ED913D', deg: 90 }}
          onClick={handleClickAdmin}
          className={classes.adminButton}
          fz={12}
          w={60}
          h={30}
        >
          Админ
        </DefaultButton>
      )}
      <BackgroundImage
        src={PagesStore.activePage === PagesEnum.ADMIN ? '' : bgImage}
        bg={PagesStore.activePage === PagesEnum.ADMIN ? '#132136' : undefined}
        h="100vh"
      >
        <Outlet />
      </BackgroundImage>
    </Box>
  );
});
