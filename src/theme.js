import { createTheme } from '@material-ui/core/styles';

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: { main: '#2196f3' },
    background: { default: '#f5f5f5' },
  },
});

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: '#bb86fc' },
    background: { default: '#121212' },
  },
});
