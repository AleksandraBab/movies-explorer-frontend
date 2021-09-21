import React from "react";
import './SearchForm.css'

const SearchForm = (props) => {
  const { place, onSubmit, onCheckbox, checkboxValue } = props;
  const [movieValue, setMovieValue] = React.useState('');
  const [isInputValid, setIsInputValid] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);

  React.useEffect(() => {
    const inputValidity = movieValue.trim().length > 0;
    setIsInputValid(inputValidity);
  }, [ isInputValid, movieValue ])


  const handleMovieChange = (evt) => {
    setMovieValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!isInputValid) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
      onSubmit(movieValue);
    }
  };

  return (
    <section className='search'>
      <div className='search__formblock'>
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
        {showMessage && <span className='search__errormessage'>Нужно ввести ключевое слово</span>}
      </div>
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
            value={checkboxValue}
            onChange={onCheckbox}
          />
           <span className="search__fakecheckbox"></span>
           <span className="search__labeltext">Короткометражки</span>
        </label>
      </div>
    </section>
  );
};

export default SearchForm;
