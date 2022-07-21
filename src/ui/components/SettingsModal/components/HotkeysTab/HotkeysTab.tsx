import { TextField } from '@mui/material';
import React, { useState } from 'react';

import { FormItemProps, FormList } from '@/ui/components/FormList';
import { Command, CommandsSettings } from '@/ui/foundation/SettingsProvider';
import { CommandInput } from './CommandInput';

interface Props {
  settings: CommandsSettings;
  onChange: (settings: CommandsSettings) => void;
}

// TODO: Add warning when hotkey is used by another command
export function HotkeysTab({ settings, onChange }: Props) {
  const [commands, setCommands] = useState(settings);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCommandChange = (command: Command) => {
    const newCommands = commands.map((cmd) =>
      cmd.id === command.id ? command : cmd
    );

    setCommands(newCommands);
    onChange(newCommands);
  };

  const items: FormItemProps[] = commands
    .filter((command) =>
      command.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .map((command) => {
      return {
        title: command.name,
        children: (
          <CommandInput command={command} onChange={handleCommandChange} />
        ),
      };
    });

  return (
    <>
      <TextField
        placeholder="Filter..."
        variant="outlined"
        size="small"
        fullWidth
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <FormList items={items} />
    </>
  );
}
