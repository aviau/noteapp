type ThemeMode = 'light' | 'dark';

export interface AppearanceSettings {
  mode: ThemeMode;
}

// TODO: map modifiers to alternative keys (eg. Control to CTRL)
// NOTE: The order of the modifiers below also determines the order we store them
export const modifierKeys = ['Control', 'Meta', 'Shift', 'Alt'];

export type Modifier = typeof modifierKeys[number];

export interface Hotkey {
  modifiers: Modifier[];
  key: string;
}

export interface Command {
  id: string;
  name: string;
  callback?: () => void;
  hotkeys?: Hotkey[];
}

export type CommandsSettings = Command[];

export interface Settings {
  appearance: AppearanceSettings;
  commands: CommandsSettings;
}
