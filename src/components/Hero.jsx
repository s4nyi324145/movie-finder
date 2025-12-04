import '../style/Hero.css';
import searchImg from '../assets/search.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faHeart, faFilm, faS } from '@fortawesome/free-solid-svg-icons';

export default function Hero({searchTerm, setsearchTerm}) {
    return (
        <div className="hero">
            <img src={searchImg} alt="Search illustration" className="hero-img" />
            <div className="hero-title">
            <h1>Find Your Favorite   
                <span className="hero-text">
                    <span className="word word1">Movies</span>
                    <span className="word word2">Series</span>
                </span>
            </h1>

                <h3>Search, browse and save movies you love.</h3>
               <div>
                    <input value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} placeholder='Search from thousands of movies' type="text" />
                    <button ><FontAwesomeIcon icon ={faSearch} /></button>
               </div>
            </div>
        </div>
    );
}