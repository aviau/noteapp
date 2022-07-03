import { IPCChannel, IPCChannelMessage } from '../common/IPCChannel';

/*
 * The IPC connection running in the main process. Responsible for
 * communicating with the renderer process.
 */
export class IPCMainConnection {
  constructor(ipcMain: Electron.IpcMain) {
    // TODO(aviau): Move this to IpcMainWrapper
    const on = function <T extends IPCChannel>(
      channel: T,
      callback: (
        event: Electron.IpcMainEvent,
        args: IPCChannelMessage<T>
      ) => void
    ) {
      const subscription = (event: Electron.IpcMainEvent, args: unknown[]) => {
        const message = args[0] as IPCChannelMessage<T>;
        callback(event, message);
      };
      ipcMain.on(channel, subscription);
    };

    on(IPCChannel.MAIN_PING, this.onPing);
  }

  onPing(
    event: Electron.IpcMainEvent,
    message: IPCChannelMessage<IPCChannel.MAIN_PING>
  ) {
    console.log(`Main got Pinged: ${message.data.message}`);
    const replyMessage: IPCChannelMessage<IPCChannel.RENDERER_PONG> = {
      data: {
        reply: 'pong',
      },
    };
    event.reply(IPCChannel.RENDERER_PONG, [replyMessage]);
  }
}
