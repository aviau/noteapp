import { IpcChannel, IpcChannelMessage } from '../../../common/ipc';

/*
 * Responsible for all communications with the main process.
 */
export class IpcRendererConnection {
  constructor() {
    window.electron.ipcRenderer.on(
      IpcChannel.MAIN_UTILS_PING_REPLY,
      this.onMainPingReply
    );
  }

  private sendMessage<T extends IpcChannel>(
    channel: T,
    message: IpcChannelMessage<T>
  ): void {
    window.electron.ipcRenderer.sendMessage(channel, message);
  }

  mainPing(): void {
    this.sendMessage(IpcChannel.MAIN_UTILS_PING, { data: { message: 'ping' } });
  }

  mainLog(message: string): void {
    this.sendMessage(IpcChannel.MAIN_UTILS_LOG, { data: { message } });
  }

  refreshChannels(): void {
    this.sendMessage(IpcChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH, {
      data: null,
    });
  }

  private onMainPingReply(
    message: IpcChannelMessage<IpcChannel.MAIN_UTILS_PING_REPLY>
  ): void {
    console.log(`Got Ping Reply: ${message.data.reply}`);
  }
}
