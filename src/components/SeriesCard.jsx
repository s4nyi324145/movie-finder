import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import "../style/moviecard.css"
import errorImg from '../assets/404-error.png'


export default function SeriesCard({ series, onMovieClick }) {

   

    return (

      <>
        {series.length > 0 ? <div className="movie-cards">
        {series.map(s => 
          <div className="movie-card" onClick={() => onMovieClick(s.id)}  key={s.id}>

           
            <div className="card-img">
              <img src={`https://image.tmdb.org/t/p/w500${s.poster_path}`}  alt={s.title} />
              
            </div>
            <div className="overlay">{s.overview}</div>
            <div className="card-content">
              <h3>{s.name}</h3>
              <div className="card-info">
                <span className="rating">
                  <FontAwesomeIcon icon={faStar} /> {(s.vote_average).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div> : 
      <div className='error-img'>
        <img src={errorImg} alt="Not found" />
        <p>Movie not found</p>

      </div> }
      
      </>
    );
  }
  
