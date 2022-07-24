import { useQuery } from '@tanstack/react-query';
import { uiMain } from '@/ui/index';
import { IpcWorkerMessageType } from '@/lib/ipc/ipcWorker';
import { QueryKey } from './keys';

const getSettingsLastActiveVaultId = async (): Promise<string | null> => {
  const resp = await uiMain.workerInvoke({
    type: IpcWorkerMessageType.SETTINGS_GET_LAST_ACTIVE_VAULT_ID,
  });
  return resp.vaultId;
};

export function useSettingsLastActiveVaultId() {
  return useQuery([QueryKey.VAULT_PAGES], () => getSettingsLastActiveVaultId());
}
