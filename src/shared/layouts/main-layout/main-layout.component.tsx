import { FC } from 'react';

import { Box } from '@mantine/core';

import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { ArrowLeftIcon } from 'app/public/assets/icons';
import { useStores } from 'app/store/use-stores';
import { Footer, Header } from 'shared/components';
import { PagesEnum } from 'shared/types/enums';

import { useStyles } from './styles';

interface ICurrentTitle {
  [key: string]: string;
}

const currentTitle: ICurrentTitle = {
  [PagesEnum.home]: 'Главная',
  [PagesEnum.result]: 'Результат',
};

interface ILayoutProps {
  prevPage?: string;
}

export const MainLayout: FC<ILayoutProps> = observer(({ prevPage }) => {
  const { PanelStore } = useStores();
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Header
        title={currentTitle[PanelStore?.activePanel]}
        prevPage={prevPage}
        iconLeft={<ArrowLeftIcon fill="white" />}
      />
      <main style={{ height: `calc(100vh - 110px)` }}>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
});
