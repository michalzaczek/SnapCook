import './App.scss';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import defaultTheme from './themes/defaultTheme';
import AppContent from './components/app-content/app-content';
import { UIMessageProvider } from './contexts/ui-message/ui-message.context';

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            minHeight: '100vh',
          }}
        >
          <UIMessageProvider>
            <AppContent></AppContent>
          </UIMessageProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
