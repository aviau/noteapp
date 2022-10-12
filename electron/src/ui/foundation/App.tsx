import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';

import { CommandPalette } from './CommandPalette';
import { GlobalCommands } from './GlobalCommands';
import { GlobalStateProvider } from './GlobalStateProvider';
import { QueryClientProvider } from './QueryClientProvider';
import { SettingsProvider } from './SettingsProvider';
import { ThemeProvider } from './ThemeProvider';

import routes from './routes';

export default function App() {
  const routing = useRoutes(routes(), '');

  return (
    <QueryClientProvider>
      <GlobalStateProvider>
        <SettingsProvider>
          <ThemeProvider>
            <GlobalCommands />
            <CssBaseline />
            {routing}
            <CommandPalette />
          </ThemeProvider>
        </SettingsProvider>
      </GlobalStateProvider>
    </QueryClientProvider>
  );
}
