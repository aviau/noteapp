import { createTheme } from '@mui/material/styles';

const lightTheme = {
  primary: {
    main: '#8273e6',
  },
  secondary: {
    main: '#f2f3f5',
    dark: '#e3e5e8',
  },
  text: {
    primary: '#2e3338',
    secondary: '#3b4045',
  },
  background: {
    default: '#ffffff',
  },
};

const darkTheme = {
  primary: {
    main: '#4d3ca6',
  },
  secondary: {
    main: '#161616',
    dark: '#060606',
  },
  text: {
    primary: '#dcddde',
    secondary: '#8e8e8e',
  },
  background: {
    default: '#202020',
  },
};

const theme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightTheme : darkTheme),
    },
    components: {
      MuiToolbar: {
        defaultProps: {
          variant: 'dense',
        },
      },
    },
  });
};

export default theme;
