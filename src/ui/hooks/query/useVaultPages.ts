import { useQuery } from "@tanstack/react-query";
import { GlobalStateContext } from "@/ui/foundation/GlobalStateProvider";
import { useContext } from "react";
import { UiMain } from "@/ui/uiMain";
import { QueryKey } from "./keys";

const getVaultPages = async (
    uiMain: UiMain,
    vauldId: string
): Promise<string[]> => {
    /*
  const resp = await uiMain.workerInvoke({
    type: IpcWorkerMessageType.VAULT_GET_FILES,
    vaultId: vauldId,
  });
  */
    return ["WIP"];
};

export function useVaultPages(vaultId: string) {
    const { uiMain } = useContext(GlobalStateContext);
    return useQuery([QueryKey.VAULT_PAGES, vaultId], () =>
        getVaultPages(uiMain, vaultId)
    );
}
