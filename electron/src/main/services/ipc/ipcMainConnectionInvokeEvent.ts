import Electron from 'electron';

// Minimal IpcMainInvokeEvent
export class IpcMainConnectionInvokeEvent {
  private event: Electron.IpcMainInvokeEvent;

  constructor(event: Electron.IpcMainInvokeEvent) {
    // Let's wait until there is a need before exposing anything here.
    this.event = event;
  }
}
