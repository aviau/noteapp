import Electron from 'electron';
import { IpcWorkerService } from './services/ipc';

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
    this.ipcWorkerService.start();
  }
}
