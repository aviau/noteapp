// Channels for communications between processes. For clarity,
// channels are one-way and prefixed by the original destination.
export enum IpcChannel {
  // Ping the main process
  MAIN_UTILS_PING = 'main:utils:ping',
  MAIN_UTILS_PING_REPLY = 'main:utils:ping:reply',

  // Send logs to the main process. Mostly for debugging.
  MAIN_UTILS_LOG = 'main:utils:log',

  // Somebody asked for channels to be refreshed.
  MAIN_IPC_REQUEST_CHANNEL_REFRESH = 'main:ipc:request-channel-refresh',

  // The main process provides a channel to a renderer process.
  // It could be the UI or the worker process.
  RENDERER_IPC_SET_CHANNEL = 'renderer:ipc:set-channel',
}

export interface IpcChannelMessage<T extends IpcChannel> {
  data: T extends IpcChannel.MAIN_UTILS_PING
    ? {
        message: string;
      }
    : T extends IpcChannel.MAIN_UTILS_PING_REPLY
    ? {
        reply: string;
      }
    : T extends IpcChannel.MAIN_UTILS_LOG
    ? {
        message: string;
      }
    : null;
}
