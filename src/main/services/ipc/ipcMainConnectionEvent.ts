import Electron from 'electron';

import { IpcMainChannel, IpcMainChannelMessage } from 'src/lib/ipc/ipcMain';

// Minimal IpcMainEvent
export class IpcMainConnectionEvent {
  private event: Electron.IpcMainEvent;

  constructor(event: Electron.IpcMainEvent) {
    this.event = event;
  }

  getSenderFrame(): Electron.WebFrameMain {
    return this.event.senderFrame;
  }

  // Just like IpcMainEvent.reply, but with typed messages.
  reply<T extends IpcMainChannel>(
    channel: T,
    message: IpcMainChannelMessage<T>
  ): void {
    this.event.reply(channel, [message]);
  }
}
