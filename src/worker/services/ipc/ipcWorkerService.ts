import Electron, { IpcRendererEvent } from 'electron';
import {
  IpcMainChannel,
  IpcMainChannelMessage,
  IpcMainChannelResponse,
} from 'src/lib/ipcMain';
import { IpcWorkerMessage } from 'src/lib/ipcWorker';
import { IpcUiMessage, IpcUiMessageType } from 'src/lib/ipcUi';

type UiMessageCallback = (message: IpcWorkerMessage) => void;

/*
 * Responsible for all communications with:
 * - The main process.
 * - The UI process.
 */
export class IpcWorkerService {
  private readonly ipcRenderer: Electron.IpcRenderer;

  private uiChannel: MessagePort | null;

  onUiMessage: UiMessageCallback | null;

  constructor(ipcRenderer: Electron.IpcRenderer) {
    this.ipcRenderer = ipcRenderer;
    this.uiChannel = null;
    this.onUiMessage = null;
  }

  start() {
    this.mainOn(IpcMainChannel.RENDERER_IPC_SET_CHANNEL, (e) =>
      this.onSetUiChannel(e)
    );
    this.mainRefreshChannels();
  }

  private mainSendMessage<T extends IpcMainChannel>(
    channel: T,
    message: IpcMainChannelMessage<T>
  ): void {
    this.ipcRenderer.send(channel, message);
  }

  private mainOn<T extends IpcMainChannel>(
    channel: T,
    callback: (
      event: IpcRendererEvent,
      message: IpcMainChannelMessage<T>
    ) => void
  ): void {
    const subscription = (event: IpcRendererEvent, arg: unknown) => {
      const message = arg as IpcMainChannelMessage<T>;
      callback(event, message);
    };
    this.ipcRenderer.on(channel, subscription);
  }

  private async mainInvoke<T extends IpcMainChannel>(
    channel: T,
    message: IpcMainChannelMessage<T>
  ): Promise<IpcMainChannelResponse<T>> {
    return this.ipcRenderer.invoke(channel, message);
  }

  mainLog(message: string): void {
    this.mainSendMessage(IpcMainChannel.MAIN_UTILS_LOG, { data: { message } });
  }

  mainQuit(): void {
    this.mainSendMessage(IpcMainChannel.MAIN_UTILS_QUIT, { data: null });
  }

  mainRefreshChannels(): void {
    this.mainSendMessage(IpcMainChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, {
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
      const uiMessage = uiChannelEvent.data as IpcWorkerMessage;
      if (this.onUiMessage !== null) {
        this.onUiMessage(uiMessage);
        return;
      }
      this.mainLog(`Got unhandled UI message: ${uiMessage}`);
    };

    // Start the port
    uiChannel.start();

    // Say hi.
    this.uiSendMessage({
      type: IpcUiMessageType.PING,
      data: {
        message: 'Hello from worker',
      },
    });
  }

  private uiSendMessage(message: IpcUiMessage): void {
    if (this.uiChannel === null) {
      throw new Error(
        'Tried to send message before the uiChannel was initiated'
      );
    }
    this.uiChannel.postMessage(message);
  }

  async mainUtilsGetUserDataPath(): Promise<string> {
    const resp = await this.mainInvoke(
      IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH,
      {
        data: null,
      }
    );
    return resp.data.path;
  }
}
