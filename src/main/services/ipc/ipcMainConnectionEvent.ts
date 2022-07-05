import Electron from 'electron';

import { IpcChannel, IpcChannelMessage } from '../../../common/ipc';

// Minimal IpcMainEvent exposed by IpcMainConnection's APIs.
export class IpcMainConnectionEvent {
  event: Electron.IpcMainEvent;

  constructor(event: Electron.IpcMainEvent) {
    this.event = event;
  }

  getSenderFrame(): Electron.WebFrameMain {
    return this.event.senderFrame;
  }

  // Just like IpcMainEvent.reply, but with typed messages.
  reply<T extends IpcChannel>(channel: T, message: IpcChannelMessage<T>): void {
    this.event.reply(channel, [message]);
  }
}
