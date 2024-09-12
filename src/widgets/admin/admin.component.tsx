import { useCallback, useState } from 'react';

import { Box, Button, Text } from '@mantine/core';

import { useNavigate } from 'react-router-dom';

import { RouterPathEnum } from 'app/providers';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';

import {
  AdminPanel,
  AllowAccessPanel,
  CreatePanel,
  LoadingPanel,
  NearlyReadyPanel,
} from './panels';
import { useStyles } from './styles';

export const Admin = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { UserStore, PagesStore } = useStores();
  const [activePanel, setActivePanel] = useState<PagesEnum>(PagesEnum.ADMIN);

  const handleActivePanel = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const panel = (event.currentTarget.dataset.value as PagesEnum) ?? '';
      setActivePanel(panel);
    },
    [],
  );

  const handleBackButton = () => {
    navigate(RouterPathEnum.HOME);
    PagesStore.setActivePage(PagesEnum.HOME);
  };

  return (
    <Box className={classes.root}>
      {UserStore.isAdmin ? (
        <>
          <Box className={classes.container}>
            <Button
              data-value={PagesEnum.ADMIN}
              fullWidth
              radius={8}
              bg={activePanel === PagesEnum.ADMIN ? '' : '#0e2942'}
              onClick={handleActivePanel}
              w="15%"
              fz={10}
              pl={8}
              pr={8}
            >
              Админы
            </Button>
            <Button
              data-value={PagesEnum.CREATE}
              fullWidth
              radius={8}
              bg={activePanel === PagesEnum.CREATE ? '' : '#0e2942'}
              onClick={handleActivePanel}
              w="15%"
              fz={10}
              pl={8}
              pr={8}
            >
              Создать
            </Button>
            <Button
              data-value={PagesEnum.ALLOW_ACCESS}
              fullWidth
              radius={8}
              bg={activePanel === PagesEnum.ALLOW_ACCESS ? '' : '#0e2942'}
              onClick={handleActivePanel}
              w="15%"
              fz={10}
              pl={8}
              pr={8}
            >
              Доступ
            </Button>
            <Button
              data-value={PagesEnum.LOADING}
              fullWidth
              radius={8}
              bg={activePanel === PagesEnum.LOADING ? '' : '#0e2942'}
              onClick={handleActivePanel}
              w="15%"
              fz={10}
              pl={8}
              pr={8}
            >
              Загрузка
            </Button>
            <Button
              data-value={PagesEnum.NEARLY_READY}
              fullWidth
              radius={8}
              bg={activePanel === PagesEnum.NEARLY_READY ? '' : '#0e2942'}
              onClick={handleActivePanel}
              w="15%"
              fz={10}
              pl={8}
              pr={8}
            >
              Почти готово
            </Button>
            <Button
              data-value={PagesEnum.NEARLY_READY}
              fullWidth
              radius={8}
              onClick={handleBackButton}
              bg="black"
              w="15%"
              fz={10}
              pl={8}
              pr={8}
            >
              Назад
            </Button>
          </Box>

          {activePanel === PagesEnum.CREATE && <CreatePanel />}
          {activePanel === PagesEnum.ALLOW_ACCESS && <AllowAccessPanel />}
          {activePanel === PagesEnum.LOADING && <LoadingPanel />}
          {activePanel === PagesEnum.NEARLY_READY && <NearlyReadyPanel />}
          {activePanel === PagesEnum.ADMIN && <AdminPanel />}
        </>
      ) : null}
    </Box>
  );
};
