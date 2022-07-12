import { createContext } from 'react';

import { Settings } from './types';

export const defaultSettings: Settings = {
  appearance: {
    mode: 'dark',
  },
};

type SettingsContextType = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  setSettings: () => {},
});
