import { Box, Divider, Typography, useTheme } from '@mui/material';

export function BottomBar() {
  const theme = useTheme();

  return (
    <Box sx={{ background: theme.palette.secondary.main }} component="footer">
      <Divider />
      <Typography
        variant="subtitle2"
        align="right"
        component="p"
        sx={{ color: theme.palette.text.secondary, my: 1, mr: 6 }}
      >
        Bottom bar
      </Typography>
    </Box>
  );
}
