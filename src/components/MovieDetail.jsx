import React, { useState, useContext, useEffect } from "react";
import "../style/moviedetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";
import useMovieDetail from "../hooks/useMovieDetail";
import { FavoritesContext } from "../context/FavoritesContext";
import Trailer from "./Trailer";
import RelatedShows from "./Relatedshows";
import MovieDetailCast from "./MovieDetailCast";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";
const FALLBACK_PROFILE = "https://via.placeholder.com/150x225?text=No+Photo";

export default function MovieDetail({ movieId, onClose }) {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { movieDetail, movieRecom, loading, error } = useMovieDetail({movieId});
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (movieDetail) {
      setHasLiked(favorites.some(f => f.id === movieDetail.id));
    }
  }, [favorites, movieDetail]);

  const toggleFavorite = () => {
    if (!movieDetail) return;

    setFavorites(prev => {
      if (hasLiked) {
        return prev.filter(m => m.id !== movieDetail.id);
      } else {
        return [...prev, movieDetail];
      }
    });

    setHasLiked(prev => !prev);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movieDetail) return null;

  const trailer = movieDetail?.videos?.results?.find(v => v.type === "Trailer");
  const cast = movieDetail?.credits?.cast?.slice(0, 10) || [];
  const related = movieRecom?.results?.slice(0, 5) || [];

  return (
    <div className="detail-overlay">
      <div className="detail-content">
        <div
          className="detail-backdrop"
          style={{ backgroundImage: `url(${BACKDROP_BASE + movieDetail.backdrop_path})` }}
        />

        <button className="detail-close" onClick={onClose}>×</button>

        <div className="detail-info">
          <img
            className="detail-poster"
            src={movieDetail.poster_path ? IMAGE_BASE + movieDetail.poster_path : FALLBACK_POSTER}
            alt={movieDetail.title}
          />

          <h1>{movieDetail.title}</h1>
          {movieDetail.tagline && <h3 className="tagline">"{movieDetail.tagline}"</h3>}

          <p><strong>Genres:</strong> {movieDetail.genres.map(g => g.name).join(", ")}</p>
          <p><strong>Runtime:</strong> {movieDetail.runtime} min</p>
          <p><strong>Release date:</strong> {movieDetail.release_date}</p>
          <p><strong>Rating:</strong> <FontAwesomeIcon icon={faStar} /> {movieDetail.vote_average.toFixed(1)}</p>
          <p><strong>Director:</strong> {movieDetail.credits?.crew?.find(p => p.job === "Director")?.name || "Unknown"}</p>
          <p className="overview">{movieDetail.overview}</p>

          <div className="addFavorite">
            <button className={hasLiked ? "btn btn-white" : "btn"} onClick={toggleFavorite}>
              {hasLiked ? "Remove from Favorites" : "+ Add to Favorites"}
            </button>
          </div>

          <Trailer trailer={trailer}/>
          <MovieDetailCast cast={cast} />
          <RelatedShows related={related}/>
          <Comments id={movieId} title={movieDetail.title} />
        </div>
      </div>
    </div>
  );
}
