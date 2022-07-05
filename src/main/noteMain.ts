import Electron, { MessageChannelMain } from 'electron';

import { IpcMainConnection, IpcMainConnectionEvent } from './services/ipc';
import { IpcChannel, IpcChannelMessage } from '../common/ipc';
import { ConfigurationService } from './services/configuration/configurationService';
import { createWindows } from './services/startup/windows';

/*
 * NoteMain controls the main process and coordinates the others.
 */
export class NoteMain {
  ipcMainConnection: IpcMainConnection;

  electronApp: Electron.App;

  configurationService: ConfigurationService;

  uiWindow: Electron.BrowserWindow | null;

  workerWindow: Electron.BrowserWindow | null;

  constructor(electronApp: Electron.App, ipcMainConnection: IpcMainConnection) {
    this.ipcMainConnection = ipcMainConnection;
    this.electronApp = electronApp;
    this.configurationService = new ConfigurationService(
      electronApp.getPath('userData')
    );
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
    this.ipcMainConnection.onPing((e, m) => this.onPing(e, m));
    this.ipcMainConnection.onRequestChannelRefresh(() =>
      this.onRequestChannelRefresh()
    );
    this.ipcMainConnection.onLog((e, m) => this.onLog(e, m));

    // Create windows
    await this.electronApp.whenReady();
    const { uiWindow, workerWindow } = await createWindows(this.electronApp);

    // Save references to them so that we can manage communications.
    this.uiWindow = uiWindow;
    this.workerWindow = workerWindow;
  }

  private async onPing(
    event: IpcMainConnectionEvent,
    message: IpcChannelMessage<IpcChannel.MAIN_UTILS_PING>
  ): Promise<void> {
    console.log(`[NoteMain] got Pinged: ${message.data.message}`);
    const currentVault = (
      await this.configurationService.getVaultConfiguration()
    ).data.current;
    const replyMessage: IpcChannelMessage<IpcChannel.MAIN_UTILS_PING_REPLY> = {
      data: {
        reply: `pong, config is at ${this.configurationService.userDataPath} and my current vault is ${currentVault}`,
      },
    };
    event.reply(IpcChannel.MAIN_UTILS_PING_REPLY, replyMessage);
  }

  private async onLog(
    event: IpcMainConnectionEvent,
    message: IpcChannelMessage<IpcChannel.MAIN_UTILS_LOG>
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

    // Provide it to the worker
    const workerMessage: IpcChannelMessage<IpcChannel.RENDERER_IPC_SET_CHANNEL> =
      {
        data: null,
      };
    workerWindow.webContents.postMessage(
      IpcChannel.RENDERER_IPC_SET_CHANNEL,
      workerMessage,
      [port1]
    );

    // Povide it to the UI.
    const uiMessage: IpcChannelMessage<IpcChannel.RENDERER_IPC_SET_CHANNEL> = {
      data: null,
    };
    uiWindow.webContents.postMessage(
      IpcChannel.RENDERER_IPC_SET_CHANNEL,
      uiMessage,
      [port2]
    );
  }
}
