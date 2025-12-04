import { useContext, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import { Link, NavLink } from 'react-router-dom';

import SeriesCard from './SeriesCard.jsx';
import MovieCard from './MovieCard.jsx';
import MovieDetail from './MovieDetail.jsx';
import SeriesDetail from './SeriesDeatil.jsx';

import '../style/favoritemoviecard.css';

export default function FavoritesPage() {
  const { favorites, favoritesSeries, setFavorites, setFavoritesSeries } = useContext(FavoritesContext);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  return (
    <>
       <div className="favorites-container">
      {/* Navbar */}
      <div className="navbar">
                <nav>
                    <NavLink to="/" className='nav-link'>Movies</NavLink>
                    <NavLink to="/series" className='nav-link'>Series</NavLink>
                    <NavLink to="/favorites" className='nav-link'>Favorites</NavLink>
                </nav>
      </div>

      {/* Favorite Movies */}
      <section className="favorites-section">
        <h2>Your Favorite Movies</h2>
        <div className="favorites-scroll">
          {favorites.length === 0 ? (
            <p className="empty-text">You haven't added any favorite movies yet.</p>
          ) : (
            <MovieCard movies={favorites.reverse()} onMovieClick={setSelectedMovie} />
          )}
        </div>
      </section>

      {/* Favorite Series */}
      <section className="favorites-section">
        <h2>Your Favorite Series</h2>
        <div className="favorites-scroll">
          {favoritesSeries.length === 0 ? (
            <p className="empty-text">You haven't added any favorite series yet.</p>
          ) : (
            <SeriesCard series={favoritesSeries.reverse()} onMovieClick={setSelectedSeries} />
          )}
        </div>
      </section>

      {/* Modals */}
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} favorites={favorites} setFavorites={setFavorites} onClose={() => setSelectedMovie(null)} />
      )}
      {selectedSeries && (
        <SeriesDetail seriesId={selectedSeries} onClose={() => setSelectedSeries(null)} favorites={favoritesSeries} setFavorites={setFavoritesSeries} />
      )}
    </div>
    </>
  );
}
