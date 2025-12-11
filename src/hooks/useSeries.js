import { useState, useEffect } from "react";

export default function useSeries(searchTerm,page) {
    
    const [series,setSeries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";

    async function fetchSeries() {



        try {
            
            
            const url = searchTerm.trim() 
            ? `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchTerm}` 
            : `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
            const response = await fetch(url);
            if(!response.ok) throw new Error("Something went wrong")
            const data = await response.json();
            setSeries(data.results);
            
        } catch (error) {
            setError(error.message)
        }
        finally{ setLoading(false)}
    }

    useEffect(() => {fetchSeries()}, [searchTerm,page])

    return{series,error,loading}
}