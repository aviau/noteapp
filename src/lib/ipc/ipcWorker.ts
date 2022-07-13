// This file describes the WORKER IPC.
// It is mostly invoked by the UI.

export enum IpcWorkerMessageType {
  UTILS_PING = 'utils:ping',
  WINDOWS_MINIMIZE = 'windows:minimize',
  WINDOWS_MAXIMIZE = 'windows:maximize',
  WINDOWS_QUIT = 'windows:quit',
}

export type IpcWorkerMessage = IpcWorkerMessages['request'];
export type IpcWorkerResponse = IpcWorkerMessages['response'];

export type IpcWorkerResponseFor<T extends IpcWorkerMessage> = Extract<
  IpcWorkerMessages,
  { request: T }
>['response'];

export type IpcWorkerMessageOf<T extends IpcWorkerMessageType> = Extract<
  IpcWorkerMessages,
  { request: { type: T } }
>['request'];

export type IpcWorkerResponseOf<T extends IpcWorkerMessageType> = Extract<
  IpcWorkerMessages,
  { request: { type: T } }
>['response'];

type IpcWorkerMessages =
  // ***********
  // ** UTILS **
  // ***********
  | {
      request: {
        type: IpcWorkerMessageType.UTILS_PING;
        data: {
          message: string;
        };
      };
      response: {
        message: string;
      };
    }
  // *************
  // ** WINDOWS **
  // *************
  | {
      request: {
        type: IpcWorkerMessageType.WINDOWS_MINIMIZE;
      };
      response: null;
    }
  | {
      request: {
        type: IpcWorkerMessageType.WINDOWS_MAXIMIZE;
      };
      response: null;
    }
  | {
      request: {
        type: IpcWorkerMessageType.WINDOWS_QUIT;
      };
      response: null;
    };
