import Electron, { MessageChannelMain } from 'electron';

import {
  IpcMainChannel,
  IpcMainChannelMessage,
  IpcMainChannelResponse,
} from '@/lib/ipc/ipcMain';
import {
  IpcMainService,
  IpcMainConnectionEvent,
  IpcMainConnectionInvokeEvent,
} from './services/ipc';
import { WindowsService } from './services/windows';

/*
 * NoteMain controls the main process and coordinates the others.
 */
export class NoteMain {
  private readonly ipcMainService: IpcMainService;

  private readonly electronApp: Electron.App;

  private readonly windowsService: WindowsService;

  constructor(electronApp: Electron.App, ipcMainService: IpcMainService) {
    this.ipcMainService = ipcMainService;
    this.electronApp = electronApp;
    this.windowsService = new WindowsService(electronApp);
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
    this.ipcMainService.onIpcRequestChannelRefresh(() =>
      this.onRequestChannelRefresh()
    );

    /*
     ***********
     ** UTILS **
     ***********
     */
    this.ipcMainService.handleUtilsPing((e, m) => this.handlePing(e, m));
    this.ipcMainService.onUtilsLog((e, m) => this.onLog(e, m));
    this.ipcMainService.handleUtilsGetUserDataPath(() =>
      this.handleGetUserDataPath()
    );

    /*
     *************
     ** WINDOWS **
     *************
     */
    this.ipcMainService.onWindowsMinimize(() => this.windowsService.minimize());
    this.ipcMainService.onWindowsQuit(() => this.windowsService.quit());

    // Create windows
    await this.electronApp.whenReady();
    await this.windowsService.start();
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
    const { workerWindow, uiWindow } = this.windowsService.getWindows();
    let source = 'UNKNOWN';
    if (
      workerWindow !== null &&
      event.getSenderFrame() === workerWindow.webContents.mainFrame
    ) {
      source = 'WORKER';
    } else if (
      uiWindow !== null &&
      event.getSenderFrame() === uiWindow.webContents.mainFrame
    ) {
      source = 'UI';
    }
    console.log(`[NoteMain] [LOG] [${source}]: ${message.data.message}`);
  }

  private async onRequestChannelRefresh(): Promise<void> {
    // We can't respond to this unless both the worker and the
    // ui windows were loaded.
    const { workerWindow, uiWindow } = this.windowsService.getWindows();
    if (uiWindow === null || workerWindow === null) {
      console.log('[NoteMain] was asked for a worker channel before init');
      return;
    }

    console.log('[NoteMain] refreshing channels...');

    // Create a new channel
    const { port1, port2 } = new MessageChannelMain();

    // Provide it to the workerIpcMainChannel
    workerWindow.webContents.postMessage(
      IpcMainChannel.RENDERER_IPC_SET_CHANNEL,
      null,
      [port1]
    );

    // Povide it to the UI.IpcMainChannel
    uiWindow.webContents.postMessage(
      IpcMainChannel.RENDERER_IPC_SET_CHANNEL,
      null,
      [port2]
    );
  }

  private async handleGetUserDataPath(): Promise<
    IpcMainChannelResponse<IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH>
  > {
    return { data: { path: this.electronApp.getPath('userData') } };
  }
}
