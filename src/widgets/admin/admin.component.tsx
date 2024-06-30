import { useCallback, useState } from 'react';

import { Box, Button, Text } from '@mantine/core';

import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { NAME_PROJECT } from 'shared/constants';

import { CreatePanel, LoadingPanel, NearlyReadyPanel } from './panels';
import { useStyles } from './styles';

export const Admin = () => {
  const { classes } = useStyles();
  const { UserStore } = useStores();
  const [activePanel, setActivePanel] = useState<PagesEnum>(PagesEnum.CREATE);

  const handleActivePanel = useCallback(
    (event: React.SyntheticEvent<HTMLButtonElement>) => {
      const panel = (event.currentTarget.dataset.value as PagesEnum) ?? '';
      setActivePanel(panel);
    },
    [],
  );

  return (
    <Box className={classes.root}>
      {UserStore.isAdmin ? (
        <>
          <Box className={classes.container}>
            <Button
              data-value={PagesEnum.CREATE}
              fullWidth
              radius={8}
              bg={activePanel === PagesEnum.CREATE ? '' : '#0e2942'}
              onClick={handleActivePanel}
              w="32%"
            >
              Создать
            </Button>
            <Button
              data-value={PagesEnum.LOADING}
              fullWidth
              radius={8}
              bg={activePanel === PagesEnum.LOADING ? '' : '#0e2942'}
              onClick={handleActivePanel}
              w="32%"
            >
              Загрузка
            </Button>
            <Button
              data-value={PagesEnum.NEARLY_READY}
              fullWidth
              radius={8}
              bg={activePanel === PagesEnum.NEARLY_READY ? '' : '#0e2942'}
              onClick={handleActivePanel}
              w="32%"
            >
              Почти готово
            </Button>
          </Box>

          {activePanel === PagesEnum.CREATE && <CreatePanel />}
          {activePanel === PagesEnum.LOADING && <LoadingPanel />}
          {activePanel === PagesEnum.NEARLY_READY && <NearlyReadyPanel />}
        </>
      ) : null}
    </Box>
  );
};
