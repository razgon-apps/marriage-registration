import { useEffect, useState } from 'react';

import { Box, Image, Transition } from '@mantine/core';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import templateImg from 'app/public/img/template.jpg';
import { PagesEnum } from 'app/store/panel-store';
import { useStores } from 'app/store/use-stores';
import { CanvasImage } from 'shared/components/canvas-image';

import { loadingSteps } from './progress-loading.consts';
import { useStyles } from './styles';

export const ProgressLoading = observer(() => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { PanelStore, InfoFormStore } = useStores();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (step < loadingSteps.length - 1) {
      const interval = setInterval(() => {
        setStep((prevStep) => prevStep + 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      PanelStore.setActivePanel(PagesEnum.RESULT);
      navigate(`/${PagesEnum.RESULT}`);
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
