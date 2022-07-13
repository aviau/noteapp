import { assertUnreachable } from '@/lib/asserts';
import {
  IpcUiMessageOf,
  IpcUiMessageType,
  IpcUiMessage,
  IpcUiResponse,
} from '@/lib/ipc/ipcUi';
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
    this.ipcUiService.onUiMessage = async (m) => {
      return this.onUiMessage(m);
    };
    this.ipcUiService.mainPing();
    this.ipcUiService.start();
  }

  private async onUiMessage(message: IpcUiMessage): Promise<IpcUiResponse> {
    const messageType = message.type;
    switch (messageType) {
      case IpcUiMessageType.UTILS_PING: {
        const msgPing: IpcUiMessageOf<IpcUiMessageType.UTILS_PING> = message;
        this.ipcUiService.mainLog(`PING: ${msgPing.data.message}`);
        return null;
      }
      default:
        this.ipcUiService.mainLog(`Unhandled ui message: ${message}`);
        return assertUnreachable(messageType);
    }
  }

  workerMinimize(): void {
    this.ipcUiService.workerWindowsMinimize();
  }

  workerMaximize(): void {
    this.ipcUiService.workerWindowsMaximize();
  }

  workerQuit(): void {
    this.ipcUiService.workerWindowsQuit();
  }
}
