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

    // Fetch all seasons
    const allEpisodes = [];

    for (let season of data.seasons) {
      if (season.season_number === 0) continue;

      const eps = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${API_KEY}`
      );
      const epsData = await eps.json();

      allEpisodes.push({
        season: season.season_number,
        episodes: epsData.episodes
      });
    }

    setEpisodes(allEpisodes);
  }

  useEffect(() => {
    fetchSeries();
  }, [id]);

  if (!series) return <p>Loading...</p>;

  return (
    <div className="seasons-page">
      <h1>{series.name} – Seasons & Episodes</h1>

      {episodes.map(season => (
        <div key={season.season} className="season-block">
          <h2>Season {season.season}</h2>

          <div className="episode-list">
            {season.episodes.map(ep => (
              <div key={ep.id} className="episode-card">
                <h3>{ep.episode_number}. {ep.name}</h3>
                <p><strong>Rating:</strong> {ep.vote_average.toFixed(1)}</p>
                <p>{ep.overview}</p>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}

export default SeasonsPage;
