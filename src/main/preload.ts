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
      const subscription = (event: IpcRendererEvent, args: unknown[]) => {
        const message = args[0] as IpcChannelMessage<T>;
        callback(message);
      };
      ipcRenderer.on(channel, subscription);
      return () => ipcRenderer.removeListener(channel, subscription);
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
  ipcRenderer.on(IpcChannel.RENDERER_IPC_SET_CHANNEL, async (event) => {
    await windowLoaded;
    // We use regular window.postMessage to transfer the port from the isolated
    // world to the main world.
    window.postMessage(IpcChannel.RENDERER_IPC_SET_CHANNEL, '*', event.ports);
  });
})();
