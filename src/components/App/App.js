import React from "react";
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute";
import Movie from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies"
import NotFound from "../NotFound/NotFound";
import CurrentUserContext from '../../contexts/CurrentUserContext'

function App() {
  const [logedIn, setLogedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext));

  const isLogIn = (value) => {
    setLogedIn(value);
  }

  React.useEffect( () => {
    setCurrentUser({name: 'Юзер', email: 'email@email.ru'});
  }, [])

  function handleUpdateUser (data) {
    // const jwt = localStorage.getItem('jwt');
    // setEditButtonText('Сохранение...')
    setCurrentUser(data);
    // setEditButtonText('Сохранить')
  }

  const handleLogIn = (email, password) => {
    console.log('you are welcome!', email, password)
  }

  const handleRegister = (name,email, password) => {
    console.log('you are wuth us now', email, password, name)
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
          />
        </Route>
        <Route path="/signin">
          <Login
            onLogIn={handleLogIn}
          />
        </Route>

        <ProtectedRoute
          path="/movies"
          logedIn={logedIn}
          component={Movie}
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
        />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
