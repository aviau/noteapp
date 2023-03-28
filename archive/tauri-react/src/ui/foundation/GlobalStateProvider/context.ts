import { createContext } from "react";
import { UiMain } from "@/ui/uiMain";

export class CommandEventTarget extends EventTarget {}

export interface GlobalState {
  activeVaultId: string;
  uiMain: UiMain;
  commandEventTarget: CommandEventTarget;
}

export const GlobalStateContext = createContext<GlobalState>({} as GlobalState);
