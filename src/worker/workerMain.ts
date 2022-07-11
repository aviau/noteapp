import Electron from 'electron';
import { IpcWorkerMessage, IpcWorkerMessageType } from 'src/lib/ipc/ipcWorker';
import { assertUnreachable } from 'src/lib/asserts';
import { IpcWorkerService } from './services/ipc';
import { ConfigurationService } from './services/configuration';

export class WorkerMain {
  ipcWorkerService: IpcWorkerService;

  constructor(ipcRenderer: Electron.IpcRenderer) {
    this.ipcWorkerService = new IpcWorkerService(ipcRenderer);
  }

  main(): void {
    try {
      this.startup();
    } catch (error) {
      this.ipcWorkerService.mainLog((error as any).message);
    }
  }

  private async startup(): Promise<void> {
    this.ipcWorkerService.mainLog('Started.');
    this.ipcWorkerService.onUiMessage = (m) => {
      this.onUiMessage(m);
    };
    this.ipcWorkerService.start();

    const configurationService = new ConfigurationService(
      await this.ipcWorkerService.mainUtilsGetUserDataPath()
    );
    this.ipcWorkerService.mainLog(
      `ConfigurationService loaded with vault at ${
        (await configurationService.getVaultConfiguration()).data.current
      }.`
    );
  }

  private async onUiMessage(message: IpcWorkerMessage): Promise<void> {
    const messageType = message.type;
    switch (messageType) {
      case IpcWorkerMessageType.PING:
        this.ipcWorkerService.mainLog(`PING: ${message.data.message}`);
        break;
      case IpcWorkerMessageType.QUIT:
        this.ipcWorkerService.mainQuit();
        break;
      default:
        this.ipcWorkerService.mainLog(`Unhandled UI message: ${message}`);
        assertUnreachable(messageType);
    }
  }
}
