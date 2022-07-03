import { IpcMainConnection, IpcMainConnectionEvent } from './ipcMainConnection';
import { IpcChannel, IpcChannelMessage } from '../common/ipc';

/*
 * NoteApplication contains all of the application's state and logic.
 */
export class NoteApplication {
  constructor(ipcMainConnection: IpcMainConnection) {
    // TODO(aviau): Load the config and store it here.

    ipcMainConnection.onPing(this.onPing);
  }

  private onPing(
    event: IpcMainConnectionEvent,
    message: IpcChannelMessage<IpcChannel.MAIN_PING>
  ) {
    console.log(`NoteApplication got Pinged: ${message.data.message}`);
    const replyMessage: IpcChannelMessage<IpcChannel.MAIN_PING_REPLY> = {
      data: {
        reply: 'pong',
      },
    };
    event.reply(IpcChannel.MAIN_PING_REPLY, replyMessage);
  }
}
