import './App.scss';
import Camera from './components/camera/camera';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngredientsPage from './pages/ingredients-page/ingredients-page';
import Navbar from './components/navbar/navbar';
import TopBar from './components/top-bar/top-bar';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import defaultTheme from './themes/deafultTheme';
import { useState } from 'react';
import { IngredientsProvider } from './contexts/ingredients/ingredients.context';
import RecipesPage from './pages/recipes-page/recipes-page';
import { RecipesProvider } from './contexts/recipes/recipes.context';
import RecipePage from './pages/recipe-page/recipe-page';
import AccountPage from './pages/account-page/account-page';
import { RecipeInfoProvider } from './contexts/recipe-info/recipe-info-context';

function App() {
  const [pageTitle, setPageTitle] = useState('SnapCook');

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
          <IngredientsProvider>
            <RecipesProvider>
              <RecipeInfoProvider>
                <BrowserRouter>
                  <Box
                    sx={{
                      display: 'flex',
                      flexGrow: '1',
                      justifyContent: 'center',
                      pb: 10,
                      background: "url('./public/background.png')",
                    }}
                  >
                    <Routes>
                      <Route
                        path='ingredients'
                        element={
                          <IngredientsPage setPageTitle={setPageTitle} />
                        }
                      ></Route>
                      <Route
                        path='/'
                        element={<Camera setPageTitle={setPageTitle} />}
                      ></Route>
                      <Route path='recipes' element={<RecipesPage />}></Route>
                      <Route path='recipe/:id' element={<RecipePage />}></Route>
                      <Route path='account' element={<AccountPage />}></Route>
                    </Routes>
                  </Box>
                  <Navbar></Navbar>
                </BrowserRouter>
              </RecipeInfoProvider>
            </RecipesProvider>
          </IngredientsProvider>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
