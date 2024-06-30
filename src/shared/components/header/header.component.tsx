import { FC, ReactNode, SyntheticEvent, useCallback } from 'react';

import { Box } from '@mantine/core';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';

import { useStyles } from './styles';

interface IHeader {
  title: string;
  prevPage?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Header: FC<IHeader> = observer(
  ({ title, prevPage = '', iconLeft, iconRight }) => {
    const navigate = useNavigate();
    const { PagesStore } = useStores();
    const { classes } = useStyles();

    const handleClick = useCallback((event: SyntheticEvent<HTMLDivElement>) => {
      const name = (event.currentTarget.dataset.name as PagesEnum) ?? '';
      PagesStore.setActivePage(name);
      navigate(`/${name}`);
    }, []);

    return (
      <Box className={classes.header}>
        <Box
          data-name={prevPage}
          className={classes.icon}
          onClick={handleClick}
        >
          {prevPage !== '' && iconLeft}
        </Box>

        <Box className={classes.title}> {title}</Box>
        <Box className={classes.icon}> {prevPage !== '' && iconRight}</Box>
      </Box>
    );
  },
);

export { Header };
