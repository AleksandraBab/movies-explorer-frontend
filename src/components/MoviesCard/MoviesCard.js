import React from "react";
import './MoviesCard.css'
import { mainApi } from '../../utils/MainApi'

const MoviesCard = (props) => {
  const { movie, place, handleLikeClick } = props;
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect( () => {
    const jwt = localStorage.getItem('jwt');
    mainApi.getMovies(jwt)
      .then((movies) => {
        const likedMovie = movies.find((item) => {
          return movie.id == item.movieId;
        })
        if (likedMovie) {
          setIsLiked(true);
          movie._id = likedMovie._id;
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const onLike = (movie) => {
    const jwt = localStorage.getItem('jwt');
    if (!isLiked) {
      const { country,
        description,
        director,
        duration,
        id,
        image,
        nameRU,
        nameEN,
        trailerLink,
        year,
      } = movie;
      const newMovie = {
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailer: trailerLink,
        thumbnail: `https://api.nomoreparties.co${image.url}`,
        movieId: id.toString(),
        nameRU,
        nameEN,
      }
      mainApi.saveMovie(newMovie, jwt)
        .then((res) => {
          movie._id = res._id;
          setIsLiked(true);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      mainApi.deleteMovie(movie._id, jwt)
        .then(() => {
          setIsLiked(false);
        })
        .catch((err) => {
          console.log(err);
        })
    }
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
          ${place === 'allmovies' && isLiked ? 'movie__btn_liked' : ''}
          `}
          onClick={place === 'allmovies' ? () => onLike(movie) : () => handleLikeClick(movie)}
        ></button>
      </div>
      <div className='movie__imgblock'>
        <img
          className='movie__img'
          src={place === 'allmovies' ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
          alt={movie.nameRU}
        />
        <a className='movie__link' href={movie.trailerLink} target='_blank' rel='noreferrer' area-label='ссылка на трейлер'></a>
      </div>
    </li>
  );
};

export default MoviesCard;
