import './App.scss';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import defaultTheme from './themes/defaultTheme';
import AppContent from './components/app-content/app-content';
import { UIMessageProvider } from './contexts/ui-message/ui-message.context';
import LoadingScreen from './components/loading-screen/loading-screen';
import { LoadingScreenProvider } from './contexts/loading-screen/loading-screen-context';

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
            <LoadingScreenProvider>
              <LoadingScreen />
              <AppContent />
            </LoadingScreenProvider>
          </UIMessageProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
