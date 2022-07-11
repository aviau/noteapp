import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {
  IpcMainChannel,
  IpcMainChannelMessage,
  IpcMainChannelResponse,
} from '@/lib/ipc/ipcMain';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage<T extends IpcMainChannel>(
      channel: T,
      message: IpcMainChannelMessage<T>
    ) {
      ipcRenderer.send(channel, message);
    },
    on<T extends IpcMainChannel>(
      channel: T,
      callback: (message: IpcMainChannelMessage<T>) => void
    ) {
      const subscription = (event: IpcRendererEvent, arg: unknown) => {
        const message = arg as IpcMainChannelMessage<T>;
        callback(message);
      };
      ipcRenderer.on(channel, subscription);
      return () => ipcRenderer.removeListener(channel, subscription);
    },
    async invoke<T extends IpcMainChannel>(
      channel: T,
      message: IpcMainChannelMessage<T>
    ): Promise<IpcMainChannelResponse<T>> {
      return ipcRenderer.invoke(channel, message);
    },
  },
});

(function () {
  // Intercept IpcChannel.RENDERER_IPC_SET_CHANNEL. Its MessagePort won't
  // go trough.
  //
  // We need to wait until the main world is ready to receive the message before
  // sending the port. We create this promise in the preload so it's guaranteed
  // to register the onload listener before the load event is fired.
  const windowLoaded = new Promise((resolve) => {
    window.onload = resolve;
  });
  ipcRenderer.on(IpcMainChannel.RENDERER_IPC_SET_CHANNEL, async (event) => {
    await windowLoaded;
    // We use regular window.postMessage to transfer the port from the isolated
    // world to the main world.
    window.postMessage(
      IpcMainChannel.RENDERER_IPC_SET_CHANNEL,
      '*',
      event.ports
    );
  });
})();
