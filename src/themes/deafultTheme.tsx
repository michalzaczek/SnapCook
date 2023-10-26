import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    activeText?: string;
    inactiveText?: string;
  }
  interface PaletteColor {
    activeText?: string;
    inactiveText?: string;
  }
}

// A custom theme for this app
const deafultTheme = createTheme({
  palette: {
    primary: {
      main: '#9ACE98',
      light: '#e2f2e2',
      dark: '#001509',
      contrastText: '#fff',
      inactiveText: '#6c8373',
      activeText: '#001c0c',
    },
    secondary: {
      main: '#ffff',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        subtitle1: ({ theme }) => ({
          color: theme.palette.primary.activeText,
          fontSize: '25px',
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '50px',
          fontSize: '20px',
          color: theme.palette.primary.inactiveText,
          fontWeight: 700,
          backgroundColor: theme.palette.secondary.main,
          padding: '4px 30px',
          border: `2px solid ${theme.palette.primary.inactiveText}`,
          textTransform: 'capitalize',
        }),
      },
    },
  },
  typography: {
    fontFamily: 'Lato',
    allVariants: {
      color: '#001509',
      fontSize: '20px',
    },
    h1: {
      fontFamily: 'Lobster',
    },
    h2: {
      fontFamily: 'Lobster',
    },
    h3: {
      fontFamily: 'Lobster',
    },
    h4: {
      fontFamily: 'Lobster',
    },
  },
});

export default deafultTheme;
