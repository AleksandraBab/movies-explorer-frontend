import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
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
import {
  ERROR_MESSAGE_500,
  ERROR_MESSAGE_AUTH,
  ERROR_MESSAGE_UPD,
  ERROR_MESSAGE_REG,
  ERROR_MESSAGE_EMAIL,
  SUCCESS,
  ERROR_MESSAGE_401,
  ERROR_409,
  ERROR_401,
  ERROR_400,
  ERROR_404,
} from '../../utils/config'

function App() {
  const history = useHistory();
  const location = useLocation();
  const [logedIn, setLogedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext));

  const [loginError, setLoginError] = React.useState(false);
  const [regError, setRegError] = React.useState(false);
  const [profileError, setProfileError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [successText, setSuccessText] = React.useState('');
  const [savedMovies, setSavedMovies] = React.useState([]);

  const isLogIn = (value) => {
    setLogedIn(value);
  }

  React.useEffect( () => {
    setSavedMovies(JSON.parse(localStorage.getItem('allmovies')));
  }, [])

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
        setRegError(true);
        if (err === ERROR_409) {
          setErrorText(ERROR_MESSAGE_EMAIL);
        } else if (err === ERROR_400) {
          setErrorText(ERROR_MESSAGE_REG);
        } else {
          setErrorText(ERROR_MESSAGE_500);
        }
      })
  };

  const handleLogIn = (email, password) => {
    setLoginError(false);
    mainApi.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLogedIn(true);
        mainApi.getUser(data.token)
          .then((res) => {
            setCurrentUser(res);
          })
          .catch((err) => {
            console.log(err);
          });
        history.push('/movies')
      })
      .catch((err) => {
        setLoginError(true);
        if (err === ERROR_401) {
          setErrorText(ERROR_MESSAGE_401);
        } else if (err === ERROR_400) {
          setErrorText(ERROR_MESSAGE_AUTH);
        } else {
          setErrorText(ERROR_MESSAGE_500);
        }
      });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      mainApi.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLogedIn(true)
          history.push(location.pathname);
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
        setSuccessText(SUCCESS)
      })
      .catch((err) => {
        console.log(err);
        setProfileError(true);
        if (err === ERROR_409) {
          setErrorText(ERROR_MESSAGE_EMAIL);
        } else if (err === ERROR_400 || err === ERROR_404) {
          setErrorText(ERROR_MESSAGE_UPD);
        } else {
          setErrorText(ERROR_MESSAGE_500);
        }
      });
  }

  const onSignOut = () => {
    localStorage.clear();
    setLogedIn(false);
    history.push('/');
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
          {() =>
           !logedIn ?
            <Register
              onRegister={handleRegister}
              isError={regError}
              errorText={errorText}
            />
            : <Redirect to="/movies" />
          }
        </Route>
        <Route path="/signin">
          {() =>
            !logedIn ?
            <Login
              onLogIn={handleLogIn}
              isError={loginError}
              errorText={errorText}
            />
            : <Redirect to="/movies" />
          }
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
          onSignOut={onSignOut}
          successText={successText}
        />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
