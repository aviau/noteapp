// This file describes the WORKER IPC.
// It is mostly invoked by the UI.

export enum IpcWorkerMessageType {
  UTILS_PING = 'utils:ping',
  WINDOWS_MINIMIZE = 'windows:minimize',
  WINDOWS_QUIT = 'windows:quit',
}

export type IpcWorkerMessage =
  | {
      type: IpcWorkerMessageType.UTILS_PING;
      data: {
        message: string;
      };
    }
  | {
      type: IpcWorkerMessageType.WINDOWS_MINIMIZE;
    }
  | {
      type: IpcWorkerMessageType.WINDOWS_QUIT;
    };
