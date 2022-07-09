import { IpcChannel } from '../lib/ipcMain';
import { IpcUiService } from './services/ipc/ipcUiService';

export class UiMain {
  ipcUiService: IpcUiService;

  workerChannel: MessagePort | null;

  constructor(ipcUiService: IpcUiService) {
    this.ipcUiService = ipcUiService;
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
    this.ipcUiService.mainLog('Started.');
    this.ipcUiService.mainPing();
    this.ipcUiService.refreshChannels();
  }

  private async onSetWorkerChannel(workerChannel: MessagePort): Promise<void> {
    // Save the new channel.
    this.ipcUiService.mainLog('Got new worker channel.');
    this.workerChannel = workerChannel;

    // Listen for messages
    workerChannel.onmessage = (event) => {
      this.ipcUiService.mainLog(`Got port message: ${event.data}`);
    };

    // Start the port
    workerChannel.start();

    // Say hi.
    workerChannel.postMessage('Hello from UI.');
  }
}
