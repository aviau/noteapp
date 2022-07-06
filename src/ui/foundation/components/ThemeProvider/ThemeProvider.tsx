import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { createContext, useState } from 'react';

import theme from './theme';

type ThemeMode = 'light' | 'dark';

export const ThemeContext = createContext<{
  mode: ThemeMode;
  toggleMode: () => void;
}>({
  mode: 'dark',
  toggleMode: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <MuiThemeProvider theme={theme(mode)}>
      <ThemeContext.Provider value={{ mode, toggleMode }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}
