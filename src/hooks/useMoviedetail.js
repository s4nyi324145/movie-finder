import { useState, useEffect } from 'react';

export default function useMovieDetail({movieId}) {

    const [movieDetail, setMovieDetail] = useState(null);
    const [movieRecom, setMovieRecom] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";

    async function fetchMovieDetails() {
    try {
 
        const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovieDetail(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    }

    async function fetchMovieRecom() {
    try {
        const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
        );
        if (!response.ok) throw new Error("Failed to fetch recommendations");
        const data = await response.json();
        setMovieRecom(data);
    } catch (err) {
        setError(err.message);
    }
    }


    useEffect(() => {
    fetchMovieDetails();
    fetchMovieRecom();
    }, [movieId]);

    return { movieDetail, movieRecom, loading, error };
}
