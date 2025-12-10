
import { FavoritesProvider } from "./context/FavoritesContext";
import MoviesPage from './components/MoviesPage.jsx'
import SeriesPage from './components/SeriesPage.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FavoritesPage from './components/FavoritesPage.jsx'
import Login from './components/Login.jsx'
import SeasonsPage from "./components/SeasonsPage";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import './App.css'

function App() {

  
  

  
  return (
    <>
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/series/:id/seasons" element={<SeasonsPage />} />
          <Route path='/login' element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
    </>
  )
}

export default App
