import './App.scss'
import Camera from './components/camera/camera'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngredientsPage from './pages/ingredients/ingredients';
import Navbar from './components/navbar/navbar';
import TopBar from './components/top-bar/top-bar';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import defaultTheme from "./themes/deafultTheme";
import { useEffect, useState } from 'react';

function App() {
  const [pageTitle, setPageTitle] = useState("SnapCook");

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container sx={{ display: "flex", flexDirection: "column", width: "100vw", minHeight: "100vh", background: "url('./public/background.png')" }}>
          <TopBar title={pageTitle}></TopBar>
          <BrowserRouter>
            <Box sx={{ display: "flex", flexGrow: "1", justifyContent: "center", pb: 10 }}>
              <Routes>
                <Route path='ingredients' element={<IngredientsPage setPageTitle={setPageTitle} />}></Route>
                <Route path='/' element={<Camera setPageTitle={setPageTitle} />}></Route>
              </Routes>
            </Box>
            <Navbar></Navbar>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
