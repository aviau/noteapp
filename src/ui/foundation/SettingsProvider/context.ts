import { createContext } from "react";

import { Settings } from "./types";

export const defaultSettings: Settings = {
    appearance: {
        mode: "dark",
    },
    commands: [
        {
            id: "test",
            name: "Test",
            callback() {
                console.log("Test");
            },
        },
        {
            id: "hello",
            name: "Hello",
            hotkeys: [
                { modifiers: ["Control"], key: "l" },
                { modifiers: ["Control"], key: "k" },
            ],
            callback() {
                console.log("HelloWorld");
            },
        },
        {
            id: "command_palette",
            name: "Command Palette",
            hotkeys: [
                { modifiers: ["Control"], key: "p" },
                { modifiers: ["Meta"], key: "p" },
            ],
        },
    ],
};

type SettingsContextType = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    setSettings: () => {},
});
