import React from 'react';

import { InfoFormStore } from './info-form-store';
import { PanelStore } from './panel-store';

export const stores = {
  PanelStore: new PanelStore(),
  InfoFormStore: new InfoFormStore(),
};

export const storesContext = React.createContext(stores);
