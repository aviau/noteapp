import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../SettingsProvider/context';

import theme from './theme';

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const { settings } = useContext(SettingsContext);
  const [mode, setMode] = useState(settings.appearance.mode);

  useEffect(
    () => setMode(settings.appearance.mode),
    [settings.appearance.mode]
  );

  return <MuiThemeProvider theme={theme(mode)}>{children}</MuiThemeProvider>;
}
