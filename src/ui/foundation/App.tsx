import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';

import routes from './routes';
import { ThemeProvider } from './components';

export default function App() {
  const routing = useRoutes(routes(), '');

  return (
    <ThemeProvider>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {routing}
      </Box>
    </ThemeProvider>
  );
}
