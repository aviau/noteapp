import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';

import { GlobalCommands } from './GlobalCommands';
import { SettingsProvider } from './SettingsProvider';
import { ThemeProvider } from './ThemeProvider';

import routes from './routes';

export default function App() {
  const routing = useRoutes(routes(), '');

  return (
    <SettingsProvider>
      <ThemeProvider>
        <GlobalCommands />
        <CssBaseline />
        {routing}
      </ThemeProvider>
    </SettingsProvider>
  );
}
