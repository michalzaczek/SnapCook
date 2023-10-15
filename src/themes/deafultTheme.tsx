import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const deafultTheme = createTheme({
  palette: {
    primary: {
      main: '#9ACE98',
      light: '#9FD39E4D',
      dark: '#001509',
      contrastText: '#fff'

    },
    secondary: {
      main: '#ffff',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        outlined: {
          background: "#fff",
          "&&:hover": {
            background: "#fff"
          }
        },
        filled: {
          "&&:hover": {
            background: "#9ACE98"
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          background: "#fff",
          "&&:hover": {
            background: "#fff"
          }
        }
      }
    }
  },
  typography: {
    allVariants: {
      color: '#001509',
      fontFamily: 'Lobster'
    },
    button: {
      fontFamily: 'Lato'
    }
  }
});

export default deafultTheme;
