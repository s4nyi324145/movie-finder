import { useState , useEffect, useContext} from 'react'
import { FavoritesContext } from "../context/FavoritesContext";
import Hero from './Hero.jsx'
import MovieDetail from './MovieDetail.jsx'
import MovieCard from './MovieCard.jsx'
import useMovie from '../hooks/useMovie.js';
import Pagination from './Pagination.jsx';
import '../style/moviecard.css'

export default function MoviesPage() {


   
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const { favorites, favoritesSeries, setFavorites, setFavoritesSeries } = useContext(FavoritesContext);
    const [selectedMovie, setSelectedMovie] = useState(null)
 
    const { movies, loading, error } = useMovie(searchTerm, page);

 
    function nextPage() {
      setPage(p => p + 1);
    }
    
    function prevPage() {
      if (page > 1) setPage(p => p - 1);
    }

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);


    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
      <>
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {loading && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p>}
       
        <MovieCard movies={movies} onMovieClick={setSelectedMovie} />
        <Pagination page={page} onNext={nextPage} onPrev={prevPage} />
        {selectedMovie && (
          <MovieDetail 
            movieId={selectedMovie} 
            favorites={favorites} 
            setFavorites={setFavorites} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </>
    );
  }
  
