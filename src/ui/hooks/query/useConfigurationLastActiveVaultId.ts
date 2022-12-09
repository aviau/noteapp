import { useQuery } from "@tanstack/react-query";
import { UiMain } from "@/ui/uiMain";
import { QueryKey } from "./keys";
import { Ui2MainMessageType } from "@/lib/ipc/ui2Main";
import { ConfigurationKey } from "@/lib/configuration";

const getConfigurationLastActiveVaultId = async (
    uiMain: UiMain
): Promise<string | null> => {
    const resp = await uiMain.invokeUi2Main({
        type: Ui2MainMessageType.CONFIGURATION_GET,
        key: ConfigurationKey.VAULT_LAST_ACTIVE,
    });
    return resp;
};

export function useSettingsLastActiveVaultId(uiMain: UiMain) {
    // Unlike other queries, this hook requires specifying uiMain.
    // This is because it is used by the GlobalStateProvider, which can't
    // use his own context.
    return useQuery([QueryKey.VAULT_PAGES], () =>
        getConfigurationLastActiveVaultId(uiMain)
    );
}
