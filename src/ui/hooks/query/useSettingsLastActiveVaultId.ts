import { useQuery } from '@tanstack/react-query';
import { IpcWorkerMessageType } from '@/lib/ipc/ipcWorker';
import { useContext } from 'react';
import { GlobalStateContext } from '@/ui/foundation/GlobalStateProvider';
import { UiMain } from '@/ui/uiMain';
import { QueryKey } from './keys';

const getSettingsLastActiveVaultId = async (
  uiMain: UiMain
): Promise<string | null> => {
  const resp = await uiMain.workerInvoke({
    type: IpcWorkerMessageType.SETTINGS_GET_LAST_ACTIVE_VAULT_ID,
  });
  return resp.vaultId;
};

export function useSettingsLastActiveVaultId() {
  const { uiMain } = useContext(GlobalStateContext);
  return useQuery([QueryKey.VAULT_PAGES], () =>
    getSettingsLastActiveVaultId(uiMain)
  );
}
