import Logo from '../Logo/Logo';
import React from "react";
import { useLocation, Link } from 'react-router-dom';
import './Header.css'
import Navigation from '../Navigation/Navigation';
import Menu from '../Menu/Menu';

function Header (props) {
  const { logedIn } = props;
  const path = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
    <header
      className={`header ${props.logedIn && path.pathname !== '/' ? 'header_state_logedin' : ''}`}>
      <div className='header__container'>
        <Logo
        />
        {!logedIn && <div className="header__links">
        <Link to="/signup"
          className="header__sigup">
          Регистрация
        </Link>
        <Link to="/signin"
          className="header__sigin">
          Войти
        </Link>
        </div>}
        <Navigation
          sreen='full'
          logedIn={logedIn}
          path=''
        />
        {logedIn && <button className='header__btn' type='button' onClick={openMenu}></button>}
      </div>
    </header>
    <Menu
      isOpen={isMenuOpen}
      openMenu={openMenu}
      logedIn={logedIn}
    />
    </>
  )
}

export default Header
