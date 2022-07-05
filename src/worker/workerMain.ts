import { IpcChannel } from '../common/ipc';
import { IpcWorkerConnection } from './ipcWorkerConnection';

export class WorkerMain {
  ipcWorkerConnection: IpcWorkerConnection;

  uiChannel: MessagePort | null;

  constructor(ipcWorkerConnection: IpcWorkerConnection) {
    this.ipcWorkerConnection = ipcWorkerConnection;
    this.uiChannel = null;
  }

  main(): void {
    try {
      this.startup();
    } catch (error) {
      this.ipcWorkerConnection.mainLog((error as any).message);
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
        this.onSetUiChannel(channel);
      }
    };

    // Say hi and ask the main process for new channels.
    this.ipcWorkerConnection.mainLog('Started.');
    this.ipcWorkerConnection.refreshChannels();
  }

  private async onSetUiChannel(uiChannel: MessagePort): Promise<void> {
    // Save the new channel.
    this.ipcWorkerConnection.mainLog('Got new UI channel.');
    this.uiChannel = uiChannel;

    // Listen for messages
    uiChannel.onmessage = (event) => {
      this.ipcWorkerConnection.mainLog(`Got port message: ${event.data}`);
    };

    // Start the port
    uiChannel.start();

    // Say hi.
    uiChannel.postMessage('Hello from worker.');
  }
}
