import { Box, Image } from '@mantine/core';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from 'app/providers';
import art from 'app/public/img/pages/page-3/art.png';
import text from 'app/public/img/pages/page-3/text.png';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { PlatformEnum } from 'app/store/user-store';
import { DefaultButton } from 'shared/components/default-button';
import {
  addGroup,
  checkSubscription,
  subscribeMessageFromGroup,
} from 'shared/utils';

import { useStyles } from './styles';

export const Create = observer(() => {
  const { classes } = useStyles();
  const { UserStore, PagesStore } = useStores();
  const navigate = useNavigate();

  const handleClick = async () => {
    // const group1Id = Number(PagesStore.data[PagesEnum.CREATE]?.group1.id);
    // const group2Id = Number(PagesStore.data[PagesEnum.CREATE]?.group2.id);

    // const isBothSubscribed = await checkSubscription(group1Id, group2Id);

    // if (isBothSubscribed) {
    //   navigate(RouterPath.INFO);
    //   PagesStore.setActivePage(PagesEnum.INFO);
    // } else {
    //   handleClick();
    // }

    navigate(RouterPath.INFO);
    PagesStore.setActivePage(PagesEnum.INFO);
  };

  return (
    <Box
      className={cn(classes.root, {
        [classes.mobile]: UserStore.platform !== PlatformEnum.WEB,
      })}
    >
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
          Создать
        </DefaultButton>
      </Box>
    </Box>
  );
});
