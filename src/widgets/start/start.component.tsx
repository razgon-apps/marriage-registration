import { FC } from 'react';

import { Box, Image } from '@mantine/core';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { RouterPathEnum } from 'app/providers';
import art from 'app/public/img/pages/page-1/art.png';
import text from 'app/public/img/pages/page-1/text.png';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { PlatformEnum } from 'app/store/user-store';
import { DefaultButton } from 'shared/components/default-button';
import { ADMINS, USER_ID } from 'shared/constants';

import { useStyles } from './styles';

export const StartStep: FC = observer(() => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { UserStore, PagesStore } = useStores();

  const handleClick = () => {
    PagesStore.setActivePage(PagesEnum.ALLOW_ACCESS);
    navigate(RouterPathEnum.ALLOW_ACCESS);
  };

  const handleClickAdmin = () => {
    PagesStore.setActivePage(PagesEnum.ADMIN);
    navigate(RouterPathEnum.ADMIN);
  };

  return (
    <Box
      className={cn(classes.root, {
        [classes.mobile]: UserStore.platform !== PlatformEnum.WEB,
      })}
    >
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

      <Box>
        <Image src={art} height={300} width={300} fit="contain" />
        <Image src={text} height={200} width={300} fit="contain" />
      </Box>

      <Box
        className={cn(classes.footer, {
          [classes.mobileFooter]: UserStore.platform !== PlatformEnum.WEB,
        })}
      >
        <DefaultButton
          variant="gradient"
          gradient={{ from: '#7DB8A4', to: '#41AE8D', deg: 90 }}
          onClick={handleClick}
        >
          Начать
        </DefaultButton>
      </Box>
    </Box>
  );
});
