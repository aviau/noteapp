import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

import { AppearanceSettings } from "@/ui/foundation/SettingsProvider";
import { FormItemProps, FormList } from "@/ui/components/FormList";

interface Props {
  settings: AppearanceSettings;
  onChange: (settings: AppearanceSettings) => void;
}

export function AppearanceTab({ settings, onChange }: Props) {
    const [mode, setMode] = useState(settings.mode);

    const handleModeChange = (event: SelectChangeEvent) => {
        const newMode = event.target.value as AppearanceSettings["mode"];
        setMode(newMode);
        onChange({
            ...settings,
            mode: newMode,
        });
    };

    const options: AppearanceSettings["mode"][] = ["dark", "light"];

    const items: FormItemProps[] = [
        {
            title: "Base theme",
            description: "Choose default theme",
            children: (
                <Select value={mode} onChange={handleModeChange} sx={{ width: "100%" }}>
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            ),
        },
    ];

    return <FormList items={items} />;
}
