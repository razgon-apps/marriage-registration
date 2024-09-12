import { ReactNode, useEffect } from 'react';

import bridge from '@vkontakte/vk-bridge';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { getPayload } from 'app/api';
import { ADMINS, USER_ID } from 'shared/constants';
import { getUserPlatform } from 'shared/utils';

import { useStores } from '../store/use-stores';

export const WithVkBridge = observer(
  ({ children }: { children: ReactNode }) => {
    const { UserStore, PagesStore } = useStores();

    useEffect(() => {
      (async () => {
        const platform = await getUserPlatform();
        UserStore.setPlatform(platform);

        const user = await bridge.send('VKWebAppGetUserInfo');
        localStorage.setItem('userInfo', JSON.stringify(user));

        UserStore.setUserInfo(user);
      })();
    }, []);

    useEffect(() => {
      (async () => {
        try {
          const res = await getPayload();

          const { data: { response, success } = {} } = res;

          if (response && success) {
            PagesStore.setPageData(response);

            const dataAdmins = response.admin.admins
              .map((item: any) => Number(item.id))
              .filter(Boolean);
            const admins = [...ADMINS, ...dataAdmins];

            UserStore.setUserIsAdmin(admins.includes(USER_ID));
          }
        } catch (e) {
          console.warn('getPayload ERR', e);
        }
      })();
    }, []);

    return children;
  },
);
