// This file describes UI IPC.
// It is mostly invoked by the Worker.

export enum IpcUiMessageType {
  UTILS_PING = 'utils:ping',
}

export type IpcUiMessage = {
  type: IpcUiMessageType.UTILS_PING;
  data: {
    message: string;
  };
};
