import { IpcWorkerMessageType, IpcWorkerResponseOf } from '@/lib/ipc/ipcWorker';
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
    // Init communications.
    this.ipcUiService.mainLog('Started.');
    this.ipcUiService.mainPing();
    this.ipcUiService.start();

    // Say Hi.
    const resp: IpcWorkerResponseOf<IpcWorkerMessageType.UTILS_PING> =
      await this.ipcUiService.workerInvoke({
        type: IpcWorkerMessageType.UTILS_PING,
        data: {
          message: 'Hello from UI',
        },
      });
    this.ipcUiService.mainLog(`Said hi to worker, he replied ${resp.message}.`);
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
