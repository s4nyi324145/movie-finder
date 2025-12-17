import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import "../style/moviecard.css";
import errorImg from '../assets/404-error.png';

export default function MovieCard({ movies, onMovieClick, mode }) {

  return (
    <>
      {movies.length > 0 ? (
        <div className="movie-cards">
          {movies.map(movie => (
            <div
              className={`movie-card ${mode === "watchlist" ? "watchlist-card" : ""}`}
              key={movie.id}
              onClick={() => mode === "browse" && onMovieClick(movie.id)}
            >

              <div className="card-img">
                <img
                  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"}
                  alt={movie.title}
                />

                
              </div>

              
              <div className="overlay">{movie.overview}</div>
             

              <div className="card-content">
                <h3>{movie.title}</h3>
                <div className="card-info">
                  <span className="rating">
                    <FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(1)}
                  </span>

                  {mode === "watchlist" && (
                    <span className="status planned">Planned</span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className='error-img'>
          <img src={errorImg} alt="Not found" />
          <p>Movie not found</p>
        </div>
      )}
    </>
  );
}
