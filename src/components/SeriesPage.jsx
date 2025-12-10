import Hero from './Hero.jsx'
import SeriesDeatil from './SeriesDeatil.jsx'
import SeriesCard from './SeriesCard.jsx'
import { useState,useEffect, useContext } from 'react'
import { FavoritesContext } from "../context/FavoritesContext";
import { Link, NavLink } from 'react-router-dom'


export default function SeriesPage() {
    
 const [series,setSeries] = useState([])
 const [searchTerm, setsearchTerm] = useState('')
 const [selectedSeries, setSelectedSeries] = useState(null)
 const { favorites, favoritesSeries, setFavorites, setFavoritesSeries } = useContext(FavoritesContext);
  const [page, setPage] = useState(1);
  
  

  async function fetchSeries() {
    const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";
    const url = searchTerm.trim() 
      ? `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchTerm}` 
      : `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    setSeries(data.results);
  }
  
  function nextPage() {
    setPage(p => p + 1);
  }
  
  function prevPage() {
    if (page > 1) setPage(p => p - 1);
  }





  useEffect(() => {
    fetchSeries();
  }, [searchTerm, page]);
  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);



    return(<>
            <Hero searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>

            <SeriesCard series={series} onMovieClick={setSelectedSeries}/>
            {selectedSeries && 
                    <SeriesDeatil seriesId={selectedSeries} onClose={() => setSelectedSeries(null)} favorites={favoritesSeries} setFavorites={setFavoritesSeries}/>


            }
    </>)
}