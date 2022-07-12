// This file describes the WORKER IPC.
// It is mostly invoked by the UI.

export enum IpcWorkerMessageType {
  UTILS_PING = 'utils:ping',
  WINDOWS_MINIMIZE = 'windows:minimize',
  WINDOWS_MAXIMIZE = 'windows:maximize',
  WINDOWS_QUIT = 'windows:quit',
}

export interface IpcWorkerMessageUtilsPing {
  type: IpcWorkerMessageType.UTILS_PING;
  data: {
    message: string;
  };
}

export interface IpcWorkerMessageWindowsMinimize {
  type: IpcWorkerMessageType.WINDOWS_MINIMIZE;
}

export interface IpcWorkerMessageWindowsMaximize {
  type: IpcWorkerMessageType.WINDOWS_MAXIMIZE;
}

export interface IpcWorkerMessageWindowsQuit {
  type: IpcWorkerMessageType.WINDOWS_QUIT;
}

export type IpcWorkerMessage =
  | IpcWorkerMessageUtilsPing
  | IpcWorkerMessageWindowsMinimize
  | IpcWorkerMessageWindowsMaximize
  | IpcWorkerMessageWindowsQuit;
