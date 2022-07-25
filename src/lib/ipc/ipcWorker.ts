// This file describes the WORKER IPC.
// It is mostly invoked by the UI.

export enum IpcWorkerMessageType {
  // ***********
  // ** UTILS **
  // ***********
  UTILS_PING = 'utils:ping',
  // *************
  // ** WINDOWS **
  // *************
  WINDOWS_MINIMIZE = 'windows:minimize',
  WINDOWS_MAXIMIZE = 'windows:maximize',
  WINDOWS_QUIT = 'windows:quit',
  // **************
  // ** SETTINGS **
  // **************
  SETTINGS_GET_LAST_ACTIVE_VAULT_ID = 'settings:getLastActiveVaultId',
  // ***********
  // ** VAULT **
  // ***********
  VAULT_GET_FILES = 'vault:getFiles',
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
    }
  // **************
  // ** SETTINGS **
  // **************
  | {
      request: {
        type: IpcWorkerMessageType.SETTINGS_GET_LAST_ACTIVE_VAULT_ID;
      };
      response: {
        vaultId: string | null;
      };
    }
  // ***********
  // ** VAULT **
  // ***********
  | {
      request: {
        type: IpcWorkerMessageType.VAULT_GET_FILES;
        vaultId: string;
      };
      response: {
        files: string[];
      };
    };
