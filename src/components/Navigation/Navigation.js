import React from "react";
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css'

const Navigation = (props) => {
  const { logedIn, sreen } = props;
  const path = useLocation();

  return (
    <div className={`navigation ${logedIn ? 'navigation_state_logedin' : ''} ${sreen === 'full' ? 'navigation_blocked' : ''}`}>
      {logedIn && <nav className='navigation__movies'>
        {sreen !== 'full' && <Link to="/"
          className={`navigation__link ${path.pathname === '/' ? 'navigation__link_active' : ''}`}>
          Главная
        </Link>}
        <Link to="/movies"
          className={`navigation__link navigation__link_path_movies ${path.pathname === '/movies' ? 'navigation__link_active' : ''}`}>
          Фильмы
        </Link>
        <Link to="/saved-movies"
          className={`navigation__link ${path.pathname === '/saved-movies' ? 'navigation__link_active' : ''}`}>
          Сохранённые фильмы
        </Link>
      </nav>}
      <nav className="navigation__account">
        {logedIn && <Link to="/profile"
          className="navigation__profile">
          Аккаунт
        </Link>}
        {logedIn && <div className="navigation__profileimg"></div>}
      </nav>
    </div>
  );
};

export default Navigation;
