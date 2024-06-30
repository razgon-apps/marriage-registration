import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import templateImg from 'app/public/img/template.jpg';
import { useStores } from 'app/store/use-stores';
import { CanvasImage } from 'shared/components/canvas-image';
import { Result } from 'widgets/result';

export const ResultPage = observer(() => {
  const { InfoFormStore } = useStores();

  console.log('InfoFormStore.data', toJS(InfoFormStore.data));

  return <Result />;
});
