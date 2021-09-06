import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import './Main.css'

function Main (props) {
  const fieldRef = React.useRef();

  return (
    <>
    <Header
        logedIn={props.logedIn}
      />
    <main className="content">
      <Promo
        fieldRef={fieldRef}
      />
      <AboutProject
        fieldRef={fieldRef}
      />
      <Techs
      />
      <AboutMe
      />
    </main>
    <Footer
      />
    </>
  )
}

export default Main
