import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css'

const SavedMovies = (props) => {
  const { logedIn } = props;

  return (
    <>
    <Header
      logedIn={logedIn}
    />
    <main className="content content_state_logedin">
      <SearchForm
        place='savedmovies'
      />
      <MoviesCardList
        place='savedmovies'
      />
    </main>
    <Footer
    />
  </>
  );
};

export default SavedMovies;
