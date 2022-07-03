import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPCChannel, IPCChannelMessage } from '../common/IPCChannel';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage<T extends IPCChannel>(
      channel: T,
      message: IPCChannelMessage<T>
    ) {
      ipcRenderer.send(channel, [message]);
    },
    on<T extends IPCChannel>(
      channel: T,
      callback: (message: IPCChannelMessage<T>) => void
    ) {
      const subscription = (_event: IpcRendererEvent, args: unknown[]) => {
        const message = args[0] as IPCChannelMessage<T>;
        callback(message);
      };
      ipcRenderer.on(channel, subscription);
      return () => ipcRenderer.removeListener(channel, subscription);
    },
  },
});
