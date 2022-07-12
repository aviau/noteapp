import {
  IpcMainChannel,
  IpcMainChannelMessage,
  IpcMainChannelResponse,
} from '@/lib/ipc/ipcMain';
import { IpcUiMessage } from '@/lib/ipc/ipcUi';
import { IpcWorkerMessage, IpcWorkerMessageType } from '@/lib/ipc/ipcWorker';

type WorkerMessageCallback = (message: IpcUiMessage) => void;

/*
 * Responsible for all communications with:
 * - The main process.
 * - The worker process.
 */
export class IpcUiService {
  private workerChannel: MessagePort | null;

  onWorkerMessage: WorkerMessageCallback | null;

  constructor() {
    this.workerChannel = null;
    this.onWorkerMessage = null;
  }

  start(): void {
    // Listen to window messages.
    window.onmessage = (event) => {
      if (
        event.source === window &&
        event.data === IpcMainChannel.RENDERER_IPC_SET_CHANNEL
      ) {
        const [channel] = event.ports;
        this.onSetWorkerChannel(channel);
      }
    };

    // Ask for new channels.
    this.refreshChannels();
  }

  private mainSendMessage<T extends IpcMainChannel>(
    channel: T,
    message: IpcMainChannelMessage<T>
  ): void {
    window.electron.ipcRenderer.sendMessage(channel, message);
  }

  private async mainInvoke<T extends IpcMainChannel>(
    channel: T,
    message: IpcMainChannelMessage<T>
  ): Promise<IpcMainChannelResponse<T>> {
    return window.electron.ipcRenderer.invoke(channel, message);
  }

  private refreshChannels(): void {
    this.mainSendMessage(IpcMainChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, null);
  }

  private async onSetWorkerChannel(workerChannel: MessagePort): Promise<void> {
    // Save the new channel.
    this.mainLog('Got new worker channel.');
    this.workerChannel = workerChannel;

    // Listen for messages
    workerChannel.onmessage = (workerChannelEvent) => {
      const workerMessage = workerChannelEvent.data as IpcUiMessage;
      if (this.onWorkerMessage !== null) {
        this.onWorkerMessage(workerMessage);
        return;
      }
      this.mainLog(`Got unhandled worker message: ${workerMessage}`);
    };

    // Start the port
    workerChannel.start();

    // Say hi.
    this.workerSendMessage({
      type: IpcWorkerMessageType.UTILS_PING,
      data: {
        message: 'Hello from UI',
      },
    });
  }

  private workerSendMessage(message: IpcWorkerMessage): void {
    if (this.workerChannel === null) {
      throw new Error(
        'Tried to send message before the workerChannel was initiated'
      );
    }
    this.workerChannel.postMessage(message);
  }

  async mainPing(): Promise<void> {
    const message = await this.mainInvoke(IpcMainChannel.MAIN_UTILS_PING, {
      data: { message: 'ping' },
    });
    console.log(`[UI] got mainPing Reply: ${message.data.reply}`);
  }

  mainLog(message: string): void {
    this.mainSendMessage(IpcMainChannel.MAIN_UTILS_LOG, { data: { message } });
  }

  workerWindowsMinimize(): void {
    this.workerSendMessage({ type: IpcWorkerMessageType.WINDOWS_MINIMIZE });
  }

  workerWindowsMaximize(): void {
    this.workerSendMessage({ type: IpcWorkerMessageType.WINDOWS_MAXIMIZE });
  }

  workerWindowsQuit(): void {
    this.workerSendMessage({ type: IpcWorkerMessageType.WINDOWS_QUIT });
  }
}
