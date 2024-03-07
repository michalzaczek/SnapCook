import { Box, LinearProgress } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import ScrollToTop from '../scroll-to-top';
import TopBar from '../top-bar/top-bar';
import { RecipeInfoProvider } from '../../contexts/recipe-info/recipe-info-context';
import { RecipesProvider } from '../../contexts/recipes/recipes.context';
import AppRoutes from '../app-routes/app-routes';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';
import MessageSnackbar from '../message-snackbar/message-snackbar';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useLoadingScreen } from '../../contexts/loading-screen/loading-screen-context';
import { UIStateProvider } from '../../contexts/ui-state/ui-state.context';

export default function AppContent() {
  const { state } = useAuth();
  const { open, message, severity, setOpen } = useUIMessage();
  const { isLoading } = useLoadingScreen();

  if (isLoading) {
    return null;
  }

  return (
    <UIStateProvider>
      <RecipesProvider>
        <RecipeInfoProvider>
          <BrowserRouter>
            <ScrollToTop />
            <TopBar />
            {state.loading && <LinearProgress />}
            <Box
              sx={{
                display: 'flex',
                flexGrow: '1',
                justifyContent: 'center',
                pb: { xs: '100px', md: 0 },
              }}
            >
              <AppRoutes />
            </Box>
            <Navbar />
            <MessageSnackbar
              severity={severity}
              open={open}
              message={message}
              handleClose={() => setOpen(false)}
            />
          </BrowserRouter>
        </RecipeInfoProvider>
      </RecipesProvider>
    </UIStateProvider>
  );
}
