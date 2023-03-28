import { isEmpty } from "lodash";
import { useContext, useEffect, useMemo, useState } from "react";

import { Command, Modifier } from "@/ui/foundation/SettingsProvider";
import { hotkeyToString, isKey, isModifier } from "@/ui/utilities";
import { GlobalStateContext } from "../foundation/GlobalStateProvider";

/**
 * Bind commands hotkeys to keyboard event listener.
 *
 * @param commands
 */
export function useCommands(commands: Command[]) {
    const { commandEventTarget } = useContext(GlobalStateContext);
    const [modifiersPressed, setModifiersPressed] = useState<Modifier[]>([]);
    const [keyPressed, setKeyPressed] = useState<string | undefined>();
    const [activeCommand, setActiveCommand] = useState<Command>();

    const registerCommandsHotkeys: Map<string, Command> = useMemo(() => {
        const commandsHotkeys = commands
            .map((command) =>
                command.hotkeys?.map((hotkey) => [hotkeyToString(hotkey), command])
            )
            .filter((tuple) => tuple !== undefined)
            .flat() as [string, Command][];

        return new Map<string, Command>(commandsHotkeys);
    }, [commands]);

    useEffect(() => {
        const downHandler = ({ key }: KeyboardEvent) => {
            if (isModifier(key) && !modifiersPressed.includes(key)) {
                setModifiersPressed([...modifiersPressed, key]);
            }
            if (isKey(key)) {
                setKeyPressed(key);
            }
        };
        const upHandler = ({ key }: KeyboardEvent) => {
            if (modifiersPressed.includes(key)) {
                setModifiersPressed((m) => m.filter((k) => k !== key));
            }
            if (keyPressed === key) {
                setKeyPressed(undefined);
                setActiveCommand(undefined);
            }
        };

        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, [keyPressed, modifiersPressed, registerCommandsHotkeys]);

    useEffect(() => {
        const isHotkeyPressed = !isEmpty(modifiersPressed) && keyPressed;
        if (!activeCommand && isHotkeyPressed) {
            const command = registerCommandsHotkeys.get(
                hotkeyToString({
                    modifiers: modifiersPressed,
                    key: keyPressed,
                })
            );

            setActiveCommand(command);
        }
    }, [modifiersPressed, keyPressed, activeCommand, registerCommandsHotkeys]);

    useEffect(() => {
        if (activeCommand) {
            // Trigger activeCommand callback if exists
            if (activeCommand.callback) {
                activeCommand.callback();
            }
            // Dispatch command event
            commandEventTarget.dispatchEvent(new CustomEvent(activeCommand.id));
        }
    }, [activeCommand, commandEventTarget]);
}
