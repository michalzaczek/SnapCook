import { CircularProgress, Box, LinearProgress } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import ScrollToTop from '../scroll-to-top';
import TopBar from '../top-bar/top-bar';
import { IngredientsProvider } from '../../contexts/ingredients/ingredients.context';
import { RecipeInfoProvider } from '../../contexts/recipe-info/recipe-info-context';
import { RecipesProvider } from '../../contexts/recipes/recipes.context';
import { useAuth } from '../../contexts/auth/auth-context';
import AppRoutes from '../app-routes/app-routes';

export default function AppContent() {
  const { isLoading } = useAuth();

  return (
    <IngredientsProvider>
      <RecipesProvider>
        <RecipeInfoProvider>
          <BrowserRouter>
            <ScrollToTop />
            <TopBar />
            {isLoading && <LinearProgress />}
            <Box
              sx={{
                display: 'flex',
                flexGrow: '1',
                justifyContent: 'center',
                alignItems: 'center',
                pb: { xs: 10, md: 0 },
                background: "url('./public/background.png')",
              }}
            >
              {!isLoading && <AppRoutes />}
            </Box>
            <Navbar />
          </BrowserRouter>
        </RecipeInfoProvider>
      </RecipesProvider>
    </IngredientsProvider>
  );
}
