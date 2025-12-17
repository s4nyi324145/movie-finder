import Hero from './Hero.jsx'
import SeriesDeatil from './SeriesDeatil.jsx'
import SeriesCard from './SeriesCard.jsx'
import { useState,useEffect } from 'react'
import useSeries from '../hooks/useSeries.js';
import Pagination from './Pagination.jsx'


export default function SeriesPage() {
    
 
 const [searchTerm, setSearchTerm] = useState('')
 const [selectedSeries, setSelectedSeries] = useState(null)
 const [page, setPage] = useState(1);
  
  const {series,loading,error} = useSeries(searchTerm,page)
  

  function nextPage() {
    setPage(p => p + 1);
  }
  
  function prevPage() {
    if (page > 1) setPage(p => p - 1);
  }
  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);


  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

    return(<>
            <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <SeriesCard series={series} onMovieClick={setSelectedSeries}/>
            <Pagination page={page} onNext={nextPage} onPrev={prevPage} />
            {selectedSeries && 
                    <SeriesDeatil seriesId={selectedSeries} onClose={() => setSelectedSeries(null)}/>


            }
    </>)
}