import { observer } from 'mobx-react-lite';

import { ProgressLoading } from 'widgets/progress-loading';

export const LoadingPage = observer(() => {
  return <ProgressLoading />;
});
