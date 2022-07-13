// This file describes UI IPC.
// It is mostly invoked by the Worker.

export enum IpcUiMessageType {
  UTILS_PING = 'utils:ping',
}

export type IpcUiMessage = IpcUiMessages['request'];
export type IpcUiResponse = IpcUiMessages['response'];

export type IpcUiMessageOf<T extends IpcUiMessageType> = Extract<
  IpcUiMessages,
  { request: { type: T } }
>['request'];

export type IpcUiResponseOf<T extends IpcUiMessageType> = Extract<
  IpcUiMessages,
  { request: { type: T } }
>['response'];

type IpcUiMessages = {
  request: {
    type: IpcUiMessageType.UTILS_PING;
    data: {
      message: string;
    };
  };
  response: null;
};
