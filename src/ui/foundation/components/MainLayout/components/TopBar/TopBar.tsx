import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function TopBar() {
  const theme = useTheme();
  const navigate = useNavigate();

  // TODO: Improve navigation
  // Find if there's a previous or next path in the stack, so we can disable the button when unavailable
  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);

  return (
    <Toolbar sx={{ background: theme.palette.secondary.dark, minHeight: 30 }}>
      <IconButton onClick={handleBack}>
        <ArrowBack
          fontSize="small"
          sx={{ color: theme.palette.text.secondary }}
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
        Note App
      </Typography>
    </Toolbar>
  );
}