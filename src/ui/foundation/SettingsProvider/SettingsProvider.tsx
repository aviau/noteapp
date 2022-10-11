import React, { useCallback, useState } from "react";

import { defaultSettings, SettingsContext } from "./context";
import { Settings } from "./types";

interface Props {
  children: React.ReactNode;
}

export function SettingsProvider({ children }: Props) {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    const handleSettingsChange = useCallback((values: Settings) => {
        setSettings(values);
    }, []);

    return (
        <SettingsContext.Provider
            value={{ settings, setSettings: handleSettingsChange }}
        >
            {children}
        </SettingsContext.Provider>
    );
}
