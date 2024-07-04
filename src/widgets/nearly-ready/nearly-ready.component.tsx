import { useCallback, useEffect, useState } from 'react';

import { Box, Image, Space } from '@mantine/core';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { RouterPathEnum } from 'app/providers';
import art from 'app/public/img/pages/page-6/art.png';
import text from 'app/public/img/pages/page-6/text.png';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { PlatformEnum } from 'app/store/user-store';
import { CountdownTimer, ScrollContainer } from 'shared/components';
import { DefaultButton } from 'shared/components/default-button';
import { checkSubscription } from 'shared/utils';

import { GroupItem } from './group-item';
import { countNonEmptyItems } from './nearly-ready.utils';
import { useStyles } from './styles';

export const NearlyReady = observer(() => {
  const { classes } = useStyles();
  const { UserStore, PagesStore } = useStores();
  const navigate = useNavigate();
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);
  const canContinue =
    subscriptionsCount >=
    countNonEmptyItems(PagesStore.data[PagesEnum.NEARLY_READY]?.groups);
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  const artize =
    UserStore.platform !== PlatformEnum.WEB
      ? { height: 250, width: 320 }
      : { height: 200, width: 270 };

  const textSize =
    UserStore.platform !== PlatformEnum.WEB
      ? { height: 250, width: 350 }
      : { height: 200, width: 300 };

  const handleClick = async () => {
    const group1Id = Number(
      PagesStore.data[PagesEnum.NEARLY_READY]?.group1?.id,
    );
    const group2Id = Number(
      PagesStore.data[PagesEnum.NEARLY_READY]?.group2?.id,
    );

    const isBothSubscribed = await checkSubscription(group1Id, group2Id);

    if (group1Id || group2Id) {
      if (isBothSubscribed) {
        navigate(RouterPathEnum.RESULT);
        PagesStore.setActivePage(PagesEnum.RESULT);
      } else {
        handleClick();
      }
    } else {
      navigate(RouterPathEnum.RESULT);
      PagesStore.setActivePage(PagesEnum.RESULT);
    }
  };

  const handleTimerEnd = useCallback(() => {
    setIsTimerExpired(true);
  }, []);

  const handleSubscriptionChange = () => {
    setSubscriptionsCount((prevCount) => prevCount + 1);
  };

  const filteredGroups = PagesStore.data[
    PagesEnum.NEARLY_READY
  ]?.groups?.filter(
    (item) => item.id !== 0 && item.name !== '' && item.imgUrl !== '',
  );

  const footerButton = (
    <DefaultButton
      variant="gradient"
      gradient={{ from: '#7DB8A4', to: '#41AE8D', deg: 90 }}
      onClick={handleClick}
      mb={30}
      mt={20}
      disabled={
        countNonEmptyItems(PagesStore.data[PagesEnum.NEARLY_READY]?.groups) ===
        0
          ? !isTimerExpired
          : !isTimerExpired && !canContinue
      }
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
          <CountdownTimer initialValue={180} onTimerEnd={handleTimerEnd} />
        </Box>

        <Box>
          <Image
            src={text}
            height={textSize.height}
            width={textSize.width}
            fit="contain"
          />
        </Box>

        {Boolean(filteredGroups?.length) && (
          <Box className={classes.groups}>
            {filteredGroups?.map((item) => {
              return (
                <GroupItem
                  imgUrl={item?.imgUrl ?? ''}
                  groupId={Number(item?.id) ?? 0}
                  name={item?.name ?? ''}
                  className={classes.groupItem}
                  onSubscriptionChange={handleSubscriptionChange}
                />
              );
            })}
          </Box>
        )}

        {PagesStore.data[PagesEnum.NEARLY_READY]?.groups?.length ? (
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
