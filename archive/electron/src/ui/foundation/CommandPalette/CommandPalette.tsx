import {
  Box,
  Chip,
  ListItemText,
  MenuItem,
  MenuList,
  Modal,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useContext, useState } from 'react';

import { Command, SettingsContext } from '@/ui/foundation/SettingsProvider';
import { useCommandListener } from '@/ui/hooks';
import { hotkeyToString } from '@/ui/utilities';

// TODO: Transform this component into a plugin
// TODO: Fix keyboard accessibility
export function CommandPalette() {
  const theme = useTheme();
  const { settings } = useContext(SettingsContext);
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // TODO: define command id somewhere
  useCommandListener('command_palette', handleOpen, handleClose);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleCommandClick = (command: Command) => {
    if (command.callback) {
      command.callback();
    }
    setOpen(false);
  };

  const commands = settings.commands.filter((command) =>
    command.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          p: theme.spacing(2),
          bgcolor: theme.palette.background.default,
        }}
      >
        <TextField
          placeholder="Filter..."
          variant="outlined"
          size="small"
          fullWidth
          onChange={handleFilterChange}
          sx={{ mb: 2 }}
        />
        <MenuList>
          {commands.map((command) => (
            <MenuItem
              key={command.id}
              onClick={() => handleCommandClick(command)}
            >
              <ListItemText>{command.name}</ListItemText>
              {command.hotkeys?.map((hotkey) => (
                <Chip
                  key={hotkeyToString(hotkey)}
                  label={hotkeyToString(hotkey)}
                  color="secondary"
                />
              ))}
            </MenuItem>
          ))}
          {isEmpty(commands) && (
            <Typography variant="body2" color="text.secondary" align="center">
              No commands found.
            </Typography>
          )}
        </MenuList>
      </Box>
    </Modal>
  );
}
