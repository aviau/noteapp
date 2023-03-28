import Electron, { IpcRendererEvent } from 'electron';
import {
  IpcMainChannel,
  IpcMainChannelMessageOf,
  IpcMainChannelResponseOf,
} from '@/lib/ipc/ipcMain';
import { IpcWorkerMessage, IpcWorkerResponse } from '@/lib/ipc/ipcWorker';

type WorkerMessageCallback = (
  message: IpcWorkerMessage
) => Promise<IpcWorkerResponse>;

/*
 * Responsible for all communications with:
 * - The main process.
 * - The UI process.
 */
export class IpcWorkerService {
  private readonly ipcRenderer: Electron.IpcRenderer;

  onWorkerMessage: WorkerMessageCallback | null;

  constructor(ipcRenderer: Electron.IpcRenderer) {
    this.ipcRenderer = ipcRenderer;
    this.onWorkerMessage = null;
  }

  start() {
    this.mainOn(IpcMainChannel.RENDERER_IPC_SET_CHANNEL, (e) =>
      this.onSetUiChannel(e)
    );
    this.mainRefreshChannels();
  }

  private mainSendMessage<T extends IpcMainChannel>(
    channel: T,
    message: IpcMainChannelMessageOf<T>
  ): void {
    this.ipcRenderer.send(channel, message);
  }

  private mainOn<T extends IpcMainChannel>(
    channel: T,
    callback: (
      event: IpcRendererEvent,
      message: IpcMainChannelMessageOf<T>
    ) => void
  ): void {
    const subscription = (event: IpcRendererEvent, arg: unknown) => {
      const message = arg as IpcMainChannelMessageOf<T>;
      callback(event, message);
    };
    this.ipcRenderer.on(channel, subscription);
  }

  private async mainInvoke<T extends IpcMainChannel>(
    channel: T,
    message: IpcMainChannelMessageOf<T>
  ): Promise<IpcMainChannelResponseOf<T>> {
    return this.ipcRenderer.invoke(channel, message);
  }

  mainLog(message: string): void {
    this.mainSendMessage(IpcMainChannel.MAIN_UTILS_LOG, { data: { message } });
  }

  mainWindowsMinimize(): void {
    this.mainSendMessage(IpcMainChannel.MAIN_WINDOWS_MINIMIZE, null);
  }

  mainWindowsMaximize(): void {
    this.mainSendMessage(IpcMainChannel.MAIN_WINDOWS_MAXIMIZE, null);
  }

  mainWindowsQuit(): void {
    this.mainSendMessage(IpcMainChannel.MAIN_WINDOWS_QUIT, null);
  }

  mainRefreshChannels(): void {
    this.mainSendMessage(IpcMainChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, null);
  }

  private async onSetUiChannel(event: IpcRendererEvent): Promise<void> {
    // Save the new channel.
    this.mainLog('Got new UI channel.');
    const [uiChannel] = event.ports;

    // Listen for messages
    uiChannel.onmessage = async (uiChannelEvent) => {
      const uiMessage = uiChannelEvent.data as IpcWorkerMessage;
      const responseChannel = uiChannelEvent.ports[0];
      if (this.onWorkerMessage !== null) {
        try {
          const resp = await this.onWorkerMessage(uiMessage);
          responseChannel.postMessage({ result: resp });
        } catch (e) {
          responseChannel.postMessage({ error: e });
        }
        return;
      }
      this.mainLog(`Got unhandled UI message: ${uiMessage}`);
    };

    // Start the port
    uiChannel.start();
  }

  async mainUtilsGetUserDataPath(): Promise<string> {
    const resp = await this.mainInvoke(
      IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH,
      null
    );
    return resp.data.path;
  }
}
