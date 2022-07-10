import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';

import { ThemeProvider } from './ThemeProvider';
import routes from './routes';

export default function App() {
  const routing = useRoutes(routes(), '');

  return (
    <ThemeProvider>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}
