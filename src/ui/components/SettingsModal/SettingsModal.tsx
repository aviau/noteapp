import { Box, Modal, useTheme } from '@mui/material';

import { useCallback, useContext } from 'react';

import {
  AppearanceSettings,
  SettingsContext,
} from '@/ui/foundation/SettingsProvider';
import { TabsPanel } from '../TabsPanel';
import { AppearanceTab } from './components';

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Returns a modal to update the application settings */
export function SettingsModal({ open, onClose }: Props) {
  const { settings, setSettings } = useContext(SettingsContext);
  const theme = useTheme();
  const handleClose = () => onClose();

  const handleAppearanceChange = useCallback(
    (values: AppearanceSettings) => {
      setSettings({
        ...settings,
        appearance: values,
      });
    },
    [setSettings, settings]
  );

  const tabItems = [
    {
      id: 'appearance',
      label: 'Appearance',
      children: (
        <AppearanceTab
          settings={settings.appearance}
          onChange={handleAppearanceChange}
        />
      ),
    },
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '70vh',
          bgcolor: theme.palette.background.default,
        }}
      >
        <TabsPanel
          items={tabItems}
          orientation="vertical"
          sx={{ backgroundColor: theme.palette.secondary.dark, py: 2 }}
        />
      </Box>
    </Modal>
  );
}
