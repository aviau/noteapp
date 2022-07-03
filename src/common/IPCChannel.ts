/*
 * Channels for communications between the main thread and the renderer thread.
 * For clarity, channels are one-way and prefixed by the destination.
 */
export enum IPCChannel {
  /* Ping the Main thread */
  MAIN_PING = 'main:utils:ping',
  RENDERER_PONG = 'renderer:utils:pong',
}

export interface IPCChannelMessage<T extends IPCChannel> {
  data: T extends IPCChannel.MAIN_PING
    ? {
        message: string;
      }
    : T extends IPCChannel.RENDERER_PONG
    ? {
        reply: string;
      }
    : null;
}
