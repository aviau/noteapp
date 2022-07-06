import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function TopBar() {
  const theme = useTheme();
  const navigate = useNavigate();

  // TODO: Improve navigation
  // Find if there's a previous or next path in the stack, so we can disable the button when unavailable
  const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);

  return (
    <AppBar
      component="nav"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: theme.palette.secondary.dark,
      }}
    >
      <Toolbar variant="dense">
        <Grid container alignItems="center">
          <Grid item xs={3}>
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
          </Grid>
          <Grid item xs={6}>
            <Typography
              align="center"
              sx={{ color: theme.palette.text.secondary }}
            >
              Note App
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
