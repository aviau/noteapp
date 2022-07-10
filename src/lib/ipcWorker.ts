// This file describes the WORKER IPC.
// It is mostly invoked by the UI.

export enum IpcWorkerMessageType {
  QUIT = 'quit',
  PING = 'ping',
}

export type IpcWorkerMessage = IpcWorkerMessageQuit | IpcWorkerMessagePing;

export interface IpcWorkerMessageQuit {
  type: IpcWorkerMessageType.QUIT;
}

export interface IpcWorkerMessagePing {
  type: IpcWorkerMessageType.PING;
  data: {
    message: string;
  };
}
