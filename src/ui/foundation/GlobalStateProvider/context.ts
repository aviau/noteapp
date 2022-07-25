import { createContext } from 'react';

export interface GlobalState {
  activeVaultId: string;
}

export const defaultGlobalState: GlobalState = {
  activeVaultId: '',
};

export const GlobalStateContext =
  createContext<GlobalState>(defaultGlobalState);
