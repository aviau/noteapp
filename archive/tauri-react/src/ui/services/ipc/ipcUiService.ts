import {
    Ui2MainRequest,
    Ui2MainResponseFor,
} from "@/lib/ipc/ui2Main";
import { invoke } from "@tauri-apps/api/tauri";

/*
 * Responsible for all communications with the main process.
 */
export class IpcUiService {

    async invokeUi2Main<T extends Ui2MainRequest>(request: T): Promise<Ui2MainResponseFor<T>> {
        try {
            return await invoke(request.type, request);
        }
        catch (err) {
            console.log("[IpcUiService error]", err);
            throw err;
        }
    }

}
