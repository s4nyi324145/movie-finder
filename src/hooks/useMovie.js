import { useState, useEffect } from "react";

export default function useMovie(searchTerm, page) {
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";

    async function fetchMovies() {




        try {
            const url = searchTerm.trim()
                ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
                : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch movies");

            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        }
    useEffect(() => {
        fetchMovies();
    }, [searchTerm,page]);

    return { movies, loading, error};

}
    
    