import Electron, { IpcRendererEvent } from 'electron';
import { IpcChannel, IpcChannelMessage } from 'src/lib/ipcMain';

/*
 * Responsible for all communications with:
 * - The main process.
 * - The UI process.
 */
export class IpcWorkerService {
  private readonly ipcRenderer: Electron.IpcRenderer;

  private uiChannel: MessagePort | null;

  constructor(ipcRenderer: Electron.IpcRenderer) {
    this.ipcRenderer = ipcRenderer;
    this.uiChannel = null;
  }

  start() {
    this.on(IpcChannel.RENDERER_IPC_SET_CHANNEL, (e) => this.onSetUiChannel(e));
    this.refreshChannels();
  }

  private sendMessage<T extends IpcChannel>(
    channel: T,
    message: IpcChannelMessage<T>
  ): void {
    this.ipcRenderer.send(channel, message);
  }

  private on<T extends IpcChannel>(
    channel: T,
    callback: (event: IpcRendererEvent, message: IpcChannelMessage<T>) => void
  ): void {
    const subscription = (event: IpcRendererEvent, arg: unknown) => {
      const message = arg as IpcChannelMessage<T>;
      callback(event, message);
    };
    this.ipcRenderer.on(channel, subscription);
  }

  mainLog(message: string): void {
    this.sendMessage(IpcChannel.MAIN_UTILS_LOG, { data: { message } });
  }

  refreshChannels(): void {
    this.sendMessage(IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, {
      data: null,
    });
  }

  private async onSetUiChannel(event: IpcRendererEvent): Promise<void> {
    // Save the new channel.
    this.mainLog('Got new UI channel.');
    const [uiChannel] = event.ports;
    this.uiChannel = uiChannel;

    // Listen for messages
    uiChannel.onmessage = (uiChannelEvent) => {
      this.mainLog(`Got port message: ${uiChannelEvent.data}`);
    };

    // Start the port
    uiChannel.start();

    // Say hi.
    uiChannel.postMessage('Hello from worker.');
  }
}
