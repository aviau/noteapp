// This file describes the MAIN <--> RENDERER IPC.
//
// It has type definitions for:
// - Channels
// - Messages
// - Responses
//
// The IPC is used to communicate with the main process from
// the two renderer processes: Worker and Ui.

// Channels for communications between processes. For clarity,
// channels are one-way and prefixed by the original destination.
export enum IpcMainChannel {
  // *********
  // ** IPC **
  // *********

  // Somebody asked for channels to be refreshed.
  MAIN_IPC_REQUEST_CHANNEL_REFRESH = 'main:ipc:request-channel-refresh',

  // The main process provides a channel to a renderer process.
  // It could be the UI or the worker process.
  RENDERER_IPC_SET_CHANNEL = 'renderer:ipc:set-channel',

  // ***********
  // ** UTILS **
  // ***********

  // Ping the main process
  MAIN_UTILS_PING = 'main:utils:ping',

  // Send logs to the main process. Mostly for debugging.
  MAIN_UTILS_LOG = 'main:utils:log',

  // Obtain the directory for storing user configuration.
  MAIN_UTILS_GET_USER_DATA_PATH = 'main:utils:get-user-data-path',

  // *************
  // ** WINDOWS **
  // *************
  MAIN_WINDOWS_MINIMIZE = 'main:windows:minimize',
  MAIN_WINDOWS_MAXIMIZE = 'main:windows:maximize',
  MAIN_WINDOWS_QUIT = 'main:windows:quit',
}

export type IpcMainChannelMessage = IpcMainMessages['request'];
export type IpcMainChannelResponse = IpcMainMessages['response'];

export type IpcMainChannelMessageOf<T extends IpcMainMessages['type']> =
  Extract<IpcMainMessages, { type: T }>['request'];
export type IpcMainChannelResponseOf<T extends IpcMainMessages['type']> =
  Extract<IpcMainMessages, { type: T }>['response'];

export type IpcMainMessages =
  // *********
  // ** IPC **
  // *********
  | {
      type: IpcMainChannel.MAIN_IPC_REQUEST_CHANNEL_REFRESH;
      request: null;
      response: null;
    }
  | {
      type: IpcMainChannel.RENDERER_IPC_SET_CHANNEL;
      request: null;
      response: null;
    }

  // ***********
  // ** UTILS **
  // ***********
  | {
      type: IpcMainChannel.MAIN_UTILS_PING;
      request: {
        data: {
          message: string;
        };
      };
      response: {
        data: {
          reply: string;
        };
      };
    }
  | {
      type: IpcMainChannel.MAIN_UTILS_LOG;
      request: {
        data: {
          message: string;
        };
      };
      response: null;
    }
  | {
      type: IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH;
      request: null;
      response: {
        data: {
          path: string;
        };
      };
    }

  // *************
  // ** WINDOWS **
  // *************
  | {
      type: IpcMainChannel.MAIN_WINDOWS_MINIMIZE;
      request: null;
      response: null;
    }
  | {
      type: IpcMainChannel.MAIN_WINDOWS_MAXIMIZE;
      request: null;
      response: null;
    }
  | {
      type: IpcMainChannel.MAIN_WINDOWS_QUIT;
      request: null;
      response: null;
    };
