import { createContext } from 'react';

import { UiMain } from '@/ui/uiMain';
import { CommandEventTarget } from '../types';

export interface GlobalState {
  activeVaultId: string;
  uiMain: UiMain;
  commandEventTarget: CommandEventTarget;
}

export const GlobalStateContext = createContext<GlobalState>({} as GlobalState);
