import { modifierKeys, Hotkey } from '@/ui/foundation/SettingsProvider';

export const hotkeyToString = (hotkey: Hotkey): string =>
  `${hotkey.modifiers.join('+')}+${hotkey.key.toUpperCase()}`;

export const isModifier = (key: string) => modifierKeys.includes(key);

export const isKey = (key: string) => {
  return !modifierKeys.includes(key) && key !== 'Escape';
};
