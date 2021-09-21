import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import Input from '../Input/Input';
import './Login.css'

function Login (props) {
  const { onLogIn, isError, errorText } = props
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [isEmailInputDirty, setIsEmailInputDirty] = React.useState(false);
  const [isPassInputDirty, setIsPassInputDirty] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });

  const [formValidity, setFormValidity] = React.useState({
    emailValid: false,
    passwordValid: false
  });

  React.useEffect(() => {
    const regexEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const regexPassword = /^[a-zA-Z0-9-_!?]+$/;
    const passwordValidity = formValues.password.trim().length > 5 && regexPassword.test(formValues.password);
    const emailValidity = formValues.email.trim().length > 5 && regexEmail.test(formValues.email.trim());
    setIsPasswordValid(passwordValidity);
    setIsEmailValid(emailValidity);

    setFormValidity({
      emailValid: isEmailValid,
      passwordValid: isPasswordValid,
    })
  }, [isEmailValid, isPasswordValid, formValues.email, formValues.password])

  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setFormValues((prevState) => ({
      ...prevState, [name]: value
    }));

    if (name === 'email') {
      setIsEmailInputDirty(true);
    } else {
      setIsPassInputDirty(true);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = formValues;
    onLogIn(email, password);
  }

  const { email, password } = formValues;
  const { emailValid, passwordValid } = formValidity;
  const isSubmitAble = emailValid && passwordValid;

  return (
    <section className='login'>
      <Logo
        place='sign'
      />
      <Form
        place='singin'
        title='Рады видеть!'
        btntitle='Войти'
        valid={isSubmitAble}
        onSubmit={handleSubmit}
        isError={isError}
        errorText={errorText}
      >
        <Input
          value={email}
          place='singin'
          name='email'
          label='E-mail'
          type='email'
          id='login-email'
          placeholder='Email'
          onChange={handleInputChange}
          isInputValid={emailValid}
          errorMessage='Email некорректен'
          isInputDirty={isEmailInputDirty}
        />
        <Input
          value={password}
          place='singin'
          name='password'
          label='Пароль'
          type='password'
          id='login-pass'
          placeholder='Пароль'
          onChange={handleInputChange}
          isInputValid={passwordValid}
          isInputDirty={isPassInputDirty}
          errorMessage='Пароль должен быть не короче 6 символов и содержать только латинские буквы, цифры, символы !?-_'
        />
      </Form>
      <div className='login__texts'>
        <p className='login__text'>Ещё не зарегистрированы?</p>
        <Link to='/signup' className='login__link'>Регистрация</Link>
      </div>
    </section>
  )
}

export default Login
