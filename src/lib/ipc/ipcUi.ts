// This file describes UI IPC.
// It is mostly invoked by the Worker.

export enum IpcUiMessageType {
  PING = 'ping',
}

export type IpcUiMessage = IpcUiMessagePing;

export interface IpcUiMessagePing {
  type: IpcUiMessageType.PING;
  data: {
    message: string;
  };
}
