import { UserInfo } from '@vkontakte/vk-bridge';
import { action, makeAutoObservable, makeObservable, observable } from 'mobx';

export interface IUserInfo {
  id: number;
  bdate: string;
  bdate_visibility: number;
  city: {
    id: number;
    title: string;
  };
  country: {
    id: number;
    title: string;
  };
  timezone: number;
  photo_200: string;
  photo_max_orig: string;
  sex: number;
  photo_100: string;
  first_name: string;
  last_name: string;
  can_access_closed: boolean;
  is_closed: boolean;
}

export interface IGroups {
  [key: string]: number;
}

export enum PlatformEnum {
  WEB = 'web',
  MOBILE = 'mobile',
  MOBILE_WEB = 'mobile-web',
  IOS = 'ios',
  ANDROID = 'android',
}

export class UserStore {
  userInfo: UserInfo | null = null;
  token = '';
  groups: IGroups | null = null;
  platform: PlatformEnum | null = null;

  setUserInfo = (data: UserInfo) => {
    this.userInfo = data;
  };

  setUserToken = (token: string) => {
    this.token = token;
  };

  setGroups = (data: IGroups) => {
    this.groups = data;
  };

  setPlatform = (platform: PlatformEnum | null) => {
    this.platform = platform;
  };

  resetStore = () => {
    this.userInfo = null;
    this.groups = null;
  };

  constructor() {
    makeAutoObservable(this);
  }
}
