import { action, makeObservable, observable } from 'mobx';

export interface IInfoForm {
  surname?: string;
  name?: string;
  patronymic?: string;
  citizenship?: string;
  birthDate?: string;
  birthPlace?: string;
  spouseSurname?: string;
  spouseName?: string;
  spousePatronymic?: string;
  spouseCitizenship?: string;
  spouseBirthDate?: string;
  spouseBirthPlace?: string;
  marriageDate?: string;
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
