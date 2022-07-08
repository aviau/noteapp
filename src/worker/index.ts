import { ipcRenderer } from 'electron';
import { WorkerMain } from './workerMain';

const workerMain = new WorkerMain(ipcRenderer);
workerMain.main();
