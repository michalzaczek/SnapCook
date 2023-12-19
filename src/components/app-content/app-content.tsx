import { Box, LinearProgress } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import ScrollToTop from '../scroll-to-top';
import TopBar from '../top-bar/top-bar';
import { IngredientsProvider } from '../../contexts/ingredients/ingredients.context';
import { RecipeInfoProvider } from '../../contexts/recipe-info/recipe-info-context';
import { RecipesProvider } from '../../contexts/recipes/recipes.context';
import AppRoutes from '../app-routes/app-routes';
import { useUIMessage } from '../../contexts/ui-message/ui-message.context';
import MessageSnackbar from '../message-snackbar/message-snackbar';
import { useAuth } from '../../contexts/auth/AuthContext';

export default function AppContent() {
  const { state } = useAuth();
  const { open, message, severity, setOpen } = useUIMessage();

  return (
    <IngredientsProvider>
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
                pb: { xs: 10, md: 0 },
              }}
            >
              {!state.loading && <AppRoutes />}
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
    </IngredientsProvider>
  );
}
