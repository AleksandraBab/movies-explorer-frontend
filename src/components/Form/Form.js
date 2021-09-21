import Button from '../Button/Button';
import './Form.css'

function Form (props) {
  const {
    place,
    title,
    children,
    btntitle,
    onSubmit,
    valid,
    errorText,
    isError,
    successText,
  } = props;

  return (
    <>
      <h1
        className={`form__heading ${place === 'profile' ? 'form__heading_place_profile' : ''}`}
      >{title}</h1>
      <form
        className='form'
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        {isError && <p className={`form__error
          ${place === 'profile' ? 'form__error_place_profile' : ''}`}
        >{errorText}</p>}
        {successText && <p className='form__success'>{successText}</p>}
        {place === 'profile' && <button
          type='submit'
          className={`form__button ${valid ? '' : 'form__button_disabled'}`}
          disabled={!valid}
        >{btntitle}
        </button>}
        {place !== 'profile' && <Button
          btntitle={btntitle}
          valid={valid}
        />}
      </form>
    </>
  )
}

export default Form
