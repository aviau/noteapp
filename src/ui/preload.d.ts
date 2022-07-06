import {
  IpcChannel,
  IpcChannelMessage,
  IpcChannelResponse,
} from '../lib/ipcMain';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage<T extends IpcChannel>(
          channel: T,
          message: IpcChannelMessage<T>
        ): void;
        on<T extends IpcChannel>(
          channel: T,
          callback: (message: IpcChannelMessage<T>) => void
        ): (() => void) | undefined;
        invoke<T extends IpcChannel>(
          channel: T,
          message: IpcChannelMessage<T>
        ): Promise<IpcChannelResponse<T>>;
      };
    };
  }
}

export {};
