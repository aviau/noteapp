import { IPCChannel, IPCChannelMessage } from '../common/IPCChannel';

/*
 * Responsible for all communications with the main process.
 */
export class IPCRendererConnection {
  constructor() {
    window.electron.ipcRenderer.on(IPCChannel.RENDERER_PONG, this.onPong);
  }

  private sendMessage<T extends IPCChannel>(
    channel: T,
    message: IPCChannelMessage<T>
  ): void {
    window.electron.ipcRenderer.sendMessage(channel, message);
  }

  pingMain(): void {
    this.sendMessage(IPCChannel.MAIN_PING, { data: { message: 'ping' } });
  }

  private onPong(message: IPCChannelMessage<IPCChannel.RENDERER_PONG>): void {
    console.log(`Got Ping Reply: ${message.data.reply}`);
  }
}
