export default function Trailer({trailer}) {
    
    return(<>
    
        {trailer ? (
                <div className="trailer">
                <h2>Trailer</h2>
                <iframe
                    width="100%"
                    height="350"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    allowFullScreen
                    title="Trailer"
                ></iframe>
                </div>
            ) : (
                <p>Trailer not found</p>
        )}
    
    </>)
}