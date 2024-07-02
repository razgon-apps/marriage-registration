import { useCallback, useState } from 'react';

import { Box, Image, Space } from '@mantine/core';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from 'app/providers';
import art from 'app/public/img/pages/page-6/art.png';
import text from 'app/public/img/pages/page-6/text.png';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { PlatformEnum } from 'app/store/user-store';
import { CountdownTimer, ScrollContainer } from 'shared/components';
import { DefaultButton } from 'shared/components/default-button';

import { GroupItem } from './group-item';
import { useStyles } from './styles';

export const NearlyReady = observer(() => {
  const { classes } = useStyles();
  const { UserStore, PagesStore } = useStores();
  const navigate = useNavigate();
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);
  const canContinue = subscriptionsCount >= 5;
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  const artize =
    UserStore.platform !== PlatformEnum.WEB
      ? { height: 250, width: 320 }
      : { height: 200, width: 270 };

  const textSize =
    UserStore.platform !== PlatformEnum.WEB
      ? { height: 250, width: 350 }
      : { height: 200, width: 300 };

  const handleClick = () => {
    navigate(RouterPath.RESULT);
    PagesStore.setActivePage(PagesEnum.RESULT);
  };

  const handleTimerEnd = useCallback(() => {
    setIsTimerExpired(true);
    // Действия, которые нужно выполнить по завершении таймера
  }, []);

  const handleSubscriptionChange = () => {
    setSubscriptionsCount((prevCount) => prevCount + 1); // Увеличиваем количество подписок
  };

  const footerButton = (
    <DefaultButton
      variant="gradient"
      gradient={{ from: '#7DB8A4', to: '#41AE8D', deg: 90 }}
      onClick={handleClick}
      mb={30}
      mt={20}
      disabled={!isTimerExpired && !canContinue}
    >
      Продолжить
    </DefaultButton>
  );
  return (
    <ScrollContainer className={classes.scroll}>
      <Box className={cn(classes.root)}>
        <Box>
          <Image
            src={art}
            height={artize.height}
            width={artize.width}
            fit="contain"
            mt={32}
          />
        </Box>

        <Box className={classes.containerTimer}>
          <CountdownTimer initialValue={10} onTimerEnd={handleTimerEnd} />
        </Box>

        <Box>
          <Image
            src={text}
            height={textSize.height}
            width={textSize.width}
            fit="contain"
          />
        </Box>

        {/* <Box className={classes.groups}>
          <GroupItem
            imgUrl="https://img.freepik.com/free-photo/close-up-on-kitten-surrounded-by-flowers_23-2150782329.jpg"
            groupId={50477612}
            name="Anna Porter"
            className={classes.groupItem}
            onSubscriptionChange={handleSubscriptionChange}
          />
          <GroupItem
            imgUrl="https://img.freepik.com/free-photo/close-up-on-kitten-surrounded-by-flowers_23-2150782329.jpg"
            groupId={50477612}
            name="Anna Porter"
            className={classes.groupItem}
            onSubscriptionChange={handleSubscriptionChange}
          />
          <GroupItem
            imgUrl="https://img.freepik.com/free-photo/close-up-on-kitten-surrounded-by-flowers_23-2150782329.jpg"
            groupId={50477612}
            name="Anna Porter"
            className={classes.groupItem}
            onSubscriptionChange={handleSubscriptionChange}
          />
          <GroupItem
            imgUrl="https://img.freepik.com/free-photo/close-up-on-kitten-surrounded-by-flowers_23-2150782329.jpg"
            groupId={50477612}
            name="Anna Porter"
            className={classes.groupItem}
            onSubscriptionChange={handleSubscriptionChange}
          />
          <GroupItem
            imgUrl="https://img.freepik.com/free-photo/close-up-on-kitten-surrounded-by-flowers_23-2150782329.jpg"
            groupId={50477612}
            name="Anna Porter"
            className={classes.groupItem}
            onSubscriptionChange={handleSubscriptionChange}
          />
        </Box> */}

        {/* TODO: Добавить првоерку на кол-во пабликов, если их 0 то отображаем обычный футер */}
        {canContinue ? (
          footerButton
        ) : (
          <Box
            className={cn(classes.footer, {
              [classes.mobileFooter]: UserStore.platform !== PlatformEnum.WEB,
            })}
          >
            {footerButton}
          </Box>
        )}
      </Box>
    </ScrollContainer>
  );
});
