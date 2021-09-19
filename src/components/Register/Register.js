import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import Input from '../Input/Input';
import './Register.css'

function Register (props) {
  const { onRegister, isError, errorText } = props

  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [isNameInputDirty, setIsNameInputDirty] = React.useState(false);
  const [isEmailInputDirty, setIsEmailInputDirty] = React.useState(false);
  const [isPassInputDirty, setIsPassInputDirty] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    userName: '',
    email: '',
    password: '',
  });

  const [formValidity, setFormValidity] = React.useState({
    nameValid: false,
    emailValid: false,
    passwordValid: false
  });

  React.useEffect(() => {
    const regexEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const regexPassword = /^[a-zA-Z0-9-_!?]+$/;

    const nameValidity = formValues.userName.trim().length > 1;
    const passwordValidity = formValues.password.trim().length > 5 && regexPassword.test(formValues.password);
    const emailValidity = formValues.email.trim().length > 5 && regexEmail.test(formValues.email.trim());

    setIsNameValid(nameValidity);
    setIsPasswordValid(passwordValidity);
    setIsEmailValid(emailValidity);

    setFormValidity({
      nameValid: isNameValid,
      emailValid: isEmailValid,
      passwordValid: isPasswordValid,
    })
  }, [isNameValid, isEmailValid, isPasswordValid, formValues.userName, formValues.email, formValues.password])

  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setFormValues((prevState) => ({
      ...prevState, [name]: value
    }));

    if (name === 'email') {
      setIsEmailInputDirty(true);
    } else if (name === 'password') {
      setIsPassInputDirty(true);
    } else {
      setIsNameInputDirty(true);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { userName, email, password } = formValues;
    onRegister(email, password, userName);
  }

  const { userName, email, password } = formValues;
  const { nameValid, emailValid, passwordValid } = formValidity;
  const isSubmitAble = nameValid && emailValid && passwordValid;

  return (
    <section className='register'>
      <Logo
        place='sign'
      />
      <Form
        place='singup'
        title='Добро пожаловать!'
        btntitle='Зарегистрироваться'
        valid={isSubmitAble}
        onSubmit={handleSubmit}
        isError={isError}
        errorText={errorText}
      >
        <Input
          value={userName}
          name='userName'
          label='Имя'
          type='text'
          id='register-name'
          placeholder='Имя'
          onChange={handleInputChange}
          isInputValid={nameValid}
          errorMessage='Имя пользователя должно быть длиннее 2-х символов'
          isInputDirty={isNameInputDirty}
        />
        <Input
          value={email}
          name='email'
          label='E-mail'
          type='email'
          id='register-email'
          placeholder='Email'
          onChange={handleInputChange}
          isInputValid={emailValid}
          errorMessage='Email некорректен'
          isInputDirty={isEmailInputDirty}
        />
        <Input
          value={password}
          name='password'
          label='Пароль'
          type='password'
          id='register-pass'
          placeholder='Пароль'
          onChange={handleInputChange}
          isInputValid={passwordValid}
          errorMessage='Пароль должен быть не короче 6 символов и содержать только латинские буквы, цифры, символы !?-_'
          isInputDirty={isPassInputDirty}
        />
      </Form>
      <div className='register__texts'>
        <p className='register__text'>Уже зарегистрированы?</p>
        <Link to='/signin' className='register__link'>Войти</Link>
      </div>
    </section>
  )
}

export default Register
