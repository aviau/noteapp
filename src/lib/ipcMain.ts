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

  // Quit the app.
  MAIN_UTILS_QUIT = 'main:utils:quit',
}

// Message interfaces for each of the channels.
export interface IpcMainChannelMessage<T extends IpcMainChannel> {
  data: T extends IpcMainChannel.MAIN_UTILS_PING
    ? {
        message: string;
      }
    : T extends IpcMainChannel.MAIN_UTILS_LOG
    ? {
        message: string;
      }
    : null;
}

// Some channels can have responses.
export interface IpcMainChannelResponse<T extends IpcMainChannel> {
  data: T extends IpcMainChannel.MAIN_UTILS_PING
    ? {
        reply: string;
      }
    : T extends IpcMainChannel.MAIN_UTILS_GET_USER_DATA_PATH
    ? {
        path: string;
      }
    : null;
}
