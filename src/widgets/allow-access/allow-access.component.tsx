import { FC, useCallback, useState } from 'react';

import { Box, Checkbox, Image, Text } from '@mantine/core';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import art from 'app/public/img/pages/page-2/art.png';
import story from 'app/public/img/story.png';
import { PagesEnum } from 'app/store/panel-store';
import { useStores } from 'app/store/use-stores';
import { PlatformEnum } from 'app/store/user-store';
import { DefaultButton } from 'shared/components/default-button';
import {
  getUserToken,
  postPhotoOnWall,
  publishPhotoInAlbum,
} from 'shared/utils';

import { useStyles } from './styles';

export const AllowAccess: FC = observer(() => {
  const { classes } = useStyles();
  const { UserStore } = useStores();
  const navigate = useNavigate();
  const [checkedAccessPhotoInAlbum, setCheckedAccessPhotoInAlbum] =
    useState(true);
  const [checkedAccessHaveFun, setCheckedAccessHaveFun] = useState(true);

  const handleClick = () => {
    navigate(`/${PagesEnum.CREATE}`);
  };

  const getAccessAnfPosting = async () => {
    const token = await getUserToken('wall,photos,friends');
    console.error('test123456');
    console.log('test1');
    if (token) {
      UserStore.setUserToken(token);
      console.log('test666');
      try {
        await postPhotoOnWall(story, token);
      } catch (e) {
        console.warn('handleAction postPhotoOnWall', e);
      }
    } else {
      getAccessAnfPosting();
    }

    return token;
  };

  const handleChangeAccessPhotoInAlbum = useCallback(
    async (event: React.SyntheticEvent<HTMLInputElement>) => {
      const token = await getAccessAnfPosting();

      if (token) {
        setCheckedAccessPhotoInAlbum(event.currentTarget.checked);
      }
    },
    [],
  );

  const handleChangeAccessHaveFun = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    setCheckedAccessHaveFun(event.currentTarget.checked);
  };

  const imgSize = UserStore.platform !== PlatformEnum.WEB ? 300 : 250;

  return (
    <Box
      className={cn(classes.root, {
        [classes.mobile]: UserStore.platform !== PlatformEnum.WEB,
      })}
    >
      <Box>
        <Image src={art} height={imgSize} width={imgSize} fit="contain" />
      </Box>

      <Box className={classes.container}>
        <Box className={classes.checkboxContainer}>
          <Checkbox
            onChange={handleChangeAccessPhotoInAlbum}
            checked={checkedAccessPhotoInAlbum}
            variant="outline"
            size="xl"
            color="rgba(0, 0, 0, 1)"
          />
          <Text size="l" ml={21} fw={500}>
            Поделиться результатом в фотоальбоме.
          </Text>
        </Box>
        <Box className={classes.checkboxContainer}>
          <Checkbox
            onChange={handleChangeAccessHaveFun}
            checked={checkedAccessHaveFun}
            variant="outline"
            size="xl"
            color="rgba(0, 0, 0, 1)"
          />
          <Text size="l" ml={21} fw={500}>
            Ознакомлен, что данный информационный портал создан в
            развлекательных целях. 
          </Text>
        </Box>
      </Box>

      <Box className={classes.footer}>
        <DefaultButton
          disabled={!checkedAccessPhotoInAlbum || !checkedAccessHaveFun}
          variant="gradient"
          gradient={{ from: '#7DB8A4', to: '#41AE8D', deg: 90 }}
          onClick={handleClick}
        >
          Продолжить
        </DefaultButton>
      </Box>
    </Box>
  );
});
