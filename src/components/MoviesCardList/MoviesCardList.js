import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'
import { moviesList } from '../../utils/movies'

const MoviesCardList = (props) => {
  const { place } = props;
  const [cardNumber, setCardNumber] = React.useState(0);
  const documentWidth = document.documentElement.clientWidth;

  React.useEffect( () => {
    renderItems();
    window.addEventListener('resize', (evt) => resizeItems(evt));
    return () => {
      window.removeEventListener('resize', resizeItems)
    }
  }, [])

  const handleBtnClick = () => {
    if (cardNumber % 7 === 0) {
      setCardNumber(cardNumber + 7);
    } else {
      setCardNumber(cardNumber + 5);
    }
  }

  const renderItems = () => {
    if (documentWidth <= 600) {
      setCardNumber(5);
    } else {
      setCardNumber(7);
    }
  }

  const resizeItems = (evt) => {
    if (evt.target.innerWidth === 600) {
      setCardNumber(5);
    } else if (evt.target.innerWidth === 601) {
      setCardNumber(7);
    }
  }

  return (
    <section className='movies'>
      <ul className='movies__list'>
        {moviesList.slice(0, cardNumber).map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            place={place}
          />
        ))}
      </ul>
      {cardNumber < moviesList.length  && <button
        type='button'
        className='movies__button'
        onClick={handleBtnClick}
      >Ещё</button>}
    </section>
  );
};

export default MoviesCardList;
