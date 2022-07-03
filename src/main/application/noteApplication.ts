import {
  IpcMainConnection,
  IpcMainConnectionEvent,
} from '../ipcMainConnection';
import { IpcChannel, IpcChannelMessage } from '../../common/ipc';
import { ConfigurationService } from '../configuration/configurationService';
import { initApp } from './startup/startup';

/*
 * NoteApplication contains all of the application's state and logic.
 */
export class NoteApplication {
  electronApp: Electron.App;

  configurationService: ConfigurationService;

  constructor(electronApp: Electron.App, ipcMainConnection: IpcMainConnection) {
    this.electronApp = electronApp;
    this.configurationService = new ConfigurationService(
      electronApp.getPath('userData')
    );
    ipcMainConnection.onPing((e, m) => this.onPing(e, m));
  }

  start(): void {
    initApp(this.electronApp);
  }

  private async onPing(
    event: IpcMainConnectionEvent,
    message: IpcChannelMessage<IpcChannel.MAIN_UTILS_PING>
  ) {
    console.log(`NoteApplication got Pinged: ${message.data.message}`);
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
}
