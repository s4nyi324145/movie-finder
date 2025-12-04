import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../style/seasons.css'



const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";

function SeasonsPage() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);

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
  }

  useEffect(() => {
    fetchSeries();
  }, [id]);

  if (!series) return <p>Loading...</p>;

  return (
    <div className="seasons-page">
      <h1>{series.name} – Seasons & Episodes</h1>

      <div className="seasons">
        {episodes.map(season => (
        <div key={season.season} className="season-block">
          <h2>Season {season.season}</h2>

          <div className="episode-list">
            {season.episodes.map(ep => (
            
                <div key={ep.id}  data-ep-name={`${ep.name}\nSeason: ${ep.season_number}  Episode: ${ep.episode_number}`} className={`episode-card ${ep.vote_average >= 9 ? 'Awesome' : ep.vote_average >= 8 ? 'Great' : ep.vote_average >= 7 ? 'Good' :  ep.vote_average >= 6 ? 'Regular' : ep.vote_average >= 4 ? 'Bad' : ep.vote_average >= 6 ? 'Regular' : ep.vote_average >= 0 ? 'Unknown' : 'Terrible'}`}>
               
                <p>{ep.vote_average.toFixed(1) > 0 ? ep.vote_average.toFixed(1) : '?'}</p>
                
              </div>
          
            ))}
          </div>

        </div>
      ))}
      </div>
    </div>
  );
}

export default SeasonsPage;
