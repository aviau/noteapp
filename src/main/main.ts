/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app, ipcMain } from 'electron';
import { IpcMainConnection } from './ipcMainConnection';
import { NoteMain } from './noteMain';

const noteMain = new NoteMain(app, new IpcMainConnection(ipcMain));
noteMain.main();
