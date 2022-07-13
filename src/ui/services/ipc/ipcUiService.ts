import {
  IpcMainChannel,
  IpcMainChannelMessageOf,
  IpcMainChannelResponseOf,
} from '@/lib/ipc/ipcMain';
import { IpcUiMessage, IpcUiResponse } from '@/lib/ipc/ipcUi';
import {
  IpcWorkerMessage,
  IpcWorkerResponseFor,
  IpcWorkerMessageType,
  IpcWorkerResponseOf,
} from '@/lib/ipc/ipcWorker';

type UiMessageCallback = (message: IpcUiMessage) => Promise<IpcUiResponse>;

/*
 * Responsible for all communications with:
 * - The main process.
 * - The worker process.
 */
export class IpcUiService {
  private workerChannel: MessagePort | null;

  onUiMessage: UiMessageCallback | null;

  constructor() {
    this.workerChannel = null;
    this.onUiMessage = null;
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
    message: IpcMainChannelMessageOf<T>
  ): void {
    window.electron.ipcRenderer.sendMessage(channel, message);
  }

  private async mainInvoke<T extends IpcMainChannel>(
    channel: T,
    message: IpcMainChannelMessageOf<T>
  ): Promise<IpcMainChannelResponseOf<T>> {
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
    workerChannel.onmessage = async (workerChannelEvent) => {
      const workerMessage = workerChannelEvent.data as IpcUiMessage;
      if (this.onUiMessage !== null) {
        const resp = await this.onUiMessage(workerMessage);
        this.mainLog(`[TODO] Unsent response: ${JSON.stringify(resp)}`);
        return;
      }
      this.mainLog(`Got unhandled worker message: ${workerMessage}`);
    };

    // Start the port
    workerChannel.start();

    // Say hi.
    const resp: IpcWorkerResponseOf<IpcWorkerMessageType.UTILS_PING> =
      await this.workerInvoke({
        type: IpcWorkerMessageType.UTILS_PING,
        data: {
          message: 'Hello from UI',
        },
      });
    this.mainLog(`Said hi to worker, he replied ${resp.message}.`);
  }

  private workerSendMessage(
    message: IpcWorkerMessage,
    transferables?: Transferable[]
  ): void {
    if (this.workerChannel === null) {
      throw new Error(
        'Tried to send message before the workerChannel was initiated'
      );
    }
    this.workerChannel.postMessage(message, transferables ?? []);
  }

  private async workerInvoke<T extends IpcWorkerMessage>(
    message: T
  ): Promise<IpcWorkerResponseFor<T>> {
    // - Send a request to the worker.
    // - Include a channel for the response.
    // - Resolve the promise when the response is returned.
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = ({ data }) => {
        channel.port1.close();
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.result);
        }
      };
      this.workerSendMessage(message, [channel.port2]);
    });
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
