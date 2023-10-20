import './App.scss'
import Camera from './components/camera/camera'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngredientsPage from './pages/ingredients-page/ingredients-page';
import Navbar from './components/navbar/navbar';
import TopBar from './components/top-bar/top-bar';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import defaultTheme from "./themes/deafultTheme";
import { useState } from 'react';
import { IngredientsProvider } from './contexts/ingredients/ingredients.context';
import RecipesPage from './pages/recipes-page/recipes-page';
import { RecipesProvider } from './contexts/recipes/recipes.context';
import RecipePage from './pages/recipe-page/recipe-page';

function App() {
  const [pageTitle, setPageTitle] = useState("SnapCook");

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", width: "100vw", minHeight: "100vh", background: "url('./public/background.png')" }}>
          <TopBar title={pageTitle}></TopBar>
          <IngredientsProvider>
            <RecipesProvider>
              <BrowserRouter>
                <Box sx={{ display: "flex", flexGrow: "1", justifyContent: "center", pb: 10 }}>
                  <Routes>
                    <Route path='ingredients' element={<IngredientsPage setPageTitle={setPageTitle} />}></Route>
                    <Route path='/' element={<Camera setPageTitle={setPageTitle} />}></Route>
                    <Route path='recipes' element={<RecipesPage />}></Route>
                    <Route path='recipe/:id' element={<RecipePage />}></Route>
                  </Routes>
                </Box>
                <Navbar></Navbar>
              </BrowserRouter>
            </RecipesProvider>
          </IngredientsProvider>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
