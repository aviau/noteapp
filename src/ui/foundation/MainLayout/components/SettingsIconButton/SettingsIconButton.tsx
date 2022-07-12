import { Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

import { SettingsModal } from '@/ui/components';

export function SettingsIconButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Settings />
      </IconButton>
      <SettingsModal open={open} onClose={handleClose} />
    </>
  );
}
