import React, { useEffect, useState} from "react";
import "../style/seriesdetail.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function SeriesDetail({ seriesId, onClose, favorites, setFavorites }) {
  const [seriesDetail, setSeriesDetail] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const navigate = useNavigate();
  const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

  async function fetchSeriesDetails() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${API_KEY}&append_to_response=videos,credits`
      );
      const data = await response.json();
      setSeriesDetail(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  // Kedvencek frissítése
  useEffect(() => {
    if (seriesDetail) {
      setHasLiked(favorites.some(f => f.id === seriesDetail.id));
    }
  }, [favorites, seriesDetail]);

  function handleClick() {
    if (!seriesDetail) return;

    setFavorites(prev => {
      if (hasLiked) {
        return prev.filter(item => item.id !== seriesDetail.id);
      } else {
        if (!prev.some(item => item.id === seriesDetail.id)) {
          return [...prev, seriesDetail];
        }
        return prev;
      }
    });

    setHasLiked(prev => !prev);
  }

  useEffect(() => {
    fetchSeriesDetails();
  }, [seriesId]);

  if (!seriesDetail) return null;

  return (
    <div className="detail-overlay">
      <div className="detail-content">
        <div
          className="detail-backdrop"
          style={{
            backgroundImage: `url(${BACKDROP_BASE + (seriesDetail.backdrop_path || "")})`,
          }}
        />

        <button className="detail-close" onClick={onClose}>
          ×
        </button>

        <div className="detail-info">
          <img
            className="detail-poster"
            src={IMAGE_BASE + (seriesDetail.poster_path || "")}
            alt={seriesDetail.name}
          />

          <h1>{seriesDetail.name}</h1>

          {seriesDetail.tagline && (
            <h3 className="tagline">"{seriesDetail.tagline}"</h3>
          )}

          <p>
            <strong>Genres:</strong>{" "}
            {seriesDetail.genres?.map(g => g.name).join(", ") || "Unknown"}
          </p>

          <p>
            <strong>Episode Runtime:</strong>{" "}
            {seriesDetail.episode_run_time?.length > 0
              ? seriesDetail.episode_run_time[0] + " min"
              : "Unknown"}
          </p>

          <p>
            <strong>First Air Date:</strong>{" "}
            {seriesDetail.first_air_date || "Unknown"}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            <FontAwesomeIcon icon={faStar} />{" "}
            {seriesDetail.vote_average?.toFixed(1) || "0.0"}
          </p>

          <p>
            <strong>Creator(s):</strong>{" "}
            {seriesDetail.created_by?.length > 0
              ? seriesDetail.created_by.map(c => c.name).join(", ")
              : "Unknown"}
          </p>

          <p className="overview">{seriesDetail.overview}</p>

          <div className="buttons">
            <div className="seriesGraph">
                <button className="btn" onClick={() => navigate(`/series/${seriesId}/seasons`)}>Seasons details</button>
            </div>
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
          </div>

  
          {seriesDetail.videos?.results?.find(v => v.type === "Trailer") ? (
            <div className="trailer">
              <h2>Trailer</h2>
              <iframe
                width="100%"
                height="350"
                src={`https://www.youtube.com/embed/${
                  seriesDetail.videos.results.find(
                    v => v.type === "Trailer"
                  ).key
                }`}
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>Trailer not found</p>
          )}

   
          <h2>Cast</h2>
          <div className="cast-list">
            {seriesDetail.credits?.cast
              ?.slice(0, 10)
              .map(actor => (
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

export default SeriesDetail;
