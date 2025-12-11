import '../style/Hero.css';
import searchImg from '../assets/search.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,  faUser } from '@fortawesome/free-solid-svg-icons';
import {  useEffect, useState } from 'react';
import { useNavigate, NavLink, } from 'react-router-dom';

function NotLogin({navigate}){

    return(
        <>
        <button onClick={() => navigate("/login")} className="login-btn">Login</button>
        <button onClick={() => navigate("/register")} className="register-btn">Register</button>
        </>
    )

}

function UserLoggedIn({username,dropdownOpen,setDropdownOpen,handleLogout,navigate}){

    return(<>

                <div className="user-dropdown">
                        <button className="user-btn" onClick={() => setDropdownOpen(p => !p)}>
                            <FontAwesomeIcon icon={faUser} /> {username}
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                            <button onClick={() => navigate("/profile")}>Profile</button>
                            <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                </div>
    
    </>)
}


export default function Hero({searchTerm, setSearchTerm}) {

    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    




    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null)
        setUsername("")
        setDropdownOpen(false);
        navigate("/");
    };


    return (
        <div className="hero-wrapper">


            <div className="hero">
                <img src={searchImg} alt="Search illustration" className="hero-img" />
                <div className="hero-title">
                    <h1>
                        Find Your Favorite
                        <span className="hero-text">
                            <span className="word word1">Movies</span>
                            <span className="word word2">Series</span>
                        </span>
                    </h1>

                    <h3>Search, browse and save movies you love.</h3>

                    <div className="hero-search">
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Search from thousands of movies'
                            type="text"
                        />
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="navbar">
                <nav>
                    <div className="nav-left">
                    <NavLink to="/" className='nav-link'>Movies</NavLink>
                    <NavLink to="/series" className='nav-link'>Series</NavLink>
                    <NavLink to="/favorites" className='nav-link'>Favorites</NavLink>
                    </div>

                    <div className="auth-section">
                    {!token ? <NotLogin navigate={navigate}/> : <UserLoggedIn username={username} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} handleLogout={handleLogout} navigate={navigate} />}
                    </div>
                </nav>
            </div>



        </div>
    );
}