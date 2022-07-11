import { assertUnreachable } from 'src/lib/asserts';
import { IpcUiMessage, IpcUiMessageType } from 'src/lib/ipc/ipcUi';
import { IpcUiService } from './services/ipc/ipcUiService';

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
    // Say hi and ask the main process for new channels.
    this.ipcUiService.mainLog('Started.');
    this.ipcUiService.onWorkerMessage = (m) => {
      this.onWorkerMessage(m);
    };
    this.ipcUiService.mainPing();
    this.ipcUiService.start();
  }

  private async onWorkerMessage(message: IpcUiMessage): Promise<void> {
    const messageType = message.type;
    switch (messageType) {
      case IpcUiMessageType.PING:
        this.ipcUiService.mainLog(`PING: ${message.data.message}`);
        break;
      default:
        this.ipcUiService.mainLog(`Unhandled Worker message: ${message}`);
        assertUnreachable(messageType);
    }
  }

  quit(): void {
    this.ipcUiService.workerQuit();
  }
}
