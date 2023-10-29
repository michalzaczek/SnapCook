import './App.scss';
import MainPage from './pages/main-page/main-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngredientsPage from './pages/ingredients-page/ingredients-page';
import Navbar from './components/navbar/navbar';
import TopBar from './components/top-bar/top-bar';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import defaultTheme from './themes/defaultTheme';
import { IngredientsProvider } from './contexts/ingredients/ingredients.context';
import RecipesPage from './pages/recipes-page/recipes-page';
import { RecipesProvider } from './contexts/recipes/recipes.context';
import RecipePage from './pages/recipe-page/recipe-page';
import AccountPage from './pages/account-page/account-page';
import { RecipeInfoProvider } from './contexts/recipe-info/recipe-info-context';
import SettingsPage from './pages/settings-page/settings-page';
import LoginPage from './pages/login-page/login-page';
import SubscriptionPage from './pages/subscription-page/subscription-page';
import ScrollToTop from './components/scroll-to-top';
import { AuthProvider } from './contexts/auth/auth-context';

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
            <IngredientsProvider>
              <RecipesProvider>
                <RecipeInfoProvider>
                  <BrowserRouter>
                    <ScrollToTop />
                    <TopBar title={''}></TopBar>
                    <Box
                      sx={{
                        display: 'flex',
                        flexGrow: '1',
                        justifyContent: 'center',
                        pb: { xs: 10, md: 0 },
                        background: "url('./public/background.png')",
                      }}
                    >
                      <Routes>
                        <Route
                          path='ingredients'
                          element={<IngredientsPage />}
                        ></Route>
                        <Route path='/' element={<MainPage />}></Route>
                        <Route path='recipes' element={<RecipesPage />}></Route>
                        <Route
                          path='recipe/:id'
                          element={<RecipePage />}
                        ></Route>
                        <Route path='account' element={<AccountPage />}></Route>
                        <Route
                          path='account/settings'
                          element={<SettingsPage />}
                        ></Route>
                        <Route path='login' element={<LoginPage />}></Route>
                        <Route
                          path='subscription'
                          element={<SubscriptionPage />}
                        ></Route>
                      </Routes>
                    </Box>
                    <Navbar></Navbar>
                  </BrowserRouter>
                </RecipeInfoProvider>
              </RecipesProvider>
            </IngredientsProvider>
          </AuthProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
