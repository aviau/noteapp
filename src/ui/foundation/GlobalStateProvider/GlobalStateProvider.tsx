import React from 'react';

import { useSettingsLastActiveVaultId } from '@/ui/hooks/query';
import { GlobalStateContext } from './context';

interface Props {
  children: React.ReactNode;
}

// GlobalStateProvider provies the minimum context that is
// required for the app to render.
export function GlobalStateProvider({ children }: Props) {
  const { data: activeVaultId } = useSettingsLastActiveVaultId();
  if (!activeVaultId) {
    return <></>;
  }

  return (
    <GlobalStateContext.Provider value={{ activeVaultId }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
