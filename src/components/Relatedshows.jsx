export default function RelatedShows({related}) {


    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
    const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";
    

    return(<>
        <h2>Related Shows</h2>
          <div className="related-list">
            {related.length > 0 ? related.map(show => (
              <div key={show.id} className="related-card">
                <div className="card-img">
                  <img src={show.poster_path ? IMAGE_BASE + show.poster_path : FALLBACK_POSTER} alt={show.title} />
                </div>
              </div>
            )) : <p>No related shows found.</p>}
          </div>
        
    </>)
}