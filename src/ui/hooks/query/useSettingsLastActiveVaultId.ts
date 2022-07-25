import { useQuery } from '@tanstack/react-query';
import { IpcWorkerMessageType } from '@/lib/ipc/ipcWorker';
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

export function useSettingsLastActiveVaultId(uiMain: UiMain) {
  // Unlike other queries, this hook requires specifying uiMain.
  // This is because it is used by the GlobalStateProvider, which can't
  // use his own context.
  return useQuery([QueryKey.VAULT_PAGES], () =>
    getSettingsLastActiveVaultId(uiMain)
  );
}
