import { IpcChannel, IpcChannelMessage } from '../../../common/ipcMain';

/*
 * Responsible for all communications with the main process.
 */
export class IpcWorkerConnection {
  private sendMessage<T extends IpcChannel>(
    channel: T,
    message: IpcChannelMessage<T>
  ): void {
    window.electron.ipcRenderer.sendMessage(channel, message);
  }

  mainLog(message: string): void {
    this.sendMessage(IpcChannel.MAIN_UTILS_LOG, { data: { message } });
  }

  refreshChannels(): void {
    this.sendMessage(IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, {
      data: null,
    });
  }
}
