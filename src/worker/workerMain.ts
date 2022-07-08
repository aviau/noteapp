import Electron from 'electron';
import { IpcWorkerConnection } from './services/ipc/ipcWorkerConnection';

export class WorkerMain {
  ipcWorkerConnection: IpcWorkerConnection;

  constructor(ipcRenderer: Electron.IpcRenderer) {
    this.ipcWorkerConnection = new IpcWorkerConnection(ipcRenderer);
  }

  main(): void {
    try {
      this.startup();
    } catch (error) {
      this.ipcWorkerConnection.mainLog((error as any).message);
    }
  }

  private async startup(): Promise<void> {
    this.ipcWorkerConnection.mainLog('Started.');
    this.ipcWorkerConnection.start();
  }
}
