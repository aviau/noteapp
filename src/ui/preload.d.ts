import { IpcChannel, IpcChannelMessage } from '../common/ipc';

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
      };
    };
  }
}

export {};
