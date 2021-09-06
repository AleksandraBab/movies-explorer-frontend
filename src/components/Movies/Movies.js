import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";

const Movie = (props) => {
  const { logedIn } = props;
  // Preloader will be added on the next stage when cards will be resieved from the App component as a state

  return (
    <>
      <Header
        logedIn={logedIn}
      />
      <main className="content content_state_logedin">
        <SearchForm
          place='allmovies'
        />
        <MoviesCardList
          place='allmovies'
        />
      </main>
      <Footer
      />
    </>
  );
};

export default Movie;
