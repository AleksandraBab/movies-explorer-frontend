import React from "react";
import './MoviesCard.css'

const MoviesCard = (props) => {
  const { movie, place } = props;
  const [isLiked, setIsLiked] = React.useState(true)

  const onLike = () => {
    setIsLiked(!isLiked)
  }

  const deleteCard = () => {
    console.log('card is deleted')
  }

  return (
    <li className='movie'>
      <div className='movie__about'>
        <div className='movie__texts'>
          <h2 className='mobie__title'>{movie.nameRU}</h2>
          <p className='mobie__duration'>
            {Math.floor(movie.duration / 60) ? `${Math.trunc(movie.duration / 60)}ч` : ''} {movie.duration % 60}м
          </p>
        </div>
        <button
          type='button'
          className={`movie__btn
          ${place === 'allmovies' ? 'movie__btn_place_all' : 'movie__btn_place_saved'}
          ${place === 'allmovies' && !isLiked ? 'movie__btn_liked' : ''}
          `}
          onClick={place === 'allmovies' ? onLike : deleteCard}
        ></button>
      </div>
      <img
        className='movie__img'
        src={movie.image}
        alt={movie.nameRU}
      />
    </li>
  );
};

export default MoviesCard;
