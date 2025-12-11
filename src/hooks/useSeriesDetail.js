import { useEffect, useState } from "react";

export default function useSeriesDetail(seriesId) {

    const [seriesDetail, setSeriesDetail] = useState([]);
    const [similarSeries, setSimilarSeries] = useState([]);
    const  [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const API_KEY = "e3cf4347e1ac26d5b649a9bc8c8c7a9a";
    
    async function fetchSeriesDetails() {

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${API_KEY}&append_to_response=videos,credits`
          );
          if (!response.ok) throw new Error("Failed to fetch series details");
          const data = await response.json();
          setSeriesDetail(data);
        } catch (err) {
          setError(err.message)
        }
        finally{setLoading(false)}
    }

    async function fetchSimilarSeries() {

    

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${seriesId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
          );
          if (!response.ok) throw new Error("Failed to fetch series details");
          const data = await response.json();
          setSimilarSeries(data);
        } catch (err) {
          setError(err.message)
        }
      }

      useEffect(() =>{fetchSeriesDetails(), fetchSimilarSeries()}, [seriesId])

      return{seriesDetail,similarSeries,error,loading}

}