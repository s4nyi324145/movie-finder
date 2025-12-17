import React, { useState, useContext, useEffect } from "react";
import "../style/moviedetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";
import useMovieDetail from "../hooks/useMovieDetail";

import Trailer from "./Trailer";
import RelatedShows from "./Relatedshows";
import MovieDetailCast from "./MovieDetailCast";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";
const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";


export default function MovieDetail({ movieId, onClose }) {
  const { movieDetail, movieRecom, loading, error } = useMovieDetail({movieId});
  const [watchlistItem, setWatchListItem] = useState()
  const token = localStorage.getItem("token");

  async function loadWatchlist() {
      

      const res = await fetch(`http://localhost:5500/watchlist/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        setWatchListItem(data); 
      }

  }

  async function toggleWatchlist() {
    if(!watchlistItem){
        const res = await fetch(`http://localhost:5500/watchlist/movie`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ movie_id: movieId, type: "movie" })
        });
        if (res.ok) {
          setWatchListItem(movieId); 
        } else {
          console.error("Failed to add movie to watchlist");
        }
    }else {
      
      const res = await fetch(`http://localhost:5500/watchlist/movie/${movieId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
  
      if (res.ok) setWatchListItem(null);
    }
  }
  useEffect(() => {loadWatchlist()}, [movieId])
  useEffect(() => {console.log(watchlistItem)}, [watchlistItem])
  
  
  

  

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
            <button className={watchlistItem ? "btn btn-white" : "btn" } onClick={toggleWatchlist}>
              {watchlistItem ? "Remove from Watchlist" : "+ Add to Watchlist"}
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
