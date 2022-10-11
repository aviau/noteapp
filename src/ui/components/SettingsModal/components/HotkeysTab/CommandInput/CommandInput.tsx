import { Add, Clear } from "@mui/icons-material";
import { Chip, IconButton, Stack, Tooltip } from "@mui/material";
import { findIndex, isEmpty } from "lodash";
import { useEffect } from "react";

import { Command, Hotkey } from "@/ui/foundation/SettingsProvider";
import { useHotkeyListener, useToggle } from "@/ui/hooks";
import { hotkeyToString } from "@/ui/utilities";

interface AddHotkeyProps {
  onChange: (hotkey: Hotkey) => void;
}

function AddHotkey({ onChange }: AddHotkeyProps) {
    const hotkey = useHotkeyListener();

    useEffect(() => {
        if (hotkey) {
            onChange(hotkey);
        }
    }, [hotkey, onChange]);

    return <Chip label="Add hotkey..." color="primary" />;
}

interface CommandActionsProps {
  command: Command;
  onChange: (command: Command) => void;
}

// TODO: UX - Rebind "ESC" to cancel listening to hotkey instead of closing the modal
// TODO: Add restore default button
export function CommandInput({ command, onChange }: CommandActionsProps) {
    const [addHotkeyActive, toggleHotkeyActive] = useToggle();

    const handleDeleteHotkey = (hotkey: Hotkey) => {
        const hotkeys = command.hotkeys?.filter((k) => k !== hotkey);
        onChange({ ...command, hotkeys });
    };

    const handleAddHotkey = (hotkey: Hotkey) => {
        const index = findIndex(command.hotkeys, hotkey);
        if (index === -1) {
            onChange({
                ...command,
                hotkeys: [...(command.hotkeys || []), hotkey],
            });
        }

        toggleHotkeyActive();
    };

    const renderHotkeys = () => {
        if (isEmpty(command.hotkeys)) {
            return <Chip label="Blank" color="secondary" />;
        }

        return command.hotkeys?.map((hotkey) => (
            <Chip
                key={hotkeyToString(hotkey)}
                label={hotkeyToString(hotkey)}
                onDelete={() => handleDeleteHotkey(hotkey)}
                deleteIcon={<Clear />}
                color="secondary"
            />
        ));
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
        >
            {addHotkeyActive && <AddHotkey onChange={handleAddHotkey} />}
            {renderHotkeys()}
            <Tooltip title="Add shortcut" placement="top">
                <IconButton onClick={toggleHotkeyActive}>
                    <Add />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
