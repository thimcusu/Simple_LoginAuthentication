import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import LoginForm from "../containers/LoginForm";
import RegisterForm from "../containers/RegisterForm";

import configureStore from "../store";
import ProtectRoute from "../components/ProtectRoute";
import { getJwt } from "../utils/jwt";

const store = configureStore();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(getJwt());

  const handleChangleLoggedIn = () => {
    setLoggedIn(getJwt());
  };
  return (
    <ReduxProvider store={store}>
      <Router>
        <div className="app">
          <Switch>
            <ProtectRoute
              exact
              path="/"
              component={HomePage}
              loggedIn={loggedIn}
            ></ProtectRoute>
            <Route
              path="/login"
              render={(props) => (
                <LoginForm {...props} onLoggedIn={handleChangleLoggedIn} />
              )}
            />
            <Route path="/register" component={RegisterForm}></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
        </div>
      </Router>
    </ReduxProvider>
  );
};

export default App;
