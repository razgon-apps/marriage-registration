import { action, makeObservable, observable } from 'mobx';

export enum PagesEnum {
  HOME = 'home',
  ALLOW_ACCESS = 'allow-access',
  CREATE = 'create',
  INFO = 'info',
  LOADING = 'loading',
  NEARLY_READY = 'nearly-ready',
  RESULT = 'result',
  ADMIN = 'admin',
}

export interface IGroup {
  id: number | string;
  isSubscriptionToMessages?: boolean;
  name?: string;
  imgUrl?: string;
}

export interface IPageData {
  group1?: IGroup;
  group2?: IGroup;
  groups?: IGroup[];
  sharingText?: string;
  checkedAccessPhotoInAlbum?: boolean;
  checkedAccessHaveFun?: boolean;
}

export interface IPagesData {
  [PagesEnum.HOME]: any;
  [PagesEnum.ALLOW_ACCESS]: any;
  [PagesEnum.CREATE]: IPageData;
  [PagesEnum.INFO]: any;
  [PagesEnum.LOADING]: IPageData;
  [PagesEnum.NEARLY_READY]: IPageData;
  [PagesEnum.RESULT]: any;
  [PagesEnum.ADMIN]: any;
}

const initPagesData = {
  [PagesEnum.HOME]: {} as IPageData,
  [PagesEnum.ALLOW_ACCESS]: {} as IPageData,
  [PagesEnum.CREATE]: {} as IPageData,
  [PagesEnum.INFO]: {} as IPageData,
  [PagesEnum.LOADING]: {} as IPageData,
  [PagesEnum.NEARLY_READY]: {} as IPageData,
  [PagesEnum.RESULT]: {} as IPageData,
  [PagesEnum.ADMIN]: {} as IPageData,
};

export class PagesStore {
  loading = false;
  activePage: PagesEnum = PagesEnum.HOME;
  data: IPagesData = initPagesData;

  setActivePage = (activePage: PagesEnum) => {
    this.activePage = activePage;
  };

  setCurrentPageData = (pageName: PagesEnum, data: IPageData) => {
    this.data[pageName] = data;
  };

  setPageData = (data: IPagesData) => {
    this.data = data;
  };

  resetStore = () => {
    this.activePage = PagesEnum.HOME;
    this.loading = false;
  };

  constructor() {
    makeObservable(this, {
      loading: observable,
      activePage: observable,
      setActivePage: action,
      setCurrentPageData: action,
      setPageData: action,
      resetStore: action,
    });
  }
}
