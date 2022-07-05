import Electron from 'electron';

import { IpcChannel, IpcChannelMessage } from '../../../common/ipc';
import { IpcMainConnectionEvent } from './ipcMainConnectionEvent';

function on<T extends IpcChannel>(
  ipcMain: Electron.IpcMain,
  channel: T,
  callback: (event: IpcMainConnectionEvent, args: IpcChannelMessage<T>) => void
) {
  const subscription = (event: Electron.IpcMainEvent, args: unknown[]) => {
    const message = args[0] as IpcChannelMessage<T>;
    const ipcMainConnectionEvent = new IpcMainConnectionEvent(event);
    callback(ipcMainConnectionEvent, message);
  };
  ipcMain.on(channel, subscription);
}

export type IpcMainConnectionCallback<T extends IpcChannel> = (
  event: IpcMainConnectionEvent,
  message: IpcChannelMessage<T>
) => void;

/*
 * The IPC connection running in the main process. Responsible for
 * communicating with the renderer process.
 *
 * No application logic goes here, just passing messages.
 */
export class IpcMainConnection {
  ipcMain: Electron.IpcMain;

  constructor(ipcMain: Electron.IpcMain) {
    this.ipcMain = ipcMain;
  }

  onPing(
    callback: IpcMainConnectionCallback<IpcChannel.MAIN_UTILS_PING>
  ): void {
    on(this.ipcMain, IpcChannel.MAIN_UTILS_PING, callback);
  }

  onRequestChannelRefresh(
    callback: IpcMainConnectionCallback<IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH>
  ): void {
    on(this.ipcMain, IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, callback);
  }

  onLog(callback: IpcMainConnectionCallback<IpcChannel.MAIN_UTILS_LOG>): void {
    on(this.ipcMain, IpcChannel.MAIN_UTILS_LOG, callback);
  }
}