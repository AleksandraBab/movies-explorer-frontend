import React from "react";
import './SearchForm.css'

const SearchForm = (props) => {
  const { place } = props;
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [movieValue, setMovieValue] = React.useState('');

  const handleCheckboxChange = () => {
    setIsShortMovie(!isShortMovie);
  };

  const handleMovieChange = (evt) => {
    setMovieValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(movieValue);
  };

  return (
    <section className='search'>
      <form
        className='search__form'
        name={`form-${place}`}
        onSubmit={handleSubmit}
      >
        <input
          className='search__input'
          placeholder='Фильм'
          type="text"
          name="movie"
          id={`movie-${place}`}
          value={movieValue}
          onChange={handleMovieChange}
        />
        <button className='search__button' type='submit'></button>
      </form>
      <div className='search__duration'>
        <label
          htmlFor={`duration-${place}`}
          className="search__label"
        >
           <input
            className='search__checkbox'
            type="checkbox"
            name="duration"
            id={`duration-${place}`}
            value={isShortMovie}
            onChange={handleCheckboxChange}
          />
           <span className="search__fakecheckbox"></span>
           <span className="search__labeltext">Короткометражки</span>
        </label>
      </div>
    </section>
  );
};

export default SearchForm;
