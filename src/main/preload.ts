import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IpcChannel, IpcChannelMessage } from '../common/ipc';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage<T extends IpcChannel>(
      channel: T,
      message: IpcChannelMessage<T>
    ) {
      ipcRenderer.send(channel, [message]);
    },
    on<T extends IpcChannel>(
      channel: T,
      callback: (message: IpcChannelMessage<T>) => void
    ) {
      const subscription = (_event: IpcRendererEvent, args: unknown[]) => {
        const message = args[0] as IpcChannelMessage<T>;
        callback(message);
      };
      ipcRenderer.on(channel, subscription);
      return () => ipcRenderer.removeListener(channel, subscription);
    },
  },
});
