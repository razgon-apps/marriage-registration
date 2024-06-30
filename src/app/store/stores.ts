import React from 'react';

import { InfoFormStore } from './info-form-store';
import { PagesStore } from './pages-store';
import { UserStore } from './user-store';

export const stores = {
  PagesStore: new PagesStore(),
  InfoFormStore: new InfoFormStore(),
  UserStore: new UserStore(),
};

export const storesContext = React.createContext(stores);
