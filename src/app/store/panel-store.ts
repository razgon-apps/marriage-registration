import { action, makeObservable, observable } from 'mobx';

export enum PagesEnum {
  HOME = 'home',
  ALLOW_ACCESS = 'allow-access',
  RESULT = 'result',
  LOADING = 'loading',
  CREATE = 'create',
  INFO = 'info',
}
export class PanelStore {
  loading = false;
  activePanel: PagesEnum = PagesEnum.HOME;

  setActivePanel = (activePanel: PagesEnum) => {
    this.activePanel = activePanel;
  };

  resetStore = () => {
    this.activePanel = PagesEnum.HOME;
    this.loading = false;
  };

  constructor() {
    makeObservable(this, {
      loading: observable,
      activePanel: observable,
      setActivePanel: action,
      resetStore: action,
    });
  }
}
