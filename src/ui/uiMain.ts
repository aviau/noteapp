import { Ui2MainMessageType } from "@/lib/ipc/ui2Main";
import { IpcUiService } from "./services/ipc/ipcUiService";
import {
    Ui2MainRequest,
    Ui2MainResponseFor,
} from "@/lib/ipc/ui2Main";

export class UiMain {
    private readonly ipcUiService: IpcUiService;

    constructor(ipcUiService: IpcUiService) {
        this.ipcUiService = ipcUiService;
    }

    main(): void {
        try {
            this.startup();
        } catch (error) {
            console.log((error as any).message);
        }
    }

    private async startup(): Promise<void> {
        const resp = await this.invokeUi2Main({
            type: Ui2MainMessageType.UTILS_PING,
            message: "UI Started",
        });
        console.log(`Main ping response: ${resp.message}`);
    }

    async invokeUi2Main<T extends Ui2MainRequest>(
        request: T
    ): Promise<Ui2MainResponseFor<T>> {
        return this.ipcUiService.invokeUi2Main(request);
    }


}

export const uiMainInstance = new UiMain(new IpcUiService());
uiMainInstance.main();
