import { createContext } from 'react';
import { UiMain, uiMainInstance } from '@/ui/uiMain';

export interface GlobalState {
  activeVaultId: string;
  uiMain: UiMain;
}

export const defaultGlobalState: GlobalState = {
  activeVaultId: '',
  uiMain: uiMainInstance,
};

export const GlobalStateContext =
  createContext<GlobalState>(defaultGlobalState);
