import {
  IpcMainChannel,
  IpcMainChannelMessageOf,
  IpcMainChannelResponseOf,
} from '@/lib/ipc/ipcMain';
import {
  IpcWorkerMessage,
  IpcWorkerResponseFor,
  IpcWorkerMessageType,
} from '@/lib/ipc/ipcWorker';

import { SignalEmitter } from '@/lib/events/signalEmitter';

/*
 * Responsible for all communications with:
 * - The main process.
 * - The worker process.
 */
export class IpcUiService {
  private workerChannel: MessagePort | null;

  private readonly onNewWorkerChannel: SignalEmitter;

  constructor() {
    this.workerChannel = null;
    this.onNewWorkerChannel = new SignalEmitter();
  }

  start(): void {
    // Listen to window messages.
    window.onmessage = (event) => {
      if (
        event.source === window &&
        event.data === IpcMainChannel.RENDERER_IPC_SET_CHANNEL
      ) {
        const [channel] = event.ports;
        this.setNewWorkerChannel(channel);
      }
    };

    // Ask for new channels.
    this.mainRefreshChannels();
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

  private mainRefreshChannels(): void {
    this.mainSendMessage(IpcMainChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, null);
  }

  private async setNewWorkerChannel(workerChannel: MessagePort): Promise<void> {
    // Save the new channel.
    this.mainLog('Got new worker channel.');
    this.workerChannel = workerChannel;
    this.onNewWorkerChannel.emit();
  }

  private workerSendMessage(
    message: IpcWorkerMessage,
    transferables?: Transferable[]
  ): void {
    if (this.workerChannel === null) {
      this.onNewWorkerChannel.once(() => {
        this.workerSendMessage(message, transferables);
      });
      return;
    }
    this.workerChannel.postMessage(message, transferables ?? []);
  }

  async workerInvoke<T extends IpcWorkerMessage>(
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
