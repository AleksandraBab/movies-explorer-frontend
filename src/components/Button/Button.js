import './Button.css'

function Button (props) {
  const { btntitle, valid, place } = props;

  return (
    <button
      className={`button ${valid ? '' : 'button_disabled'}
      ${place === 'singin' ? '' : 'button_place_singin'}`}
      type='submit'
      disabled={!valid}
      >
      {btntitle}
    </button>
  )
}

export default Button
