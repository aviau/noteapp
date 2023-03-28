import {
    Hotkey,
    Modifier,
    modifierKeys,
} from "@/ui/foundation/SettingsProvider";

export const sortModifiers = (modifiers: Modifier[]): Modifier[] => {
    return modifiers.sort(
        (a, b) => modifierKeys.indexOf(a) - modifierKeys.indexOf(b)
    );
};

export const hotkeyToString = (hotkey: Hotkey): string =>
    `${sortModifiers(hotkey.modifiers).join("+")}+${hotkey.key.toUpperCase()}`;

export const isModifier = (key: string) => modifierKeys.includes(key);

export const isKey = (key: string) => {
    return !modifierKeys.includes(key) && key !== "Escape";
};
