import { useState, useEffect } from 'react'

import { FavoritesProvider } from "./context/FavoritesContext";
import MoviesPage from './components/MoviesPage.jsx'
import SeriesPage from './components/SeriesPage.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FavoritesPage from './components/FavoritesPage.jsx'
import SeasonsPage from "./components/SeasonsPage";
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
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
    </>
  )
}

export default App
