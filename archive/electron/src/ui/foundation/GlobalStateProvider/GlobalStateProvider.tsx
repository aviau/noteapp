import React, { useRef } from 'react';

import { useSettingsLastActiveVaultId } from '@/ui/hooks/query';
import { IpcUiService } from '@/ui/services/ipc/ipcUiService';
import { UiMain } from '@/ui/uiMain';
import { CommandEventTarget, GlobalStateContext } from './context';

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
  const uiMainRef = useRef<UiMain>();
  uiMainRef.current ??= createUiMain();

  const commandEventTargetRef = useRef<CommandEventTarget>();
  commandEventTargetRef.current ??= new CommandEventTarget();

  const { data: activeVaultId } = useSettingsLastActiveVaultId(
    uiMainRef.current
  );

  if (!activeVaultId) {
    return <></>;
  }

  return (
    <GlobalStateContext.Provider
      value={{
        activeVaultId,
        commandEventTarget: commandEventTargetRef.current,
        uiMain: uiMainRef.current,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
