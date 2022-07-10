import Electron from 'electron';

import {
  IpcMainChannel,
  IpcMainChannelMessage,
  IpcMainChannelResponse,
} from 'src/lib/ipcMain';
import { IpcMainConnectionEvent } from './ipcMainConnectionEvent';
import { IpcMainConnectionInvokeEvent } from './ipcMainConnectionInvokeEvent';

export type IpcMainServiceCallback<T extends IpcMainChannel> = (
  event: IpcMainConnectionEvent,
  message: IpcMainChannelMessage<T>
) => void;

export type IpcMainServiceHandler<T extends IpcMainChannel> = (
  event: IpcMainConnectionInvokeEvent,
  message: IpcMainChannelMessage<T>
) => Promise<IpcMainChannelResponse<T>>;

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

  private on<T extends IpcMainChannel>(
    channel: T,
    callback: (
      event: IpcMainConnectionEvent,
      message: IpcMainChannelMessage<T>
    ) => void
  ) {
    const subscription = (event: Electron.IpcMainEvent, arg: unknown) => {
      const message = arg as IpcMainChannelMessage<T>;
      const ipcMainConnectionEvent = new IpcMainConnectionEvent(event);
      callback(ipcMainConnectionEvent, message);
    };
    this.ipcMain.on(channel, subscription);
  }

  private handle<T extends IpcMainChannel>(
    channel: T,
    callback: (
      event: IpcMainConnectionInvokeEvent,
      message: IpcMainChannelMessage<T>
    ) => Promise<IpcMainChannelResponse<T>>
  ) {
    const subscription = async (
      event: Electron.IpcMainInvokeEvent,
      arg: unknown
    ): Promise<IpcMainChannelResponse<T>> => {
      const message = arg as IpcMainChannelMessage<T>;
      const ipcMainConnectionInvokeEvent = new IpcMainConnectionInvokeEvent(
        event
      );
      return callback(ipcMainConnectionInvokeEvent, message);
    };
    this.ipcMain.handle(channel, subscription);
  }

  /*
   *********
   ** IPC **
   *********
   */

  onRequestChannelRefresh(
    callback: IpcMainServiceCallback<IpcMainChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH>
  ): void {
    this.on(IpcMainChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, callback);
  }

  /*
   ***********
   ** UTILS **
   ***********
   */

  handlePing(
    callback: IpcMainServiceHandler<IpcMainChannel.MAIN_UTILS_PING>
  ): void {
    this.handle(IpcMainChannel.MAIN_UTILS_PING, callback);
  }

  onLog(callback: IpcMainServiceCallback<IpcMainChannel.MAIN_UTILS_LOG>): void {
    this.on(IpcMainChannel.MAIN_UTILS_LOG, callback);
  }

  handleGetUserDataPath(
    callback: IpcMainServiceHandler<IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH>
  ): void {
    this.handle(IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH, callback);
  }

  onQuit(
    callback: IpcMainServiceCallback<IpcMainChannel.MAIN_UTILS_QUIT>
  ): void {
    this.on(IpcMainChannel.MAIN_UTILS_QUIT, callback);
  }
}
