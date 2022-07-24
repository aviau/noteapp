import { useQuery } from '@tanstack/react-query';
import { uiMain } from '@/ui/index';
import { IpcWorkerMessageType } from '@/lib/ipc/ipcWorker';
import { QueryKey } from './keys';

const getVaultPages = async (vauldId: string): Promise<string[]> => {
  const resp = await uiMain.workerInvoke({
    type: IpcWorkerMessageType.VAULT_GET_FILES,
    vaultId: vauldId,
  });
  return resp.files;
};

export function useVaultPages(vaultId: string) {
  return useQuery([QueryKey.VAULT_PAGES, vaultId], () =>
    getVaultPages(vaultId)
  );
}
