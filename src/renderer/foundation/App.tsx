import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import theme from './theme';
import routes from './routes';

export default function App() {
  const routing = useRoutes(routes(), '');

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {routing}
      </Box>
    </ThemeProvider>
  );
}
