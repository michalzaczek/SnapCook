import './App.scss';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import defaultTheme from './themes/defaultTheme';
import { AuthProvider } from './contexts/auth/auth-context';
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
            <AuthProvider>
              <AppContent></AppContent>
            </AuthProvider>
          </UIMessageProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
