/*
 * Channels for communications between the main thread and the renderer thread.
 * For clarity, channels are one-way and prefixed by the original destination.
 */
export enum IpcChannel {
  /* Ping the Main thread */
  MAIN_PING = 'main:utils:ping',
  MAIN_PING_REPLY = 'renderer:utils:pong',
}

export interface IpcChannelMessage<T extends IpcChannel> {
  data: T extends IpcChannel.MAIN_PING
    ? {
        message: string;
      }
    : T extends IpcChannel.MAIN_PING_REPLY
    ? {
        reply: string;
      }
    : null;
}
