import { action, makeObservable, observable } from 'mobx';

export interface IPersonForm {
  surname: string;
  name: string;
  patronymic: string;
  citizenship: string;
  birthDate: string;
}

export interface IInfoForm {
  registrationPlace?: string;
  groom?: IPersonForm;
  bride?: IPersonForm;
}

export class InfoFormStore {
  data: IInfoForm = {};

  setData = (data: IInfoForm) => {
    this.data = data;
  };

  resetStore = () => {
    this.data = {};
  };

  constructor() {
    makeObservable(this, {
      data: observable,
      setData: action,
      resetStore: action,
    });
  }
}
