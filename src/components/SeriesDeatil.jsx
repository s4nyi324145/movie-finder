import React, { useEffect, useState} from "react";
import "../style/seriesdetail.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";
import useSeriesDetail from "../hooks/useSeriesDetail";
import Trailer from "./Trailer";
import MovieDetailCast from "./MovieDetailCast";
import RelatedShows from "./Relatedshows";


function SeriesDetail({ seriesId, onClose, favorites, setFavorites }) {

  const [hasLiked, setHasLiked] = useState(false);
  const navigate = useNavigate();
  const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

  const {seriesDetail,similarSeries,error,loading} = useSeriesDetail(seriesId)

  useEffect(() => console.log(seriesDetail), [seriesDetail])



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



  useEffect(() => {console.log(similarSeries);}, [similarSeries]);

  if (!seriesDetail) return null;


  const trailer = seriesDetail?.videos?.results?.find(v => v.type === "Trailer");
  const cast = seriesDetail?.credits?.cast?.slice(0, 10) || [];
  const related = similarSeries?.results?.slice(0, 5) || [];

  return (



    <div className="detail-overlay">

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}


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
          <Trailer trailer={trailer}/>
          <MovieDetailCast cast={cast}/>
          <RelatedShows related={related} />
          <Comments id={seriesDetail.id} title={seriesDetail.name}/>
        </div>
      </div>
    </div>
  );
}

export default SeriesDetail;
