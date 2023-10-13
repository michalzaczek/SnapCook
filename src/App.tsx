import './App.scss'
import Camera from './components/camera/camera'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngredientsPage from './pages/ingredients/ingredients';
import Navbar from './components/navbar/navbar';
import TopBar from './components/top-bar/top-bar';

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar></TopBar>
        <Routes>
          <Route path='ingredients' element={<IngredientsPage/>}></Route>
          <Route path='/' element={<Camera/>}></Route>
        </Routes>
        <Navbar></Navbar>
      </BrowserRouter>
    </>
  )
}

export default App
