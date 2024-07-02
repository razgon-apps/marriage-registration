import axios from 'axios';

import {
  IGroup,
  IPageData,
  IPagesData,
  PagesEnum,
} from 'app/store/pages-store';
import { APP_ID } from 'shared/constants';

import { BASE_URL } from './api.constants';
import { IFullResponse } from './api.model';

export const setPayload = async (pageName: PagesEnum, payload: IPageData) => {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/set-app`,
    data: { payload, appId: APP_ID, pageName },
  });
};

export const getPayload = async (): Promise<IFullResponse<IPagesData>> => {
  return axios({
    url: `${BASE_URL}/get-app/${APP_ID}`,
  });
};
