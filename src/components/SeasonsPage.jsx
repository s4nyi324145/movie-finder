import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../style/seasons.css'



const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";





function SeasonsPage() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [episodeLoading, setEpisodeLoading] = useState(true)
  const [imdbId, setImdbId] = useState(null)


  async function getExternalIds() {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch external IDs");
    const data = await response.json();
    setImdbId(data.imdb_id)
  }

  async function fetchSeries() {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
    );
    const data = await res.json();
    setSeries(data);

  
    const allEpisodes = [];

    for (let season of data.seasons) {
      if (season.season_number === 0) continue; 

      const eps = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${API_KEY}`
      );
      const epsData = await eps.json();
      console.log(epsData)


      allEpisodes.push({
        season: season.season_number,
        episodes: epsData.episodes,
     
      });
    }
    console.log(allEpisodes)
    setEpisodes(allEpisodes);
    setEpisodeLoading(false)
  }

  useEffect(() => {
    fetchSeries();
    getExternalIds();
  }, [id]);

  useEffect(() => {console.log(series)}, [series])

  if (!series) return <p>Loading...</p>;

  return (
    <div className="seasons-page">
      <h1>{series.name} – Seasons & Episodes</h1>

      <div className="seasons">
        <div className="wrapper">
          <div className="seasons-overview">
          <img className="poster" src={IMAGE_BASE + (series.poster_path || "")} alt={series.name} />

          <div className="overview-info">
            <div className="air-date">
              <p className="air-datedate">
                {series.first_air_date.split("-")[0]} –{" "}
                {series.in_production ? "Now" : series.last_air_date.split("-")[0]}
                
              </p>
              <span className="dot"> • </span>
              <p className={`status-badge ${
                  series.status === "Ended" 
                  ? "ended" 
                  : series.status === "Returning Series" 
                  ? "returning-series" 
                  : series.status === "Canceled" 
                  ? "canceled" 
                  : series.status === "Planned" 
                  ? "planned" 
                  : series.status === "In Production" 
                  ? "in-production" 
                  : series.status === "Pilot" 
                  ? "pilot" 
                  : "unknown"
                  }`}>
                  {series.status}
              </p>
            </div>

            <p className="rating">
              <FontAwesomeIcon icon={faStar} /> {series.vote_average.toFixed(1)}
              <span className="vote-count"> ({series.vote_count})</span>
            </p>

          <p className="genres">
            {series.genres?.map(g => g.name).join(" • ")}
          </p>

          <p className="runtime">
            {series.episode_run_time?.[0] ? series.episode_run_time[0] : "?"} min / episode
          </p>

          <p className="season-ep-count">
            {series.number_of_seasons} Seasons • {series.number_of_episodes} Episodes
          </p>

          <div className="networks">
          {series.networks?.map(n => (
            n.logo_path && (
              <img
                key={n.id}
                className="network-logo"
                src={IMAGE_BASE + n.logo_path}
                alt={n.name}
              />
            )
          ))}
        </div>
      

        </div>
          </div>
        <div className="votesColor">
          <p>Awesome <span className="Awesome circle"></span></p>
          <p>Great <span className="Great circle"></span></p>
          <p>Good <span className="Good circle"></span></p>
          <p>Regular <span className="Regular circle"></span></p>
          <p>Bad <span className="Bad circle"></span></p>
          <p>Terrible <span className="Terrible circle"></span></p>
        </div>
        </div>

        
        <div className="seasons-details">
            {episodeLoading ? <div><p>Episode loading....</p></div> : episodes.map(season => (
            <div key={season.season} className="season-block">
              <h2>S{season.season}</h2>

              <div className="episode-list">
                {season.episodes.map(ep => (
                
                    <div key={ep.id}  onClick={() => window.open(`https://www.imdb.com/title/${imdbId}/`, "_blank")}  data-ep-name={`${ep.name}\nSeason: ${ep.season_number}  Episode: ${ep.episode_number}`} className={`episode-card ${ep.vote_average >= 9 ? 'Awesome' : ep.vote_average >= 8 ? 'Great' : ep.vote_average >= 7 ? 'Good' :  ep.vote_average >= 5 ? 'Regular' : ep.vote_average >= 4 ? 'Bad'  : ep.vote_average == 0 ? 'Unknown' : 'Terrible'}`}>
                  
                    <p>{ep.vote_average.toFixed(1) > 0 ? ep.vote_average.toFixed(1) : '?'}</p>
                    
                  </div>
              
                ))}
              </div>

            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
}

export default SeasonsPage;
