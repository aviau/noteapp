import Electron, { MessageChannelMain } from 'electron';

import {
  IpcMainChannel,
  IpcMainChannelMessage,
  IpcMainChannelResponse,
} from 'src/lib/ipcMain';
import {
  IpcMainService,
  IpcMainConnectionEvent,
  IpcMainConnectionInvokeEvent,
} from './services/ipc';
import { createWindows } from './services/startup/windows';

/*
 * NoteMain controls the main process and coordinates the others.
 */
export class NoteMain {
  private ipcMainService: IpcMainService;

  private electronApp: Electron.App;

  private uiWindow: Electron.BrowserWindow | null;

  private workerWindow: Electron.BrowserWindow | null;

  constructor(electronApp: Electron.App, ipcMainService: IpcMainService) {
    this.ipcMainService = ipcMainService;
    this.electronApp = electronApp;
    this.uiWindow = null;
    this.workerWindow = null;
  }

  main(): void {
    try {
      this.startup();
    } catch (error) {
      console.error((error as any).message);
    }
  }

  private async startup(): Promise<void> {
    // Listen to messages from other proceses.

    /*
     *********
     ** IPC **
     *********
     */
    this.ipcMainService.onRequestChannelRefresh(() =>
      this.onRequestChannelRefresh()
    );

    /*
     ***********
     ** UTILS **
     ***********
     */
    this.ipcMainService.handlePing((e, m) => this.handlePing(e, m));
    this.ipcMainService.onLog((e, m) => this.onLog(e, m));
    this.ipcMainService.handleGetUserDataPath(() =>
      this.handleGetUserDataPath()
    );
    this.ipcMainService.onQuit(() => this.onQuit());

    // Create windows
    await this.electronApp.whenReady();
    const { uiWindow, workerWindow } = await createWindows(this.electronApp);

    // Save references to them so that we can manage communications.
    this.uiWindow = uiWindow;
    this.workerWindow = workerWindow;
  }

  private async handlePing(
    _event: IpcMainConnectionInvokeEvent,
    message: IpcMainChannelMessage<IpcMainChannel.MAIN_UTILS_PING>
  ): Promise<IpcMainChannelResponse<IpcMainChannel.MAIN_UTILS_PING>> {
    console.log(`[NoteMain] got Pinged: ${message.data.message}`);
    const replyMessage: IpcMainChannelResponse<IpcMainChannel.MAIN_UTILS_PING> =
      {
        data: {
          reply: `pong!`,
        },
      };
    return replyMessage;
  }

  private async onLog(
    event: IpcMainConnectionEvent,
    message: IpcMainChannelMessage<IpcMainChannel.MAIN_UTILS_LOG>
  ): Promise<void> {
    let source = 'UNKNOWN';
    if (
      this.workerWindow !== null &&
      event.getSenderFrame() === this.workerWindow.webContents.mainFrame
    ) {
      source = 'WORKER';
    } else if (
      this.uiWindow !== null &&
      event.getSenderFrame() === this.uiWindow.webContents.mainFrame
    ) {
      source = 'UI';
    }
    console.log(`[NoteMain] [LOG] [${source}]: ${message.data.message}`);
  }

  private async onRequestChannelRefresh(): Promise<void> {
    // We can't respond to this unless both the worker and the
    // ui windows were loaded.
    const { uiWindow } = this;
    const { workerWindow } = this;
    if (uiWindow === null || workerWindow === null) {
      console.log('[NoteMain] was asked for a worker channel before init');
      return;
    }

    console.log('[NoteMain] refreshing channels...');

    // Create a new channel
    const { port1, port2 } = new MessageChannelMain();

    // Provide it to the workerIpcMainChannel
    const workerMessage: IpcMainChannelMessage<IpcMainChannel.RENDERER_IPC_SET_CHANNEL> =
      {
        data: null,
      };
    workerWindow.webContents.postMessage(
      IpcMainChannel.RENDERER_IPC_SET_CHANNEL,
      workerMessage,
      [port1]
    );

    // Povide it to the UI.IpcMainChannel
    const uiMessage: IpcMainChannelMessage<IpcMainChannel.RENDERER_IPC_SET_CHANNEL> =
      {
        data: null,
      };
    uiWindow.webContents.postMessage(
      IpcMainChannel.RENDERER_IPC_SET_CHANNEL,
      uiMessage,
      [port2]
    );
  }

  private async handleGetUserDataPath(): Promise<
    IpcMainChannelResponse<IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH>
  > {
    return { data: { path: this.electronApp.getPath('userData') } };
  }

  private async onQuit(): Promise<void> {
    this.electronApp.quit();
  }
}
