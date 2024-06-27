import { ReactNode, useEffect } from 'react';

import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { getUserPlatform } from 'shared/utils';

import { useStores } from '../store/use-stores';

export const WithVkBridge = observer(
  ({ children }: { children: ReactNode }) => {
    const { UserStore } = useStores();

    useEffect(() => {
      (async () => {
        const platform = await getUserPlatform();
        UserStore.setPlatform(platform);
      })();
    }, []);

    useEffect(() => {
      (async () => {
        try {
          // const { data } = await getPayload();
          // if (data && data.success) {
          //   UserStore.setGroups(data.message);
          // }
        } catch (e) {
          console.warn('getPayload ERR', e);
        }

        const user = await bridge.send('VKWebAppGetUserInfo');
        localStorage.setItem('userInfo', JSON.stringify(user));

        UserStore.setUserInfo(user);
      })();
    }, []);

    console.log('platform', toJS(UserStore));

    return children;
  },
);
