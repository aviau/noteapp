import React, { useContext } from "react";

import { SettingsContext } from "@/ui/foundation/SettingsProvider";
import { useCommands } from "@/ui/hooks";

/**
 * Register commands globally in the app.
 */
export function GlobalCommands() {
    const { settings } = useContext(SettingsContext);
    useCommands(settings.commands);
    return <></>;
}
