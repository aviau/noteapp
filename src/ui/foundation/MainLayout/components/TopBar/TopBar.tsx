import {
  ArrowBack,
  ArrowForward,
  Close,
  CropSquare,
  HorizontalRule,
} from '@mui/icons-material';
import { IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { uiMain } from '@/ui/index';
import { IpcWorkerMessageType } from '@/lib/ipc/ipcWorker';
import { useSettingsLastActiveVaultId } from '@/ui/hooks/query';

export function TopBar() {
  const theme = useTheme();
  const navigate = useNavigate();

  // TODO: Improve navigation
  // Find if there's a previous or next path in the stack, so we can disable the button when unavailable
  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);
  const handleMinimize = () => {
    uiMain.workerInvoke({ type: IpcWorkerMessageType.WINDOWS_MINIMIZE });
  };
  const handleMaximize = () => {
    uiMain.workerInvoke({ type: IpcWorkerMessageType.WINDOWS_MAXIMIZE });
  };
  const handleQuit = () => {
    uiMain.workerInvoke({ type: IpcWorkerMessageType.WINDOWS_QUIT });
  };

  const lastVaultIdQuery = useSettingsLastActiveVaultId();
  const appTitlePrefix = lastVaultIdQuery.data
    ? `${lastVaultIdQuery.data} -`
    : '';

  return (
    <Toolbar
      sx={{
        background: theme.palette.secondary.dark,
        minHeight: 30,
        WebkitAppRegion: 'drag',
        '& > button': {
          WebkitAppRegion: 'no-drag',
        },
      }}
    >
      <IconButton onClick={handleBack}>
        <ArrowBack
          fontSize="small"
          sx={{
            color: theme.palette.text.secondary,
          }}
        />
      </IconButton>
      <IconButton onClick={handleForward}>
        <ArrowForward
          fontSize="small"
          sx={{ color: theme.palette.text.secondary }}
        />
      </IconButton>
      <Typography
        variant="subtitle2"
        align="center"
        component="p"
        sx={{ flex: 1, color: theme.palette.text.secondary }}
      >
        {appTitlePrefix} Note App
      </Typography>
      <IconButton onClick={handleMinimize}>
        <HorizontalRule
          fontSize="small"
          sx={{ color: theme.palette.text.secondary }}
        />
      </IconButton>
      <IconButton onClick={handleMaximize}>
        <CropSquare
          fontSize="small"
          sx={{ color: theme.palette.text.secondary }}
        />
      </IconButton>
      <IconButton onClick={handleQuit}>
        <Close fontSize="small" sx={{ color: theme.palette.text.secondary }} />
      </IconButton>
    </Toolbar>
  );
}
