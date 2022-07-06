import Electron from 'electron';

import {
  IpcChannel,
  IpcChannelMessage,
  IpcChannelResponse,
} from '../../../common/ipcMain';
import { IpcMainConnectionEvent } from './ipcMainConnectionEvent';
import { IpcMainConnectionInvokeEvent } from './ipcMainConnectionInvokeEvent';

export type IpcMainConnectionCallback<T extends IpcChannel> = (
  event: IpcMainConnectionEvent,
  message: IpcChannelMessage<T>
) => void;

export type IpcMainConnectionHandler<T extends IpcChannel> = (
  event: IpcMainConnectionInvokeEvent,
  message: IpcChannelMessage<T>
) => Promise<IpcChannelResponse<T>>;

/*
 * The IPC connection running in the main process. Responsible for
 * communicating with the renderer process.
 *
 * No application logic goes here, just passing messages.
 */
export class IpcMainConnection {
  private ipcMain: Electron.IpcMain;

  constructor(ipcMain: Electron.IpcMain) {
    this.ipcMain = ipcMain;
  }

  private on<T extends IpcChannel>(
    channel: T,
    callback: (
      event: IpcMainConnectionEvent,
      message: IpcChannelMessage<T>
    ) => void
  ) {
    const subscription = (event: Electron.IpcMainEvent, arg: unknown) => {
      const message = arg as IpcChannelMessage<T>;
      const ipcMainConnectionEvent = new IpcMainConnectionEvent(event);
      callback(ipcMainConnectionEvent, message);
    };
    this.ipcMain.on(channel, subscription);
  }

  private handle<T extends IpcChannel>(
    channel: T,
    callback: (
      event: IpcMainConnectionInvokeEvent,
      message: IpcChannelMessage<T>
    ) => Promise<IpcChannelResponse<T>>
  ) {
    const subscription = async (
      event: Electron.IpcMainInvokeEvent,
      arg: unknown
    ): Promise<IpcChannelResponse<T>> => {
      const message = arg as IpcChannelMessage<T>;
      const ipcMainConnectionInvokeEvent = new IpcMainConnectionInvokeEvent(
        event
      );
      return callback(ipcMainConnectionInvokeEvent, message);
    };
    this.ipcMain.handle(channel, subscription);
  }

  handlePing(
    callback: IpcMainConnectionHandler<IpcChannel.MAIN_UTILS_PING>
  ): void {
    this.handle(IpcChannel.MAIN_UTILS_PING, callback);
  }

  onRequestChannelRefresh(
    callback: IpcMainConnectionCallback<IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH>
  ): void {
    this.on(IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, callback);
  }

  onLog(callback: IpcMainConnectionCallback<IpcChannel.MAIN_UTILS_LOG>): void {
    this.on(IpcChannel.MAIN_UTILS_LOG, callback);
  }
}
