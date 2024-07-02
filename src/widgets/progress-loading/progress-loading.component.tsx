import { useEffect, useState } from 'react';

import { Box, Image, Transition } from '@mantine/core';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { RouterPathEnum } from 'app/providers';
import templateImg from 'app/public/img/template.jpg';
import { PagesEnum } from 'app/store/pages-store';
import { useStores } from 'app/store/use-stores';
import { CanvasImage } from 'shared/components/canvas-image';
import { checkSubscription } from 'shared/utils';

import { loadingSteps } from './progress-loading.consts';
import { useStyles } from './styles';

export const ProgressLoading = observer(() => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { PagesStore } = useStores();
  const [step, setStep] = useState<number>(0);

  const handleNextPage = async () => {
    const group1Id = Number(PagesStore.data[PagesEnum.LOADING]?.group1.id);
    const group2Id = Number(PagesStore.data[PagesEnum.LOADING]?.group2.id);

    const isBothSubscribed = await checkSubscription(group1Id, group2Id);

    if (group1Id || group2Id) {
      if (isBothSubscribed) {
        PagesStore.setActivePage(PagesEnum.NEARLY_READY);
        navigate(RouterPathEnum.NEARLY_READY);
      } else {
        handleNextPage();
      }
    } else {
      PagesStore.setActivePage(PagesEnum.NEARLY_READY);
      navigate(RouterPathEnum.NEARLY_READY);
    }
  };

  useEffect(() => {
    if (step === loadingSteps.length - 2) {
      handleNextPage();
    } else if (step < loadingSteps.length - 1) {
      const interval = setInterval(() => {
        setStep((prevStep) => prevStep + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step]);

  const currentStep = loadingSteps[step];

  return (
    <Box className={classes.root}>
      <Image src={currentStep.atr} height={180} width={330} fit="contain" />
      <Image
        style={{ marginBottom: '80px' }}
        src={currentStep.percent}
        height={70}
        width={160}
        fit="contain"
      />
      <Image src={currentStep.text} height={156} width={330} fit="contain" />
    </Box>
  );
});
