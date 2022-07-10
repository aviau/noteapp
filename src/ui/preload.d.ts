import {
  IpcMainChannel,
  IpcMainChannelMessage,
  IpcMainChannelResponse,
} from '../lib/ipcMain';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage<T extends IpcMainChannel>(
          channel: T,
          message: IpcMainChannelMessage<T>
        ): void;
        on<T extends IpcMainChannel>(
          channel: T,
          callback: (message: IpcMainChannelMessage<T>) => void
        ): (() => void) | undefined;
        invoke<T extends IpcMainChannel>(
          channel: T,
          message: IpcMainChannelMessage<T>
        ): Promise<IpcMainChannelResponse<T>>;
      };
    };
  }
}

export {};
