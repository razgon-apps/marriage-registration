import { BackgroundImage, Box } from '@mantine/core';

import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import templateImg from 'app/public/img/template.jpg';
import { useStores } from 'app/store/use-stores';
import { CanvasImage } from 'shared/components/canvas-image';
import { ProgressLoading } from 'widgets/progress-loading';

export const LoadingPage = observer(() => {
  const { InfoFormStore } = useStores();

  return <ProgressLoading />;
});
