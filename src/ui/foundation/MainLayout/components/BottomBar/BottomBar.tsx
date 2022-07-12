import { Box, Divider, Typography, useTheme } from '@mui/material';

import useWindowDimensions from '@/ui/utilities/useWindowDimensions';

export function BottomBar() {
  const theme = useTheme();
  const { height, width, breakpoint } = useWindowDimensions();

  return (
    <Box sx={{ background: theme.palette.secondary.main }} component="footer">
      <Divider />
      <Typography
        variant="subtitle2"
        align="right"
        component="p"
        sx={{ color: theme.palette.text.secondary, my: 1, mr: 6 }}
      >
        height: {height}, width: {width}, breakpoint: {breakpoint}
      </Typography>
    </Box>
  );
}
