import { useState , useEffect, useContext} from 'react'
import { FavoritesContext } from "../context/FavoritesContext";
import Hero from './Hero.jsx'
import MovieDetail from './MovieDetail.jsx'
import MovieCard from './MovieCard.jsx'
import { Link , NavLink} from 'react-router-dom'
import '../style/moviecard.css'

export default function MoviesPage() {


    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const { favorites, favoritesSeries, setFavorites, setFavoritesSeries } = useContext(FavoritesContext);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";

    async function fetchMovies() {
      
      const url = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    }

    function nextPage() {
      setPage(p => p + 1);
    }
    
    function prevPage() {
      if (page > 1) setPage(p => p - 1);
    }

    useEffect(() => {
      fetchMovies();
    }, [searchTerm, page]);

    return (
      <>
        <Hero searchTerm={searchTerm} setsearchTerm={setSearchTerm} />
        <div className="navbar">
          <nav>
            <NavLink to="/" className='nav-link'>Movies</NavLink>
            <NavLink to="/series" className='nav-link'>Series</NavLink>
            <NavLink to="/favorites" className='nav-link'>Favorites</NavLink>
          </nav>
        </div>
        <MovieCard movies={movies} onMovieClick={setSelectedMovie} />
        <div className="pagination">
          <button className='btn-page' onClick={prevPage} disabled={page === 1}>Prev</button>
          <p className='page-number'>{page}</p>
          <button className='btn-page' onClick={nextPage}>Next</button>
        </div>
        {selectedMovie && (
          <MovieDetail 
            movie={selectedMovie} 
            favorites={favorites} 
            setFavorites={setFavorites} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </>
    );
  }
  
