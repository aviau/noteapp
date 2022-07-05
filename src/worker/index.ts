import { IpcWorkerConnection } from './services/ipc/ipcWorkerConnection';
import { WorkerMain } from './workerMain';

const workerMain = new WorkerMain(new IpcWorkerConnection());
workerMain.main();
