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
  /*
   *********
   ** IPC **
   *********
   */

  // Somebody asked for channels to be refreshed.
  MAIN_IPC_REQUEST_CHANNEL_REFRESH = 'main:ipc:request-channel-refresh',

  // The main process provides a channel to a renderer process.
  // It could be the UI or the worker process.
  RENDERER_IPC_SET_CHANNEL = 'renderer:ipc:set-channel',

  /*
   ***********
   ** UTILS **
   ***********
   */

  // Ping the main process
  MAIN_UTILS_PING = 'main:utils:ping',

  // Send logs to the main process. Mostly for debugging.
  MAIN_UTILS_LOG = 'main:utils:log',

  // Obtain the directory for storing user configuration.
  MAIN_UTILS_GET_USER_DATA_PATH = 'main:utils:get-user-data-path',

  /*
   *************
   ** WINDOWS **
   *************
   */

  MAIN_WINDOWS_MINIMIZE = 'main:windows:minimize',
  MAIN_WINDOWS_QUIT = 'main:windows:quit',
}

// Message interfaces for each of the channels.
export type IpcMainChannelMessage<T extends IpcMainChannel> =
  T extends IpcMainChannel.MAIN_UTILS_PING
    ? {
        data: {
          message: string;
        };
      }
    : T extends IpcMainChannel.MAIN_UTILS_LOG
    ? {
        data: {
          message: string;
        };
      }
    : null;

// Some channels can have responses.
export type IpcMainChannelResponse<T extends IpcMainChannel> =
  T extends IpcMainChannel.MAIN_UTILS_PING
    ? {
        data: {
          reply: string;
        };
      }
    : T extends IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH
    ? {
        data: {
          path: string;
        };
      }
    : null;
