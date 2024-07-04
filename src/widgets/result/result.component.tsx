import { useEffect, useState } from 'react';

import { AspectRatio, Box, Loader, Overlay, Text } from '@mantine/core';

import cn from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import templateImg from 'app/public/img/template.jpg';
import { useStores } from 'app/store/use-stores';
import { PlatformEnum } from 'app/store/user-store';
import { CanvasImage } from 'shared/components';
import { DefaultButton } from 'shared/components/default-button';
import { shareLink, sharingStory, uploadImage } from 'shared/utils';

import { useStyles } from './styles';

export const Result = observer(() => {
  const { classes } = useStyles();
  const { UserStore, InfoFormStore } = useStores();
  const [imageData, setImageData] = useState<{
    file: File;
    base64: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const handleImageDrawn = (data: {
    file: File;
    blob: Blob;
    base64: string;
  }) => {
    setImageData(data);
  };

  const handleClickSend = () => {
    shareLink();
  };

  const handleClickShareStory = async () => {
    const linkPhoto = await uploadImage(imageData?.file as File);
    sharingStory(linkPhoto);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3_000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      className={cn(classes.root, {
        [classes.mobile]: UserStore.platform !== PlatformEnum.WEB,
      })}
    >
      <Box
        className={cn(classes.header, {
          [classes.mobileHeader]: UserStore.platform !== PlatformEnum.WEB,
        })}
      >
        <Text size="xl" ml={21} fw={600} mb={5}>
          Ваше свидетельство готово!
        </Text>
        <Text
          size="l"
          ml={21}
          fw={500}
          c="#5F5F5F"
          lh="19px"
          mb={UserStore.platform !== PlatformEnum.WEB ? 30 : 10}
        >
          Вы можете отправить его кому-либо или поделиться в истории
        </Text>
      </Box>

      {loading ? (
        <Box className={classes.loading} h="200px">
          <Loader size="lg" />
        </Box>
      ) : (
        <AspectRatio
          ratio={16 / 9}
          maw={320}
          mx="auto"
          pos="relative"
          mb={UserStore.platform !== PlatformEnum.WEB ? 80 : 10}
        >
          <CanvasImage
            formData={InfoFormStore.data}
            imageUrl={templateImg}
            onImageDrawn={handleImageDrawn}
          />
          <Overlay
            gradient="linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(235, 243, 250, 1) 100%)"
            opacity={0.95}
            style={{
              top: 'auto',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              zIndex: 2,
            }}
          />
        </AspectRatio>
      )}

      <Box
        className={cn(classes.footer, {
          [classes.mobileFooter]: UserStore.platform !== PlatformEnum.WEB,
        })}
      >
        <DefaultButton
          gradient={{ from: '#FAC27F', to: '#ED913D', deg: 90 }}
          onClick={handleClickSend}
          w={320}
        >
          Отправить заявление человеку
        </DefaultButton>

        <DefaultButton
          disabled={loading}
          onClick={handleClickShareStory}
          w={320}
        >
          Поделиться в истории
        </DefaultButton>
      </Box>
    </Box>
  );
});
