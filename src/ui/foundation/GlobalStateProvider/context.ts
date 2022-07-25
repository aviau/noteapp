import { createContext } from 'react';
import { UiMain } from '@/ui/uiMain';

export interface GlobalState {
  activeVaultId: string;
  uiMain: UiMain;
}

export const GlobalStateContext = createContext<GlobalState>({} as GlobalState);
