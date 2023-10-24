import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    navbarIcon?: string;
  }
  interface PaletteColor {
    navbarIcon?: string;
  }
}

// A custom theme for this app
const deafultTheme = createTheme({
  palette: {
    primary: {
      main: '#9ACE98',
      light: '#9FD39E4D',
      dark: '#001509',
      contrastText: '#fff',
      navbarIcon: '#001C0C80',
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
          background: '#fff',
          '&&:hover': {
            background: '#fff',
          },
        },
        filled: {
          '&&:hover': {
            background: '#9ACE98',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          background: '#fff',
          '&&:hover': {
            background: '#fff',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: ({ theme }) => ({
          color: theme.palette.primary.navbarIcon,
          fontSize: '25px',
        }),
      },
    },
  },
  typography: {
    allVariants: {
      color: '#001509',
      fontFamily: 'Lato',
    },
    button: {
      fontFamily: 'Lato',
    },
    h1: {
      fontFamily: 'Lobster',
    },
  },
});

export default deafultTheme;
