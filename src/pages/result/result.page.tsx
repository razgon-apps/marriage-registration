import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import templateImg from 'app/public/img/template.jpg';
import { useStores } from 'app/store/use-stores';
import { CanvasImage } from 'shared/components/canvas-image';

export const ResultPage = observer(() => {
  const { InfoFormStore } = useStores();

  console.log('InfoFormStore.data', toJS(InfoFormStore.data));

  return (
    <div>
      <CanvasImage formData={InfoFormStore.data} imageUrl={templateImg} />
    </div>
  );
});
