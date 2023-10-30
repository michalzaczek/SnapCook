import './App.scss';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import defaultTheme from './themes/defaultTheme';
import { AuthProvider } from './contexts/auth/auth-context';
import AppContent from './components/app-content/app-content';

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
          <AuthProvider>
            <AppContent></AppContent>
          </AuthProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
