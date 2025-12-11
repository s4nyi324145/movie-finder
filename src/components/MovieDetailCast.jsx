export default function MovieDetailCast({cast}) {

    const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
    const FALLBACK_PROFILE = "https://via.placeholder.com/150x225?text=No+Photo";
    
    return(<>

        <h2>Cast</h2>
          <div className="cast-list">
            {cast.map(actor => (
              <div key={actor.id} className="cast-card">
                <img
                  src={actor.profile_path ? IMAGE_BASE + actor.profile_path : FALLBACK_PROFILE}
                  alt={actor.name}
                />
                <p className="actor-name">{actor.name}</p>
                <p className="actor-role">{actor.character}</p>
              </div>
            ))}
          </div>
    
    </>)
}