import React, { useRef } from 'react';

import { useSettingsLastActiveVaultId } from '@/ui/hooks/query';
import { UiMain } from '@/ui/uiMain';
import { IpcUiService } from '@/ui/services/ipc/ipcUiService';
import { GlobalStateContext } from './context';

interface Props {
  children: React.ReactNode;
}

function createUiMain() {
  const uiMainInstance = new UiMain(new IpcUiService());
  uiMainInstance.main();
  return uiMainInstance;
}

// GlobalStateProvider provies the minimum context that is
// required for the app to render.
export function GlobalStateProvider({ children }: Props) {
  const box = useRef<UiMain>();
  if (!box.current) {
    box.current = createUiMain();
  }
  const { data: activeVaultId } = useSettingsLastActiveVaultId(box.current);
  if (!activeVaultId) {
    return <></>;
  }

  return (
    <GlobalStateContext.Provider
      value={{
        activeVaultId,
        uiMain: box.current,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
