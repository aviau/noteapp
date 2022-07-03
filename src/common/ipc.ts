/*
 * Channels for communications between the main thread and the renderer thread.
 * For clarity, channels are one-way and prefixed by the original destination.
 */
export enum IpcChannel {
  /* Ping the Main thread */
  MAIN_UTILS_PING = 'main:utils:ping',
  MAIN_UTILS_PING_REPLY = 'main:utils:ping:reply',
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
    : null;
}
