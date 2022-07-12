// This file describes UI IPC.
// It is mostly invoked by the Worker.

export enum IpcUiMessageType {
  UTILS_PING = 'utils:ping',
}

export interface IpcUiMessageUtilsPing {
  type: IpcUiMessageType.UTILS_PING;
  data: {
    message: string;
  };
}

export type IpcUiMessage = IpcUiMessageUtilsPing;
