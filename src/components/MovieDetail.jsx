import React, { useEffect, useState } from "react";
import "../style/moviedetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MovieDetail({ movie, onClose, favorites, setFavorites }) {
  const [movieDetail, setMovieDetail] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);

  const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";


  async function fetchMovieDetails() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}&append_to_response=videos,credits`
    );
    const data = await response.json();
    setMovieDetail(data);
  }

  useEffect(() => {
    if (movieDetail) {
      setHasLiked(favorites.some(f => f.id === movieDetail.id));
    }
  }, [favorites, movieDetail]);


  function handleClick() {
    if (!movieDetail) return;

    setFavorites(f => {
      if (hasLiked) {
 
        return f.filter(m => m.id !== movieDetail.id);
      } else {
     
        if (!f.find(m => m.id === movieDetail.id)) {
          return [...f, movieDetail];
        }
        return f;
      }
    });

    setHasLiked(prev => !prev);
  }

  useEffect(() => {
    fetchMovieDetails();
  }, [movie]);

  if (!movieDetail) return null;

  return (
    <div className="detail-overlay">
      <div className="detail-content">
        <div
          className="detail-backdrop"
          style={{
            backgroundImage: `url(${BACKDROP_BASE + movieDetail.backdrop_path})`,
          }}
        />

        <button className="detail-close" onClick={onClose}>
          ×
        </button>

        <div className="detail-info">
          <img
            className="detail-poster"
            src={IMAGE_BASE + movieDetail.poster_path}
            alt={movieDetail.title}
          />

          <h1>{movieDetail.title}</h1>

          {movieDetail.tagline && (
            <h3 className="tagline">"{movieDetail.tagline}"</h3>
          )}

          <p>
            <strong>Genres:</strong>{" "}
            {movieDetail.genres.map(g => g.name).join(", ")}
          </p>

          <p>
            <strong>Runtime:</strong> {movieDetail.runtime} min
          </p>

          <p>
            <strong>Release date:</strong> {movieDetail.release_date}
          </p>

          <p>
            <strong>Rating:</strong> <FontAwesomeIcon icon={faStar} />{" "}
            {movieDetail.vote_average.toFixed(1)}
          </p>

          <p>
            <strong>Director: </strong>
            {movieDetail.credits.crew.find(p => p.job === "Director")?.name ||
              "Unknown"}
          </p>

          <p className="overview">{movieDetail.overview}</p>

  
          <div className="addFavorite">
            {hasLiked ? (
              <button className="btn btn-white" onClick={handleClick}>
                Remove from your Favorites
              </button>
            ) : (
              <button className="btn" onClick={handleClick}>
                + Add to your Favorites
              </button>
            )}
          </div>

     
          {movieDetail.videos.results.find(v => v.type === "Trailer") ? (
            <div className="trailer">
              <h2>Trailer</h2>
              <iframe
                width="100%"
                height="350"
                src={`https://www.youtube.com/embed/${
                  movieDetail.videos.results.find(v => v.type === "Trailer").key
                }`}
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>Trailer not found</p>
          )}

  
          <h2>Cast</h2>
          <div className="cast-list">
            {movieDetail.credits.cast.slice(0, 10).map(actor => (
              <div key={actor.id} className="cast-card">
                <img
                  src={
                    actor.profile_path
                      ? IMAGE_BASE + actor.profile_path
                      : "No photo found"
                  }
                  alt={actor.name}
                />
                <p className="actor-name">{actor.name}</p>
                <p className="actor-role">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
