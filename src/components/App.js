import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import LoginForm from "../containers/LoginForm";
import RegisterForm from "../containers/RegisterForm";

import configureStore from "../store";
import ProtectRoute from "../components/ProtectRoute";

const store = configureStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Router>
        <div className="app">
          <Switch>
            <ProtectRoute exact path="/" component={HomePage}></ProtectRoute>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm}></Route>
            <Route component={PageNotFound}></Route>
          </Switch>
        </div>
      </Router>
    </ReduxProvider>
  );
};

export default App;
