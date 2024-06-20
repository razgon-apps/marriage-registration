import { SyntheticEvent, useCallback } from 'react';

import { Box, Button } from '@mantine/core';

import { IconHome2, IconVip } from '@tabler/icons';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';

import { BookIcon, StarIcon, UsersIcon } from 'app/public/assets/icons';
import { useStores } from 'app/store/use-stores';
import { ADMINS, USER_ID } from 'shared/constants';
import { PagesEnum } from 'shared/types/enums';

import { useStyles } from './styles';

const tabs = [
  {
    id: 1,
    icon: <IconHome2 />,
    name: PagesEnum.home,
    path: '',
  },
  {
    id: 2,
    icon: <UsersIcon />,
    name: PagesEnum.result,
    path: `/${PagesEnum.result}`,
  },
  // {
  //   id: 3,
  //   icon: <StarIcon />,
  //   name: PagesEnum.demonicHoroscope,
  // },
  // {
  //   id: 4,
  //   icon: <BookIcon width={24} height={24} />,
  //   name: PagesEnum.horoscopeSubscription,
  // },
  // {
  //   id: 5,
  //   icon: <IconVip width={24} height={24} />,
  //   name: PagesEnum.admin,
  // },
];

const Footer = observer(() => {
  const { classes, cx } = useStyles();
  const { PanelStore } = useStores();
  const location = useLocation();
  const navigate = useNavigate();

  const userTabs = tabs.filter((item) => item.id !== 5);
  const filterTabs = ADMINS.includes(USER_ID) ? tabs : userTabs;

  const handleClick = useCallback(
    (event: SyntheticEvent<HTMLButtonElement>) => {
      const name = event.currentTarget.dataset.name ?? '';
      const path = event.currentTarget.dataset.path ?? '';
      PanelStore.setActivePanel(name);

      navigate(path);
    },
    [],
  );

  return (
    <Box className={classes.root}>
      {filterTabs?.map((item) => {
        return (
          <Button
            data-name={item.name}
            data-path={item.path}
            className={cx(classes.button, {
              [classes.buttonActive]: `/${item.name}` === location.pathname,
            })}
            onClick={handleClick}
            key={item.id}
            sx={{ fontWeight: 500 }}
          >
            {item.icon}
          </Button>
        );
      })}
    </Box>
  );
});

export { Footer };
