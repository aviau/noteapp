import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = (mode: 'light' | 'dark') => {
  return createTheme({
    zIndex: {
      appBar: 1251,
    },
    palette: {
      mode,
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
  });
};

export default theme;
