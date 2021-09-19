import React from "react";
import Header from "../Header/Header";
import Form from '../Form/Form';
import './Profile.css'
import CurrentUserContext from '../../contexts/CurrentUserContext'

const Profile = (props) => {
  const {
    logedIn,
    onUpdateUser,
    isError,
    errorText,
    onSignOut,
    successText
  } = props;

  const currentUser = React.useContext(CurrentUserContext)
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    username: currentUser.name,
    useremail: currentUser.email,
  });

  const [formValidity, setFormValidity] = React.useState({
    nameValid: false,
    emailValid: false,
  });

  React.useEffect(() => {
    setFormValues({
      username: currentUser.name,
      useremail: currentUser.email,
    })
  }, [currentUser])

  React.useEffect(() => {
    const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const nameValidity = formValues.username.trim().length > 1;
    const emailValidity = formValues.useremail.trim().length > 5 && regex.test(formValues.useremail.trim());
    setIsNameValid(nameValidity);
    setIsEmailValid(emailValidity);

    setFormValidity({
      nameValid: isNameValid,
      emailValid: isEmailValid
    })
  }, [isEmailValid, isNameValid, formValues.username, formValues.useremail])

  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setFormValues((prevState) => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { username, useremail } = formValues;
    onUpdateUser({name: username, email: useremail});
  }

  const { username, useremail } = formValues;
  const { nameValid, emailValid } = formValidity;
  const isSubmitAble = nameValid
    && emailValid
    && !(username === currentUser.name && useremail === currentUser.email);

  return (
    <>
      <Header
        logedIn={logedIn}
      />
      <main className='profile'>
        <Form
          place='profile'
          title={`Привет, ${currentUser.name}!`}
          btntitle='Редактировать'
          onSubmit={handleSubmit}
          valid={isSubmitAble}
          isError={isError}
          errorText={errorText}
          successText={successText}
        >
          <div className='profile__inputblock'>
            <label htmlFor='profilename' className='profile__label'>
              Имя
            </label>
            <input
              className={`profile__input ${!isNameValid && 'profile__input_error'}`}
              name='username'
              type='text'
              id='profilename'
              value={username}
              onChange={handleInputChange}
              placeholder='Имя пользователя'
          />
          </div>
          {!isNameValid && <span className='profile__errormessage'>Имя пользователя должно быть длиннее 2-х символов</span>}
          <div className='profile__inputblock'>
            <label htmlFor='profileeimal' className='profile__label'>
              E-mail
            </label>
            <input
              className={`profile__input ${!isEmailValid && 'profile__input_error'}`}
              name='useremail'
              type='email'
              id='profileeimal'
              value={useremail}
              onChange={handleInputChange}
              placeholder='Email пользователя'
          />
          </div>
          {!isEmailValid && <span className='profile__errormessage'>Email некорретен</span>}
        </Form>
        <p onClick={onSignOut} className="profile__logout">Выйти из аккаунта</p>
      </main>
    </>
  );
};

export default Profile;
