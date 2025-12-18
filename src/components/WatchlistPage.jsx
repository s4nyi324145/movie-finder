import Hero from './Hero.jsx';
import '../style/watchlist.css';
import { useEffect, useState } from 'react';
import WatchlistCard from './WatchlistCard.jsx';

export default function WatchlistPage() {
  const token = localStorage.getItem("token");
  const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";
 

  const [movieIds, setMovieIds] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);


async function fetchMovieIds() {
    try {
      const res = await fetch("http://localhost:5500/watchlist/movie", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMovieIds(data);
    } catch (error) {
      console.error(error);
    }
  }


  async function fetchMovieById(movieId, type) {

    let url = ""

    if(type == "movie") {
     url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    }
    else{
      url = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch movie");
    const data = await res.json()
    console.log(data)
    return  data;
  }

  
  async function removeFromWatchlist(movieId) {
    try {
      const res = await fetch(`http://localhost:5500/watchlist/movie/${movieId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        setMovies(prev => prev.filter(m => m.id !== movieId));
      } else {
        console.error("Failed to remove movie from watchlist");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchMovies() {
    setLoading(true);
    try {
      const moviesData = await Promise.all(
        movieIds.map(item =>
          fetchMovieById(item.movie_id, item.type)
        )
      );
   
      setMovies( moviesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

 
  useEffect(() => {
    fetchMovieIds();
  }, []);

  useEffect(() => {
    console.log(movieIds);
  }, [movieIds]);

 
  

  useEffect(() => {
    if (movieIds.length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }
    fetchMovies();
  }, [movieIds]);

  useEffect(() => {
    console.log("asd")
    console.log(movies[0]);
  }, [movies]);

  return (
    <>
      <Hero />

      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <div className="watchlist-grid">
          {movies.map((movie,index) => (
            <WatchlistCard
              key={movie.id}
              movieStatus={movieIds[index].status}
              movie={movie}
              onRemove={removeFromWatchlist}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">Your watchlist is empty</p>
      )}
    </>
  );
}
