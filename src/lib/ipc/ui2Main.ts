// This file describe the UI --> MAIN communication.

export enum Ui2MainMessageType {
    // UTILS
    UTILS_PING = "utils_ping",
    // WINDOWS
    WINDOWS_MINIMIZE = "windows_minimize",
    WINDOWS_MAXIMIZE = "windows_maximize",
    WINDOWS_QUIT = "windows_quit",
}

export type Ui2MainRequest = Ui2MainMessage["request"];
export type IpcMainChannelResponse = Ui2MainMessage["response"];

export type Ui2MainResponseFor<T extends Ui2MainRequest> = Extract<
  Ui2MainMessage,
  { request: T }
>["response"];

export type Ui2MainMessage = 
    // ***********
    // ** UTILS **
    // ***********
    | {
        request: {
            type: Ui2MainMessageType.UTILS_PING,
            message: string;
        },
        response: {
            message: string;
        },
    }
    // *************
    // ** WINDOWS **
    // *************
    | {
        request: {
            type: Ui2MainMessageType.WINDOWS_MINIMIZE,
        },
        response: null,
    }
    | {
        request: {
            type: Ui2MainMessageType.WINDOWS_MAXIMIZE,
        },
        response: null,
    }
    | {
        request: {
            type: Ui2MainMessageType.WINDOWS_QUIT,
        },
        response: null,
    }
;
