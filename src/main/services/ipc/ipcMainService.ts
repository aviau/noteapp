import Electron from 'electron';

import {
  IpcChannel,
  IpcChannelMessage,
  IpcChannelResponse,
} from '../../../lib/ipcMain';
import { IpcMainConnectionEvent } from './ipcMainConnectionEvent';
import { IpcMainConnectionInvokeEvent } from './ipcMainConnectionInvokeEvent';

export type IpcMainServiceCallback<T extends IpcChannel> = (
  event: IpcMainConnectionEvent,
  message: IpcChannelMessage<T>
) => void;

export type IpcMainServiceHandler<T extends IpcChannel> = (
  event: IpcMainConnectionInvokeEvent,
  message: IpcChannelMessage<T>
) => Promise<IpcChannelResponse<T>>;

/*
 * The IPC connection running in the main process. Responsible for
 * communicating with the renderer process.
 *
 * No application logic goes here, just passing messages.
 */
export class IpcMainService {
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
    callback: IpcMainServiceHandler<IpcChannel.MAIN_UTILS_PING>
  ): void {
    this.handle(IpcChannel.MAIN_UTILS_PING, callback);
  }

  onRequestChannelRefresh(
    callback: IpcMainServiceCallback<IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH>
  ): void {
    this.on(IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, callback);
  }

  onLog(callback: IpcMainServiceCallback<IpcChannel.MAIN_UTILS_LOG>): void {
    this.on(IpcChannel.MAIN_UTILS_LOG, callback);
  }
}
