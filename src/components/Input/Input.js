import './Input.css'

function Input (props) {
  const { value, name, label, type, id, placeholder, onChange, isInputValid, errorMessage, isInputDirty } = props;

  return (
    <>
    <label htmlFor={name} className='label'>{label}</label>
    <input
      value={value}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`input ${label === 'E-mail' ? 'input__type_email' : ''}
      ${!isInputValid && 'input_type_error'}`}
      onChange={onChange}
      required
    />
    {!isInputValid && isInputDirty && <span className='input__errormessage'>{errorMessage}</span>}
  </>
  )
}

export default Input
