import { IpcChannel, IpcChannelMessage } from '../../common/ipc';

function reply<T extends IpcChannel>(
  event: Electron.IpcMainEvent,
  channel: T,
  message: IpcChannelMessage<T>
) {
  event.reply(channel, [message]);
}

// Minimal IpcMainEvent exposed by IpcMainConnection's APIs.
export class IpcMainConnectionEvent {
  event: Electron.IpcMainEvent;

  constructor(event: Electron.IpcMainEvent) {
    this.event = event;
  }

  // Just like IpcMainEvent.reply, but with typed messages.
  reply<T extends IpcChannel>(channel: T, message: IpcChannelMessage<T>): void {
    reply(this.event, channel, message);
  }
}
