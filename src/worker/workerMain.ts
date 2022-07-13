import Electron from 'electron';
import {
  IpcWorkerMessageType,
  IpcWorkerMessage,
  IpcWorkerResponse,
  IpcWorkerResponseOf,
} from '@/lib/ipc/ipcWorker';
import { assertUnreachable } from '@/lib/asserts';
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
    this.ipcWorkerService.onWorkerMessage = (m) => {
      return this.onWorkerMessage(m);
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

  private async onWorkerMessage(
    message: IpcWorkerMessage
  ): Promise<IpcWorkerResponse> {
    const messageType = message.type;
    switch (messageType) {
      case IpcWorkerMessageType.UTILS_PING: {
        this.ipcWorkerService.mainLog(`PING: ${message.data.message}`);
        const resp: IpcWorkerResponseOf<typeof messageType> = {
          message: 'workerpong',
        };
        return resp;
      }
      case IpcWorkerMessageType.WINDOWS_MINIMIZE: {
        this.ipcWorkerService.mainWindowsMinimize();
        const resp: IpcWorkerResponseOf<typeof messageType> = null;
        return resp;
      }
      case IpcWorkerMessageType.WINDOWS_MAXIMIZE: {
        this.ipcWorkerService.mainWindowsMaximize();
        const resp: IpcWorkerResponseOf<typeof messageType> = null;
        return resp;
      }
      case IpcWorkerMessageType.WINDOWS_QUIT: {
        this.ipcWorkerService.mainWindowsQuit();
        const resp: IpcWorkerResponseOf<typeof messageType> = null;
        return resp;
      }
      default: {
        this.ipcWorkerService.mainLog(`Unhandled worker message: ${message}`);
        return assertUnreachable(messageType);
      }
    }
  }
}
