import {
  IpcChannel,
  IpcChannelMessage,
  IpcChannelResponse,
} from '../../../common/ipcMain';

/*
 * Responsible for all communications with the main process.
 */
export class IpcRendererConnection {
  private sendMessage<T extends IpcChannel>(
    channel: T,
    message: IpcChannelMessage<T>
  ): void {
    window.electron.ipcRenderer.sendMessage(channel, message);
  }

  private async invoke<T extends IpcChannel>(
    channel: T,
    message: IpcChannelMessage<T>
  ): Promise<IpcChannelResponse<T>> {
    return window.electron.ipcRenderer.invoke(channel, message);
  }

  async mainPing(): Promise<void> {
    const message = await this.invoke(IpcChannel.MAIN_UTILS_PING, {
      data: { message: 'ping' },
    });
    console.log(`[UI] got mainPing Reply: ${message.data.reply}`);
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
