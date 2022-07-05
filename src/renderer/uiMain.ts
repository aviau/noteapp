import { IpcChannel } from '../common/ipc';
import { IpcRendererConnection } from './ipcRendererConnection';

export class UiMain {
  ipcRendererConnection: IpcRendererConnection;

  workerChannel: MessagePort | null;

  constructor(ipcRendererConnection: IpcRendererConnection) {
    this.ipcRendererConnection = ipcRendererConnection;
    this.workerChannel = null;
  }

  main(): void {
    try {
      this.startup();
    } catch (error) {
      console.log((error as any).message);
    }
  }

  private async startup(): Promise<void> {
    // Listen to window messages.
    window.onmessage = (event) => {
      if (
        event.source === window &&
        event.data === IpcChannel.RENDERER_IPC_SET_CHANNEL
      ) {
        const [channel] = event.ports;
        this.onSetWorkerChannel(channel);
      }
    };

    // Say hi and ask the main process for new channels.
    this.ipcRendererConnection.mainLog('Started.');
    this.ipcRendererConnection.mainPing();
    this.ipcRendererConnection.refreshChannels();
  }

  private async onSetWorkerChannel(workerChannel: MessagePort): Promise<void> {
    // Save the new channel.
    this.ipcRendererConnection.mainLog('Got new worker channel.');
    this.workerChannel = workerChannel;

    // Listen for messages
    workerChannel.onmessage = (event) => {
      this.ipcRendererConnection.mainLog(`Got port message: ${event.data}`);
    };

    // Start the port
    workerChannel.start();

    // Say hi.
    workerChannel.postMessage('Hello from UI.');
  }
}
