import { useLocation } from 'react-router-dom';
import React from "react";
import './Menu.css'
import Navigation from '../Navigation/Navigation';

function Menu (props) {
  const { isOpen, openMenu, logedIn } = props;
  const path = useLocation();

  return (
    <div className={`menu ${isOpen ? 'menu_opened' : ''}`}>
      <div className='menu__container'>
        <button className='menu__btn' type='button' onClick={openMenu}></button>
        <Navigation
          logedIn={logedIn}
          path={path.pathname}
        />
      </div>
    </div>
  )
}

export default Menu
