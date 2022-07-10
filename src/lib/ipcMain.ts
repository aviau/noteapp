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
export enum IpcChannel {
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
}

// Message interfaces for each of the channels.
export interface IpcChannelMessage<T extends IpcChannel> {
  data: T extends IpcChannel.MAIN_UTILS_PING
    ? {
        message: string;
      }
    : T extends IpcChannel.MAIN_UTILS_LOG
    ? {
        message: string;
      }
    : null;
}

// Some channels can have responses.
export interface IpcChannelResponse<T extends IpcChannel> {
  data: T extends IpcChannel.MAIN_UTILS_PING
    ? {
        reply: string;
      }
    : T extends IpcChannel.MAIN_UTILS_GET_USER_DATA_PATH
    ? {
        path: string;
      }
    : null;
}
