import { IpcChannel, IpcChannelMessage } from '../common/ipc';

function on<T extends IpcChannel>(
  ipcMain: Electron.IpcMain,
  channel: T,
  callback: (event: Electron.IpcMainEvent, args: IpcChannelMessage<T>) => void
) {
  const subscription = (event: Electron.IpcMainEvent, args: unknown[]) => {
    const message = args[0] as IpcChannelMessage<T>;
    callback(event, message);
  };
  ipcMain.on(channel, subscription);
}

function reply<T extends IpcChannel>(
  event: Electron.IpcMainEvent,
  channel: T,
  message: IpcChannelMessage<T>
) {
  event.reply(channel, [message]);
}

/*
 * The IPC connection running in the main process. Responsible for
 * communicating with the renderer process.
 */
export class IpcMainConnection {
  constructor(ipcMain: Electron.IpcMain) {
    on(ipcMain, IpcChannel.MAIN_PING, this.onPing);
  }

  private onPing(
    event: Electron.IpcMainEvent,
    message: IpcChannelMessage<IpcChannel.MAIN_PING>
  ) {
    console.log(`Main got Pinged: ${message.data.message}`);
    const replyMessage: IpcChannelMessage<IpcChannel.MAIN_PING_REPLY> = {
      data: {
        reply: 'pong',
      },
    };
    reply(event, IpcChannel.MAIN_PING_REPLY, replyMessage);
  }
}
