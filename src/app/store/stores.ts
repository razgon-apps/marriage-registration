import React from 'react';

import { InfoFormStore } from './info-form-store';
import { PanelStore } from './panel-store';
import { UserStore } from './user-store';

export const stores = {
  PanelStore: new PanelStore(),
  InfoFormStore: new InfoFormStore(),
  UserStore: new UserStore(),
};

export const storesContext = React.createContext(stores);
