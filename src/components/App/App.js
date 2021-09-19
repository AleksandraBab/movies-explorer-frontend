import React from "react";
import { Route, Switch } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import "./App.css";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute";
import Movie from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies"
import NotFound from "../NotFound/NotFound";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi'

function App() {
  const history = useHistory();
  const location = useLocation();
  const [logedIn, setLogedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext));

  const [loginError, setLoginError] = React.useState(false);
  const [regError, setRegError] = React.useState(false);
  const [profileError, setProfileError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [savedMovies, setSavedMovies] = React.useState([]);

  const isLogIn = (value) => {
    setLogedIn(value);
  }

  React.useEffect( () => {
    setSavedMovies(JSON.parse(localStorage.getItem('allmovies')));
  }, [])

  //React.useEffect( () => {
  //  if (logedIn) {
  //    const jwt = localStorage.getItem('jwt');
//
  //    mainApi.getUser(jwt)
  //      .then((res) => {
  //        setCurrentUser(res);
  //      })
  //      .catch((err) => {
  //        console.log(err);
  //      });
  //  }
  //}, [logedIn])

  React.useEffect( () => {
    tokenCheck();
  }, [])

  const handleRegister = (email, password, name) => {
    setRegError(false);
    mainApi.register(email, password, name)
      .then(() => {
        handleLogIn(email, password);
      })
      .catch((err) => {
        console.log(err)
        setRegError(true);
        if (err === 'Ошибка: 409') {
          setErrorText('Пользователь с таким email уже существует.');
        } else if (err === 'Ошибка: 400') {
          setErrorText('При регистрации пользователя произошла ошибка');
        } else {
          setErrorText('На сервере произошла ошибка.');
        }
      })
  };

  const handleLogIn = (email, password) => {
    setLoginError(false);
    mainApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLogedIn(true);
        history.push('/movies')
      })
      .catch((err) => {
        setLoginError(true);
        if (err === 'Ошибка: 401') {
          setErrorText('Вы ввели неправильный логин или пароль.');
        } else if (err === 'Ошибка: 400') {
          setErrorText('При авторизации произошла ошибка');
        } else {
          setErrorText('На сервере произошла ошибка.');
        }
      });
  }

  const tokenCheck = () => {
    console.log('tokenCheck')
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      mainApi.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLogedIn(true)
          //console.log('history',history)
          console.log('location',location)
          //history.push('/movies');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleUpdateUser = (data) => {
    setProfileError(false);
    const jwt = localStorage.getItem('jwt');

    mainApi.editProfileInfo(data, jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setProfileError(true);
        if (err === 'Ошибка: 409') {
          setErrorText('Пользователь с таким email уже существует.');
        } else if (err === 'Ошибка: 400' || err === 'Ошибка: 404') {
          setErrorText('При обновлении профиля произошла ошибка.');
        } else {
          setErrorText('На сервере произошла ошибка.');
        }
      });
  }

  const onSignOut = () => {
    localStorage.clear();
    setLogedIn(false);
    history.push('/');
  }

  const handleProfileError = () => {
    setProfileError(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/" exact>
          <Main
            logedIn={logedIn}
          />
        </Route>
        <Route path="/signup">
          <Register
            onRegister={handleRegister}
            isError={regError}
            errorText={errorText}
          />
        </Route>
        <Route path="/signin">
          <Login
            onLogIn={handleLogIn}
            isError={loginError}
            errorText={errorText}
          />
        </Route>

        <ProtectedRoute
          path="/movies"
          logedIn={logedIn}
          component={Movie}
          savedMovies={savedMovies}
        />
        <ProtectedRoute
          path="/saved-movies"
          logedIn={logedIn}
          component={SavedMovies}
        />
        <ProtectedRoute
          path="/profile"
          logedIn={logedIn}
          component={Profile}
          logIn={isLogIn}
          onUpdateUser={handleUpdateUser}
          isError={profileError}
          errorText={errorText}
          handleProfileError={handleProfileError}
          onSignOut={onSignOut}
        />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
