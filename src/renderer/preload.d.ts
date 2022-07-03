import { IPCChannel, IPCChannelMessage } from '../common/IPCChannel';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage<T extends IPCChannel>(
          channel: T,
          message: IPCChannelMessage<T>
        ): void;
        on<T extends IPCChannel>(
          channel: T,
          callback: (message: IPCChannelMessage<T>) => void
        ): (() => void) | undefined;
      };
    };
  }
}

export {};
