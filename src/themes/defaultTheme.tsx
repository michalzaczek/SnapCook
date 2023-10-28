import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    text?: string;
  }
  interface PaletteColor {
    text?: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    cta: true;
  }
}

// A custom theme for this app
const deafultTheme = createTheme({
  palette: {
    primary: {
      main: '#9ACE98',
      light: '#e2f2e2',
      dark: '#01321D',
      text: '#677d73',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffff',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '50px',
          fontSize: '20px',
          color: theme.palette.primary.text,
          fontWeight: 700,
          backgroundColor: theme.palette.secondary.main,
          padding: '4px 30px',
          border: `2px solid ${theme.palette.primary.text}`,
          textTransform: 'capitalize',
          '&&:hover': {
            borderColor: theme.palette.primary.text,
            backgroundColor: theme.palette.secondary.main,
            borderWidth: '2px',
          },
        }),
      },
      variants: [
        {
          props: { variant: 'cta' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            '&&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.dark,
            },
          }),
        },
        {
          props: { variant: 'cta', disabled: true },
          style: ({ theme }) => ({
            backgroundColor: 'transparent',
          }),
        },
      ],
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.secondary.main,
          borderRadius: '150px !important',
        }),
      },
    },
  },
  typography: (palette) => ({
    fontFamily: 'Lato',
    allVariants: {
      color: palette.text.primary,
      fontSize: '20px',
    },
    h1: {
      fontFamily: 'Lobster',
      color: 'palette.primary.dark',
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
  }),
});

export default deafultTheme;
