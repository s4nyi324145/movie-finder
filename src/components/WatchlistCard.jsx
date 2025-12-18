import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function WatchlistCard({ movie, onRemove,movieStatus }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

    const [selectActive, setSelectActive] = useState(false)
    const [newStatus, setNewStatus] = useState(movieStatus)
    const token = localStorage.getItem("token")


    async function handleChange(e) {
        const status = e.target.value;
        setNewStatus(status);
        setSelectActive(false);
        if (newStatus === status) return;
      
        try {
          const res = await fetch(`http://localhost:5500/watchlist/movie/${movie.id}`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: status })
          });
      
          if (!res.ok) {
            console.error("Failed to update status");
          }
        } catch (err) {
          console.error(err);
        }
      }
      



  return (
    <>
  <div className="watchlist-card">

    <img src={poster} alt={movie.title} />

    <div className="icons">

        {selectActive ? 
        <select name="selectStatus" value={newStatus} onBlur={() => setSelectActive(false)} onChange={(e) =>handleChange(e)} id="selectStatus">
            <option value="planned">Planned</option>
            <option value="completed">Completed</option>
            <option value="watching">Watching</option>
        </select>  
        :  
        (<span className={`status-badge ${newStatus}`} onClick={() => setSelectActive(prev => !prev)}>
            {newStatus.toUpperCase()}
        </span>)
           
         }
  </div>
     
  {onRemove && (
        <button
          className="remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(movie.id);
          }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      )}

</div>

    
    </>
  );
}
